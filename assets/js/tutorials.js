const API_URL = 'http://localhost:10000';

async function loadTutorials() {
    try {
        const response = await fetch(`${API_URL}/tutorials`);
        if (!response.ok) {
            throw new Error('Erro ao carregar tutoriais');
        }

        const tutorials = await response.json();
        
        if (tutorials.length === 0) {
            showEmptyMessage();
            return;
        }

        displayTutorials(tutorials);
    } catch (error) {
        console.error('Erro:', error);
        showErrorMessage();
    }
}

function showEmptyMessage() {
    const modulesContainer = document.querySelector('.modules-container');
    modulesContainer.innerHTML = `
        <div class="empty-message">
            <p>Nenhum tutorial cadastrado ainda.</p>
        </div>
    `;
}

function showErrorMessage() {
    const modulesContainer = document.querySelector('.modules-container');
    modulesContainer.innerHTML = `
        <div class="error-message">
            <p>Erro ao carregar os tutoriais. Por favor, tente novamente mais tarde.</p>
        </div>
    `;
}

function displayTutorials(tutorials) {
    const modulesContainer = document.querySelector('.modules-container');
    modulesContainer.innerHTML = '';

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
    Object.keys(moduleGroups)
        .sort((a, b) => Number(a) - Number(b))
        .forEach(moduleNumber => {
            const moduleContainer = document.createElement('div');
            moduleContainer.className = 'module-container';

            const moduleHeader = document.createElement('div');
            moduleHeader.className = 'module-header';
            moduleHeader.textContent = `Módulo ${moduleNumber}`;

            const tutorialsList = document.createElement('div');
            tutorialsList.className = 'tutorials-list';

            // Ordenar tutoriais dentro do módulo
            const sortedTutorials = moduleGroups[moduleNumber].sort((a, b) => {
                const aNumber = Number(a.id.split('-')[1]);
                const bNumber = Number(b.id.split('-')[1]);
                return aNumber - bNumber;
            });

            sortedTutorials.forEach(tutorial => {
                const tutorialCard = createTutorialCard(tutorial);
                tutorialsList.appendChild(tutorialCard);
            });

            moduleContainer.appendChild(moduleHeader);
            moduleContainer.appendChild(tutorialsList);
            modulesContainer.appendChild(moduleContainer);
        });
}

function createTutorialCard(tutorial) {
    const card = document.createElement('div');
    card.className = 'tutorial-card';
    
    // Conteúdo básico do card
    card.innerHTML = `
        <h3>
            <span class="tutorial-code">Tutorial ${tutorial.id}:</span>
            ${tutorial.title}
        </h3>
        <p>${tutorial.description || ''}</p>
        <div class="tutorial-expanded-content">
            <div class="tutorial-body"></div>
            <div class="tutorial-actions">
                <button class="close-tutorial">Fechar</button>
                <button class="start-tutorial">Iniciar</button>
            </div>
        </div>
    `;

    // Event listener para expandir/retrair
    card.addEventListener('click', async (e) => {
        // Ignorar cliques nos botões
        if (e.target.classList.contains('start-tutorial') || 
            e.target.classList.contains('close-tutorial')) {
            return;
        }

        // Se já estiver expandido e clicar em fechar, retrair
        if (e.target.classList.contains('close-tutorial')) {
            card.classList.remove('expanded');
            return;
        }

        // Fechar outros cards expandidos
        document.querySelectorAll('.tutorial-card.expanded').forEach(expandedCard => {
            if (expandedCard !== card) {
                expandedCard.classList.remove('expanded');
            }
        });

        // Se não estiver expandido, carregar conteúdo e expandir
        if (!card.classList.contains('expanded')) {
            try {
                const response = await fetch(`${API_URL}/tutorials/${tutorial.id}`);
                if (!response.ok) throw new Error('Erro ao carregar tutorial');
                
                const tutorialData = await response.json();
                const bodyElement = card.querySelector('.tutorial-body');
                bodyElement.innerHTML = tutorialData.content;
                
                card.classList.add('expanded');
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao carregar o tutorial. Por favor, tente novamente.');
            }
        }
    });

    // Event listener para o botão iniciar
    card.querySelector('.start-tutorial').addEventListener('click', () => {
        window.location.href = `tutorial-playground.html?id=${tutorial.id}`;
    });

    // Event listener para o botão fechar
    card.querySelector('.close-tutorial').addEventListener('click', () => {
        card.classList.remove('expanded');
    });

    return card;
}

// Carregar tutoriais quando a página for carregada
document.addEventListener('DOMContentLoaded', loadTutorials); 