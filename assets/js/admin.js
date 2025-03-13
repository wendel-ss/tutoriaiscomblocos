const API_URL = 'http://localhost:10000';  // Simplificar para usar sempre o localhost durante desenvolvimento

// Elementos do DOM
const loginScreen = document.getElementById('loginScreen');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const tutorialsList = document.getElementById('tutorialsList');

// Elementos adicionais do DOM
const tutorialForm = document.getElementById('tutorialForm');
const tutorialEditor = document.getElementById('tutorialEditor');
const newTutorialBtn = document.getElementById('newTutorialBtn');
const cancelBtn = document.getElementById('cancelBtn');
let currentTutorial = null;

// Adicionar variável para armazenar o token
let authToken = localStorage.getItem('authToken');

// Funções de autenticação
async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            loginScreen.style.display = 'none';
            adminPanel.style.display = 'block';
            logoutBtn.style.display = 'block';
            // Forçar um reload completo após mostrar o painel
            window.location.reload(true);
        } else {
            throw new Error(data.error || 'Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        alert(error.message);
    }
}

async function logout() {
    try {
        localStorage.removeItem('authToken');
        authToken = null;
        loginScreen.style.display = 'block';
        adminPanel.style.display = 'none';
        logoutBtn.style.display = 'none';
        currentTutorial = null;
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}

// Função para carregar a lista de tutoriais
async function loadTutorials() {
    try {
        const response = await fetch(`${API_URL}/admin/tutorials`, {
            headers: {
                'Authorization': authToken
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const tutorials = await response.json();
        
        // Limpa a lista atual
        tutorialsList.innerHTML = '';
        
        // Adiciona cada tutorial à lista
        tutorials.forEach(tutorial => {
            const div = document.createElement('div');
            div.className = 'tutorial-item';
            div.innerHTML = `
                <span>${tutorial.id} - ${tutorial.title}</span>
                <button class="delete-btn" data-id="${tutorial.id}">×</button>
            `;
            
            // Adiciona evento de clique para editar
            div.querySelector('span').addEventListener('click', () => {
                showForm(tutorial);
            });
            
            // Adiciona evento de clique para deletar
            div.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                // Implementaremos a deleção depois
                console.log('Deletar tutorial:', tutorial.id);
            });
            
            tutorialsList.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao carregar tutoriais:', error);
        // Não exibir alert aqui, apenas log no console
    }
}

// Função para mostrar o formulário
function showForm(tutorial = null) {
    currentTutorial = tutorial;
    document.getElementById('formTitle').textContent = tutorial ? 'Editar Tutorial' : 'Novo Tutorial';
    
    if (tutorial) {
        document.getElementById('tutorialId').value = tutorial.id;
        document.getElementById('tutorialId').disabled = true;
        document.getElementById('tutorialTitle').value = tutorial.title;
        document.getElementById('tutorialContent').value = tutorial.content;
        document.getElementById('tutorialPrev').value = tutorial.prev || '';
        document.getElementById('tutorialNext').value = tutorial.next || '';
    } else {
        tutorialEditor.reset();
        document.getElementById('tutorialId').disabled = false;
    }
    
    tutorialForm.style.display = 'block';
}

// Adicionar esta nova função para renovar a sessão
async function renewSession() {
    try {
        const response = await fetch(`${API_URL}/admin/check-session`, {
            method: 'GET',
            credentials: 'include'
        });
        
        if (response.ok) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Erro ao renovar sessão:', error);
        return false;
    }
}

// Adicionar função para deletar tutorial
async function deleteTutorial(tutorialId) {
    if (!confirm('Tem certeza que deseja excluir este tutorial?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/admin/tutorials/${tutorialId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': authToken
            }
        });

        if (response.status === 401) {
            localStorage.removeItem('authToken');
            authToken = null;
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            loginScreen.style.display = 'block';
            adminPanel.style.display = 'none';
            return;
        }

        const data = await response.json();
        if (data.success) {
            await loadTutorials();
            alert('Tutorial excluído com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao excluir tutorial:', error);
        alert('Erro ao excluir tutorial. Por favor, tente novamente.');
    }
}

// Adicionar função para validar o formato do ID
function validateTutorialId(id) {
    const pattern = /^\d+-\d+$/;
    if (!pattern.test(id)) {
        alert('O ID do tutorial deve seguir o formato "número-número" (exemplo: 1-1, 2-3)');
        return false;
    }
    return true;
}

// Atualizar a função updateTutorialsList para agrupar por módulo
function updateTutorialsList(tutorials) {
    tutorialsList.innerHTML = '';
    
    // Agrupar tutoriais por módulo
    const moduleGroups = tutorials.reduce((groups, tutorial) => {
        const moduleNumber = tutorial.id.split('-')[0];
        if (!groups[moduleNumber]) {
            groups[moduleNumber] = [];
        }
        groups[moduleNumber].push(tutorial);
        return groups;
    }, {});
    
    // Criar elementos para cada módulo
    Object.keys(moduleGroups).sort((a, b) => Number(a) - Number(b)).forEach(moduleNumber => {
        const moduleDiv = document.createElement('div');
        moduleDiv.className = 'module-group';
        
        const moduleTitle = document.createElement('h3');
        moduleTitle.textContent = `Módulo ${moduleNumber}`;
        moduleDiv.appendChild(moduleTitle);
        
        // Ordenar tutoriais dentro do módulo
        const sortedTutorials = moduleGroups[moduleNumber].sort((a, b) => {
            const aNumber = Number(a.id.split('-')[1]);
            const bNumber = Number(b.id.split('-')[1]);
            return aNumber - bNumber;
        });
        
        sortedTutorials.forEach(tutorial => {
            const div = document.createElement('div');
            div.className = 'tutorial-item';
            div.innerHTML = `
                <span>${tutorial.id} - ${tutorial.title}</span>
                <div class="tutorial-actions">
                    <button class="preview-btn" title="Visualizar tutorial">👁️</button>
                    <button class="delete-btn" data-id="${tutorial.id}" title="Excluir tutorial">×</button>
                </div>
            `;
            
            div.querySelector('span').addEventListener('click', () => {
                showForm(tutorial);
            });
            
            div.querySelector('.preview-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                showPreview(tutorial);
            });
            
            div.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTutorial(tutorial.id);
            });
            
            moduleDiv.appendChild(div);
        });
        
        tutorialsList.appendChild(moduleDiv);
    });
}

