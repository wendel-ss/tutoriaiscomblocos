// Configuração da toolbox (caixa de ferramentas com os blocos)
const toolbox = `
  <xml id="toolbox" style="display: none">
    <category name="Lógica" colour="210">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="logic_negate"></block>
      <block type="logic_boolean"></block>
      <block type="logic_null"></block>
      <block type="logic_ternary"></block>
    </category>
    <category name="Loops" colour="120">
      <block type="controls_repeat_ext"></block>
      <block type="controls_whileUntil"></block>
      <block type="controls_for"></block>
      <block type="controls_forEach"></block>
      <block type="controls_flow_statements"></block>
    </category>
    <category name="Matemática" colour="230">
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="math_single"></block>
      <block type="math_trig"></block>
      <block type="math_constant"></block>
      <block type="math_number_property"></block>
      <block type="math_round"></block>
      <block type="math_modulo"></block>
      <block type="math_constrain"></block>
      <block type="math_random_int"></block>
      <block type="math_random_float"></block>
    </category>
    <category name="Texto" colour="160">
      <block type="text"></block>
      <block type="text_print"></block>
      <block type="text_join"></block>
      <block type="text_append"></block>
      <block type="text_length"></block>
      <block type="text_isEmpty"></block>
      <block type="text_indexOf"></block>
      <block type="text_charAt"></block>
      <block type="text_getSubstring"></block>
      <block type="text_changeCase"></block>
      <block type="text_trim"></block>
    </category>
    <category name="Listas" colour="260">
      <block type="lists_create_empty"></block>
      <block type="lists_create_with"></block>
      <block type="lists_repeat"></block>
      <block type="lists_length"></block>
      <block type="lists_isEmpty"></block>
      <block type="lists_indexOf"></block>
      <block type="lists_getIndex"></block>
      <block type="lists_setIndex"></block>
      <block type="lists_getSublist"></block>
      <block type="lists_sort"></block>
    </category>
    <category name="Variáveis" custom="VARIABLE" colour="330">
    </category>
    <category name="Funções" custom="PROCEDURE" colour="290">
    </category>
  </xml>
`;

// Configurações do workspace
const workspaceOptions = {
    toolbox: toolbox,
    scrollbars: true,
    horizontalLayout: false,
    trashcan: true,
    media: 'https://unpkg.com/blockly/media/',
    autosave: false,
    move: {
        scrollbars: true,
        drag: true,
        wheel: true
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    }
};

// Inicializa o workspace do Blockly
const workspace = Blockly.inject('blocklyDiv', workspaceOptions);

// Adiciona evento para atualizar o código Python quando os blocos são modificados
workspace.addChangeListener(() => {
    const code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('codeOutput').textContent = code;
    // Limpa qualquer estado salvo
    localStorage.removeItem('blocklyWorkspace');
});

// URL base da API - será diferente em desenvolvimento e produção
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : 'https://api.tutoriaiscomblocos.com.br';

// Evento do botão executar
document.getElementById('runCodeBtn').addEventListener('click', async () => {
    const code = Blockly.Python.workspaceToCode(workspace);
    const resultOutput = document.getElementById('resultOutput');
    
    try {
        resultOutput.textContent = "Executando...";
        console.log('Tentando executar código:', code);
        
        if (!code.trim()) {
            resultOutput.textContent = "Nenhum código para executar";
            return;
        }
        
        const url = `${API_URL}/execute`;
        console.log('Enviando requisição para:', url);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        });
        
        console.log('Resposta recebida:', response);
        const data = await response.json();
        console.log('Dados recebidos:', data);
        
        resultOutput.textContent = data.output || data.error || "Programa executado com sucesso!";
    } catch (error) {
        console.error('Erro completo:', error);
        resultOutput.textContent = "Erro ao conectar com o servidor. Verifique se o servidor está rodando.";
    }
});

// Função para carregar o tutorial especificado na URL
function loadTutorial() {
    console.log('Carregando tutorial...');
    const urlParams = new URLSearchParams(window.location.search);
    const tutorialId = urlParams.get('tutorial');
    
    if (tutorialId && TUTORIALS[tutorialId]) {
        const tutorial = TUTORIALS[tutorialId];
        
        // Atualiza o conteúdo do tutorial
        const sidebarElement = document.querySelector('#tutorialsSidebar');
        
        // Cria os botões de navegação
        const navButtons = document.createElement('div');
        navButtons.className = 'tutorial-nav-buttons';
        
        if (tutorial.prev) {
            const prevButton = document.createElement('a');
            prevButton.href = `?tutorial=${tutorial.prev}`;
            prevButton.className = 'btn btn-secondary';
            prevButton.innerHTML = '← Tutorial Anterior';
            navButtons.appendChild(prevButton);
        }
        
        if (tutorial.next) {
            const nextButton = document.createElement('a');
            nextButton.href = `?tutorial=${tutorial.next}`;
            nextButton.className = 'btn btn-primary';
            nextButton.innerHTML = 'Próximo Tutorial →';
            navButtons.appendChild(nextButton);
        }
        
        sidebarElement.innerHTML = `
            <h3>${tutorial.title}</h3>
            <div class="tutorial-content">
                ${tutorial.content}
            </div>
            ${navButtons.outerHTML}
        `;
        
        // Adiciona eventos aos botões de navegação
        document.querySelectorAll('.tutorial-nav-buttons a').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = new URL(button.href);
                const newTutorialId = url.searchParams.get('tutorial');
                window.history.pushState({}, '', `?tutorial=${newTutorialId}`);
                loadTutorial();
                initializeWorkspace();
            });
        });
    } else {
        // Se não houver tutorial, limpa a sidebar
        document.querySelector('#tutorialsSidebar').innerHTML = `
            <h3>Playground</h3>
            <div class="tutorial-content">
                <p>Use os blocos à esquerda para criar seu programa.</p>
            </div>
        `;
    }
}

// Função para inicializar o workspace limpo
function initializeWorkspace() {
    workspace.clear();
    localStorage.removeItem('blocklyWorkspace');
    workspace.updateToolbox(toolbox);
}

// Limpa o workspace e carrega o tutorial quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    initializeWorkspace();
    loadTutorial();
});

// Adiciona descrições em português para os blocos
Blockly.Blocks['text'].tooltip = "Um bloco para escrever texto";
Blockly.Blocks['text_print'].tooltip = "Bloco para exibir texto na tela";