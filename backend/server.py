from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import sys
from io import StringIO
import os
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'sua-chave-secreta-aqui'  # Mude para uma chave segura
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/tutoriais.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:5500",
            "http://127.0.0.1:5500",
            "https://tutoriaiscomblocos.com.br",
            "https://www.tutoriaiscomblocos.com.br"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

# Modelos
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

class Tutorial(db.Model):
    id = db.Column(db.String(10), primary_key=True)  # ex: "1-1", "2-1"
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    prev = db.Column(db.String(10))
    next = db.Column(db.String(10))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Rotas existentes
@app.route('/')
def home():
    return jsonify({
        "status": "running",
        "message": "Python Code Execution API"
    })

@app.route('/execute', methods=['POST'])
def execute_code():
    print("Recebendo requisição para executar código")  # Debug
    code = request.json.get('code', '')
    print("Código recebido:", code)  # Debug
    
    # Captura a saída do print
    old_stdout = sys.stdout
    redirected_output = sys.stdout = StringIO()

    try:
        # Executa o código
        exec(code)
        sys.stdout = old_stdout
        output = redirected_output.getvalue()
        print("Saída gerada:", output)  # Debug
        return jsonify({
            'success': True,
            'output': output
        })
    except Exception as e:
        sys.stdout = old_stdout
        error_msg = str(e)
        print("Erro na execução:", error_msg)  # Debug
        return jsonify({
            'success': False,
            'error': error_msg
        })

# Novas rotas para administração
@app.route('/admin/login', methods=['POST'])
def login():
    data = request.json
    print(f"Tentativa de login para usuário: {data.get('username')}")  # Debug
    
    user = User.query.filter_by(username=data.get('username')).first()
    print(f"Usuário encontrado: {user is not None}")  # Debug
    
    if user and check_password_hash(user.password_hash, data.get('password')):
        print("Senha correta, efetuando login")  # Debug
        login_user(user)
        return jsonify({'success': True})
    
    print("Login falhou")  # Debug
    return jsonify({'success': False, 'error': 'Credenciais inválidas'}), 401

@app.route('/admin/tutorials', methods=['GET'])
@login_required
def list_tutorials():
    tutorials = Tutorial.query.all()
    return jsonify([{
        'id': t.id,
        'title': t.title,
        'prev': t.prev,
        'next': t.next,
        'updated_at': t.updated_at.isoformat()
    } for t in tutorials])

@app.route('/admin/tutorials/<tutorial_id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def manage_tutorial(tutorial_id):
    if request.method == 'GET':
        tutorial = Tutorial.query.get_or_404(tutorial_id)
        return jsonify({
            'id': tutorial.id,
            'title': tutorial.title,
            'content': tutorial.content,
            'prev': tutorial.prev,
            'next': tutorial.next
        })
    
    elif request.method == 'PUT':
        tutorial = Tutorial.query.get_or_404(tutorial_id)
        data = request.json
        tutorial.title = data.get('title', tutorial.title)
        tutorial.content = data.get('content', tutorial.content)
        tutorial.prev = data.get('prev', tutorial.prev)
        tutorial.next = data.get('next', tutorial.next)
        db.session.commit()
        return jsonify({'success': True})
    
    elif request.method == 'DELETE':
        tutorial = Tutorial.query.get_or_404(tutorial_id)
        db.session.delete(tutorial)
        db.session.commit()
        return jsonify({'success': True})

@app.route('/admin/tutorials', methods=['POST'])
@login_required
def create_tutorial():
    data = request.json
    tutorial = Tutorial(
        id=data['id'],
        title=data['title'],
        content=data['content'],
        prev=data.get('prev'),
        next=data.get('next')
    )
    db.session.add(tutorial)
    db.session.commit()
    return jsonify({'success': True, 'id': tutorial.id})

# Inicialização do banco de dados
def init_db():
    with app.app_context():
        db.create_all()
        # Criar usuário admin se não existir
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            print("Criando usuário admin")  # Debug
            admin = User(
                username='admin',
                password_hash=generate_password_hash('senha-inicial-aqui')
            )
            db.session.add(admin)
            db.session.commit()
            print("Usuário admin criado com sucesso")  # Debug

if __name__ == '__main__':
    print("Inicializando banco de dados")  # Debug
    init_db()
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port) 
