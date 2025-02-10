const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:10000'
    : 'https://api.tutoriaiscomblocos.com.br';

let currentTutorial = null;

// Elementos do DOM
const loginScreen = document.getElementById('loginScreen');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const tutorialForm = document.getElementById('tutorialForm');
const tutorialsList = document.getElementById('tutorialsList');
const logoutBtn = document.getElementById('logoutBtn');
const newTutorialBtn = document.getElementById('newTutorialBtn');
const cancelBtn = document.getElementById('cancelBtn');

let editor = null;

// Funções de autenticação
async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        const data = await response.json();
        if (data.success) {
            loginScreen.style.display = 'none';
            adminPanel.style.display = 'block';
            logoutBtn.style.display = 'block';
            loadTutorials();
        } else {
            alert('Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login');
    }
}

function logout() {
    loginScreen.style.display = 'block';
    adminPanel.style.display = 'none';
    logoutBtn.style.display = 'none';
    currentTutorial = null;
}

// Inicialização do TinyMCE
function initEditor() {
    tinymce.init({
        selector: '#tutorialContent',
        height: 500,
        skin: 'oxide-dark',
        content_css: 'dark',
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        setup: function(ed) {
            editor = ed;
        }
    });
}

// Funções de gerenciamento de tutoriais
async function loadTutorials() {
    try {
        const response = await fetch(`${API_URL}/admin/tutorials`, {
            credentials: 'include'
        });
        const tutorials = await response.json();
        
        tutorialsList.innerHTML = '';
        tutorials.forEach(tutorial => {
            const div = document.createElement('div');
            div.className = 'tutorial-item';
            div.innerHTML = `
                <span>${tutorial.id} - ${tutorial.title}</span>
                <button class="delete-btn" data-id="${tutorial.id}">×</button>
            `;
            div.querySelector('span').addEventListener('click', () => loadTutorial(tutorial.id));
            div.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTutorial(tutorial.id);
            });
            tutorialsList.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao carregar tutoriais:', error);
        alert('Erro ao carregar tutoriais');
    }
}

async function loadTutorial(id) {
    try {
        const response = await fetch(`${API_URL}/admin/tutorials/${id}`, {
            credentials: 'include'
        });
        currentTutorial = await response.json();
        
        document.getElementById('tutorialId').value = currentTutorial.id;
        document.getElementById('tutorialTitle').value = currentTutorial.title;
        document.getElementById('tutorialPrev').value = currentTutorial.prev || '';
        document.getElementById('tutorialNext').value = currentTutorial.next || '';
        
        // Atualiza o conteúdo no TinyMCE
        if (editor) {
            editor.setContent(currentTutorial.content);
        }
        
        document.getElementById('tutorialId').disabled = true;
    } catch (error) {
        console.error('Erro ao carregar tutorial:', error);
        alert('Erro ao carregar tutorial');
    }
}

// Modifique a função saveTutorial para pegar o conteúdo do TinyMCE
async function saveTutorial(tutorialData) {
    try {
        // Atualiza o conteúdo do tutorial com o conteúdo do editor
        if (editor) {
            tutorialData.content = editor.getContent();
        }
        
        const method = currentTutorial ? 'PUT' : 'POST';
        const url = currentTutorial 
            ? `${API_URL}/admin/tutorials/${currentTutorial.id}`
            : `${API_URL}/admin/tutorials`;
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tutorialData),
            credentials: 'include'
        });
        
        if (response.ok) {
            alert('Tutorial salvo com sucesso!');
            loadTutorials();
            resetForm();
        } else {
            alert('Erro ao salvar tutorial');
        }
    } catch (error) {
        console.error('Erro ao salvar tutorial:', error);
        alert('Erro ao salvar tutorial');
    }
}

async function deleteTutorial(id) {
    if (!confirm('Tem certeza que deseja excluir este tutorial?')) return;
    
    try {
        const response = await fetch(`${API_URL}/admin/tutorials/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        
        if (response.ok) {
            alert('Tutorial excluído com sucesso!');
            loadTutorials();
            if (currentTutorial && currentTutorial.id === id) {
                resetForm();
            }
        } else {
            alert('Erro ao excluir tutorial');
        }
    } catch (error) {
        console.error('Erro ao excluir tutorial:', error);
        alert('Erro ao excluir tutorial');
    }
}

function resetForm() {
    currentTutorial = null;
    tutorialForm.reset();
    document.getElementById('tutorialId').disabled = false;
}

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

tutorialForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tutorialData = {
        id: document.getElementById('tutorialId').value,
        title: document.getElementById('tutorialTitle').value,
        content: document.getElementById('tutorialContent').value,
        prev: document.getElementById('tutorialPrev').value || null,
        next: document.getElementById('tutorialNext').value || null
    };
    saveTutorial(tutorialData);
});

// Inicialize o editor quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    initEditor();
});

logoutBtn.addEventListener('click', logout);
newTutorialBtn.addEventListener('click', resetForm);
cancelBtn.addEventListener('click', resetForm);