// Atualizar a função showPreview para buscar o conteúdo completo
async function showPreview(tutorial) {
    try {
        // Buscar o conteúdo completo do tutorial
        const response = await fetch(`${API_URL}/admin/tutorials/${tutorial.id}`, {
            headers: {
                'Authorization': authToken
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar o conteúdo do tutorial');
        }

        const tutorialCompleto = await response.json();
        
        const previewDialog = document.createElement('dialog');
        previewDialog.className = 'preview-dialog';
        
        previewDialog.innerHTML = `
            <div class="preview-content">
                <h2>${tutorialCompleto.title}</h2>
                <div class="preview-info">
                    <span>ID: ${tutorialCompleto.id}</span>
                </div>
                <div class="tutorial-content">${tutorialCompleto.content}</div>
                <button class="close-preview">Fechar</button>
            </div>
        `;
        
        document.body.appendChild(previewDialog);
        previewDialog.showModal();
        
        previewDialog.querySelector('.close-preview').addEventListener('click', () => {
            previewDialog.close();
            previewDialog.remove();
        });

        // Fechar com Esc também
        previewDialog.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                previewDialog.close();
                previewDialog.remove();
            }
        });

    } catch (error) {
        console.error('Erro ao carregar preview:', error);
        alert('Erro ao carregar o preview do tutorial');
    }
}

// Atualizar a função saveTutorial para incluir validação
async function saveTutorial(tutorialData) {
    if (!validateTutorialId(tutorialData.id)) {
        return;
    }
    
    const saveBtn = document.querySelector('#tutorialEditor button[type="submit"]');
    const originalText = saveBtn.textContent;
    
    try {
        saveBtn.textContent = 'Salvando...';
        saveBtn.disabled = true;

        if (!authToken) {
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            loginScreen.style.display = 'block';
            adminPanel.style.display = 'none';
            return;
        }

        const method = currentTutorial ? 'PUT' : 'POST';
        const url = currentTutorial 
            ? `${API_URL}/admin/tutorials/${currentTutorial.id}`
            : `${API_URL}/admin/tutorials`;
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify(tutorialData)
        });

        if (response.status === 401) {
            localStorage.removeItem('authToken');
            authToken = null;
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            loginScreen.style.display = 'block';
            adminPanel.style.display = 'none';
            return;
        }

        const data = await response.json();
        if (data.success) {
            tutorialForm.style.display = 'none';
            await loadTutorials();
            alert('Tutorial salvo com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao salvar tutorial:', error);
        alert('Erro ao salvar tutorial. Por favor, tente novamente.');
    } finally {
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
    }
}

// Atualizar a função checkAuthToken
async function checkAuthToken() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        loginScreen.style.display = 'block';
        adminPanel.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/admin/tutorials`, {
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            // Se o token for inválido, limpar e mostrar tela de login
            localStorage.removeItem('authToken');
            loginScreen.style.display = 'block';
            adminPanel.style.display = 'none';
            return;
        }

        // Se chegou aqui, o token é válido
        authToken = token;
        loginScreen.style.display = 'none';
        adminPanel.style.display = 'block';
        logoutBtn.style.display = 'block';
        
        const tutorials = await response.json();
        updateTutorialsList(tutorials);
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        loginScreen.style.display = 'block';
        adminPanel.style.display = 'none';
    }
}

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

logoutBtn.addEventListener('click', logout);

// Event Listeners adicionais
newTutorialBtn.addEventListener('click', () => showForm());

cancelBtn.addEventListener('click', () => {
    tutorialForm.style.display = 'none';
    currentTutorial = null;
});

tutorialEditor.addEventListener('submit', (e) => {
    e.preventDefault();
    const tutorialData = {
        id: document.getElementById('tutorialId').value,
        title: document.getElementById('tutorialTitle').value,
        content: document.getElementById('tutorialContent').value
    };
    saveTutorial(tutorialData);
});

// Mover estas funções para dentro do DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    checkAuthToken();  // Manter a chamada existente

    // Adicionar configuração do modal de alteração de senha
    const changePasswordModal = document.getElementById('changePasswordModal');
    const changePasswordForm = document.getElementById('changePasswordForm');

    // Configurar funções do modal
    window.showChangePasswordModal = function() {
        changePasswordModal.style.display = 'block';
        changePasswordForm.reset();
    }

    window.closeChangePasswordModal = function() {
        changePasswordModal.style.display = 'none';
    }

    // Configurar o formulário de alteração de senha
    changePasswordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/admin/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken  // Usar a variável global authToken
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Senha alterada com sucesso!');
                closeChangePasswordModal();
            } else {
                alert(data.error || 'Erro ao alterar a senha');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao alterar a senha');
        }
    });
}); 