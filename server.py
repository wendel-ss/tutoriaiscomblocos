from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import sys
from io import StringIO
import os
from datetime import datetime, timedelta
from sqlalchemy import Integer
import secrets
from functools import wraps

# Configurar o caminho base do projeto
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, 'database')

app = Flask(__name__)
app.config.update(
    SECRET_KEY='sua-chave-secreta-aqui',
    SQLALCHEMY_DATABASE_URI=f'sqlite:///{os.path.join(DB_PATH, "tutoriais.db")}',
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    
    # Configurações de sessão mais robustas
    PERMANENT_SESSION_LIFETIME=timedelta(days=7),  # Aumentar para 7 dias
    SESSION_COOKIE_NAME='tutoriais_session',       # Nome específico para o cookie
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax',                # Mudar para 'Lax' em vez de 'None'
    SESSION_COOKIE_SECURE=False,                   # False para desenvolvimento local
)

# Criar o diretório database se não existir
os.makedirs(DB_PATH, exist_ok=True)

CORS(app, 
    origins=["http://localhost:5500", "http://127.0.0.1:5500"],
    allow_credentials=True,
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    supports_credentials=True,
    expose_headers=["Content-Type", "Authorization"],
    allow_headers=["Content-Type", "Authorization", "Accept"]
)

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = None

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

class Token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.String(64), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)

# Funções auxiliares - MOVER PARA AQUI
def verify_token(token):
    token_obj = Token.query.filter_by(token=token).first()
    if token_obj and token_obj.expires_at > datetime.utcnow():
        return True
    return False

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token não fornecido'}), 401
            
        token_obj = Token.query.filter_by(token=token).first()
        if not token_obj:
            return jsonify({'error': 'Token inválido'}), 401
            
        if token_obj.expires_at < datetime.utcnow():
            return jsonify({'error': 'Token expirado'}), 401
            
        return f(*args, **kwargs)
    return decorated_function

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.before_request
def before_request():
    if current_user.is_authenticated:
        session.permanent = True
        session.modified = True
        if 'logged_in' not in session:
            session['logged_in'] = True

@app.route('/execute', methods=['POST'])
def execute_code():
    code = request.json.get('code', '')
    
    # Captura a saída do print
    old_stdout = sys.stdout
    redirected_output = sys.stdout = StringIO()

    try:
        # Executa o código
        exec(code)
        sys.stdout = old_stdout
        output = redirected_output.getvalue()
        
        return jsonify({
            'success': True,
            'output': output
        })
    except Exception as e:
        sys.stdout = old_stdout
        error_msg = str(e)
        return jsonify({
            'success': False,
            'error': error_msg
        })

@app.route('/admin/login', methods=['POST'])
def login():
    try:
        data = request.json
        user = User.query.filter_by(username=data.get('username')).first()
        
        if user and check_password_hash(user.password_hash, data.get('password')):
            token = Token(
                user_id=user.id,
                token=secrets.token_hex(32),
                expires_at=datetime.utcnow() + timedelta(days=7)
            )
            db.session.add(token)
            db.session.commit()
            
            return jsonify({
                'success': True,
                'token': token.token
            })
        
        return jsonify({'success': False, 'error': 'Credenciais inválidas'}), 401
    except Exception as e:
        print(f"Erro no login: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/admin/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'success': True})

@app.route('/admin/check-session', methods=['GET'])
def check_session():
    if current_user.is_authenticated:
        # Renovar a sessão
        session.permanent = True
        session.modified = True
        return jsonify({'authenticated': True})
    return jsonify({'authenticated': False}), 401

@app.route('/admin/validate-auth', methods=['POST'])
def validate_auth():
    try:
        if current_user.is_authenticated:
            return jsonify({
                'authenticated': True,
                'username': current_user.username
            })
        return jsonify({
            'authenticated': False,
            'error': 'Não autenticado'
        }), 401
    except Exception as e:
        print(f"Erro na validação: {str(e)}")
        return jsonify({
            'authenticated': False,
            'error': str(e)
        }), 500

@app.route('/admin/tutorials', methods=['GET'])
@token_required
def list_tutorials():
    # Buscar todos os tutoriais primeiro
    tutorials = Tutorial.query.all()
    
    # Ordenar usando Python
    sorted_tutorials = sorted(tutorials, 
        key=lambda t: (int(t.id.split('-')[0]), int(t.id.split('-')[1]))
    )
    
    return jsonify([{
        'id': t.id,
        'title': t.title,
        'updated_at': t.updated_at.isoformat()
    } for t in sorted_tutorials])

@app.route('/admin/tutorials/<tutorial_id>', methods=['GET'])
@token_required
def get_tutorial(tutorial_id):
    tutorial = Tutorial.query.get_or_404(tutorial_id)
    return jsonify({
        'id': tutorial.id,
        'title': tutorial.title,
        'content': tutorial.content,
        'prev': tutorial.prev,
        'next': tutorial.next
    })

@app.route('/admin/tutorials', methods=['POST'])
@token_required
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
    return jsonify({'success': True})

@app.route('/admin/tutorials/<tutorial_id>', methods=['PUT'])
@token_required
def update_tutorial(tutorial_id):
    tutorial = Tutorial.query.get_or_404(tutorial_id)
    data = request.json
    tutorial.title = data['title']
    tutorial.content = data['content']
    tutorial.prev = data.get('prev')
    tutorial.next = data.get('next')
    db.session.commit()
    return jsonify({'success': True})

@app.route('/admin/tutorials/<tutorial_id>', methods=['DELETE'])
@token_required
def delete_tutorial(tutorial_id):
    tutorial = Tutorial.query.get_or_404(tutorial_id)
    db.session.delete(tutorial)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/tutorials', methods=['GET'])
def list_public_tutorials():
    tutorials = Tutorial.query.all()
    
    # Ordenar por módulo e número
    sorted_tutorials = sorted(tutorials, 
        key=lambda t: (int(t.id.split('-')[0]), int(t.id.split('-')[1]))
    )
    
    return jsonify([{
        'id': t.id,
        'title': t.title,
        'updated_at': t.updated_at.isoformat()
    } for t in sorted_tutorials])

@app.route('/tutorials/<tutorial_id>', methods=['GET'])
def get_public_tutorial(tutorial_id):
    tutorial = Tutorial.query.get_or_404(tutorial_id)
    return jsonify({
        'id': tutorial.id,
        'title': tutorial.title,
        'content': tutorial.content,
        'updated_at': tutorial.updated_at.isoformat()
    })

@app.after_request
def after_request(response):
    # Adicionar outros headers necessários
    response.headers.update({
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept'
    })
    return response

# Inicialização do banco de dados
def init_db():
    with app.app_context():
        # Cria o diretório do banco de dados se não existir
        os.makedirs('database', exist_ok=True)
        
        # Cria as tabelas
        db.create_all()
        
        # Criar usuário admin se não existir
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(
                username='admin',
                password_hash=generate_password_hash('senha-inicial-aqui')
            )
            db.session.add(admin)
            db.session.commit()

if __name__ == '__main__':
    init_db()
    app.run(port=10000) 