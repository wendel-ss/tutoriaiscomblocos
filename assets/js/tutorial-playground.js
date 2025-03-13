document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'http://localhost:10000';

    // Configuração do Blockly
    const toolbox = {
        kind: "categoryToolbox",
        contents: [
            {
                kind: "category",
                name: "Lógica",
                colour: "%{BKY_LOGIC_HUE}",
                contents: [
                    { kind: "block", type: "controls_if" },
                    { kind: "block", type: "controls_if", extraState: { hasElse: true } },
                    { kind: "block", type: "logic_compare" },
                    { kind: "block", type: "logic_operation" },
                    { kind: "block", type: "logic_negate" },
                    { kind: "block", type: "logic_boolean" },
                    { kind: "block", type: "logic_null" },
                    { kind: "block", type: "logic_ternary" }
                ]
            },
            {
                kind: "category",
                name: "Loops",
                colour: "%{BKY_LOOPS_HUE}",
                contents: [
                    { kind: "block", type: "controls_repeat_ext" },
                    { kind: "block", type: "controls_whileUntil" },
                    { kind: "block", type: "controls_for" },
                    { kind: "block", type: "controls_forEach" },
                    { kind: "block", type: "controls_flow_statements" },
                    { kind: "block", type: "controls_repeat" },
                    { kind: "block", type: "controls_flow_statements" }
                ]
            },
            {
                kind: "category",
                name: "Matemática",
                colour: "%{BKY_MATH_HUE}",
                contents: [
                    { kind: "block", type: "math_number" },
                    { kind: "block", type: "math_arithmetic" },
                    { kind: "block", type: "math_single" },
                    { kind: "block", type: "math_trig" },
                    { kind: "block", type: "math_constant" },
                    { kind: "block", type: "math_round" },
                    { kind: "block", type: "math_modulo" },
                    { kind: "block", type: "math_constrain" },
                    { kind: "block", type: "math_random_int" },
                    { kind: "block", type: "math_random_float" },
                    { kind: "block", type: "math_number_property" }
                ]
            },
            {
                kind: "category",
                name: "Texto",
                colour: "%{BKY_TEXTS_HUE}",
                contents: [
                    { kind: "block", type: "text" },
                    { kind: "block", type: "text_print" },
                    { kind: "block", type: "text_join" },
                    { kind: "block", type: "text_append" },
                    { kind: "block", type: "text_length" },
                    { kind: "block", type: "text_isEmpty" },
                    { kind: "block", type: "text_indexOf" },
                    { kind: "block", type: "text_charAt" },
                    { kind: "block", type: "text_getSubstring" },
                    { kind: "block", type: "text_changeCase" },
                    { kind: "block", type: "text_trim" },
                    { kind: "block", type: "text_count" },
                    { kind: "block", type: "text_replace" }
                ]
            },
            {
                kind: "category",
                name: "Listas",
                colour: "%{BKY_LISTS_HUE}",
                contents: [
                    { kind: "block", type: "lists_create_empty" },
                    { kind: "block", type: "lists_create_with" },
                    { kind: "block", type: "lists_repeat" },
                    { kind: "block", type: "lists_length" },
                    { kind: "block", type: "lists_isEmpty" },
                    { kind: "block", type: "lists_indexOf" },
                    { kind: "block", type: "lists_getIndex" },
                    { kind: "block", type: "lists_setIndex" },
                    { kind: "block", type: "lists_getSublist" },
                    { kind: "block", type: "lists_sort" },
                    { kind: "block", type: "lists_split" },
                    { kind: "block", type: "lists_reverse" }
                ]
            },
            {
                kind: "category",
                name: "Variáveis",
                colour: "%{BKY_VARIABLES_HUE}",
                custom: "VARIABLE"
            },
            {
                kind: "category",
                name: "Funções",
                colour: "%{BKY_PROCEDURES_HUE}",
                custom: "PROCEDURE"
            }
        ]
    };

    // Elementos do Blockly
    const blocklyArea = document.getElementById('blocklyArea');
    const blocklyDiv = document.getElementById('blocklyDiv');

    // Configuração do Blockly
    const workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
        },
        trashcan: true,
        move: {
            scrollbars: true,
            drag: true,
            wheel: true
        },
        grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true
        }
    });

    // Função para redimensionar o Blockly
    function onResize() {
        const element = blocklyArea;
        const x = 0;
        const y = 0;
        let width = element.offsetWidth;
        let height = element.offsetHeight;
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = width + 'px';
        blocklyDiv.style.height = height + 'px';
        Blockly.svgResize(workspace);
    }

    window.addEventListener('resize', onResize, false);
    onResize();

    // Atualiza o código Python quando os blocos são modificados
    function updateCode() {
        const code = Blockly.Python.workspaceToCode(workspace);
        document.getElementById('pythonCode').textContent = code || '# Seu código Python aparecerá aqui';
    }

    workspace.addChangeListener(updateCode);

    let currentTutorialId = null;
    let tutorials = [];
    let currentTutorialIndex = -1;

    // Carregar todos os tutoriais para navegação
    async function loadAllTutorials() {
        try {
            const response = await fetch(`${API_URL}/tutorials`);
            if (!response.ok) {
                throw new Error('Erro ao carregar tutoriais');
            }
            tutorials = await response.json();
            
            // Encontrar o índice do tutorial atual
            const urlParams = new URLSearchParams(window.location.search);
            currentTutorialId = urlParams.get('id');
            currentTutorialIndex = tutorials.findIndex(t => t.id.toString() === currentTutorialId);
            
            updateNavigationButtons();
        } catch (error) {
            console.error('Erro ao carregar lista de tutoriais:', error);
        }
    }

    // Atualizar estado dos botões de navegação
    function updateNavigationButtons() {
        const prevButton = document.getElementById('prevTutorial');
        const nextButton = document.getElementById('nextTutorial');
        
        prevButton.disabled = currentTutorialIndex <= 0;
        nextButton.disabled = currentTutorialIndex >= tutorials.length - 1;
    }

    // Navegar para outro tutorial
    function navigateToTutorial(index) {
        if (index >= 0 && index < tutorials.length) {
            const tutorialId = tutorials[index].id;
            window.location.href = `tutorial-playground.html?id=${tutorialId}`;
        }
    }

    // Event listeners para os botões de navegação
    document.getElementById('prevTutorial').addEventListener('click', () => {
        navigateToTutorial(currentTutorialIndex - 1);
    });

    document.getElementById('nextTutorial').addEventListener('click', () => {
        navigateToTutorial(currentTutorialIndex + 1);
    });

    // Modificar a função loadTutorial existente
    async function loadTutorial() {
        const urlParams = new URLSearchParams(window.location.search);
        const tutorialId = urlParams.get('id');

        if (!tutorialId) {
            alert('Tutorial não especificado');
            window.location.href = 'tutorials.html';
            return;
        }

        try {
            const response = await fetch(`${API_URL}/tutorials/${tutorialId}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar tutorial');
            }

            const tutorial = await response.json();
            document.getElementById('tutorialTitle').textContent = tutorial.title;
            document.getElementById('tutorialContent').innerHTML = tutorial.content;
            
            // Carregar todos os tutoriais para navegação após carregar o tutorial atual
            await loadAllTutorials();
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao carregar o tutorial');
        }
    }

    // Configuração do botão de execução
    document.getElementById('executeButton').addEventListener('click', async () => {
        const code = document.getElementById('pythonCode').textContent;
        try {
            const response = await fetch(`${API_URL}/execute`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: code })
            });

            const data = await response.json();
            const outputDisplay = document.getElementById('outputDisplay');
            
            if (data.success) {
                outputDisplay.textContent = data.output || 'Código executado com sucesso!';
            } else {
                outputDisplay.textContent = 'Erro: ' + (data.error || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao executar o código:', error);
            document.getElementById('outputDisplay').textContent = 'Erro ao conectar com o servidor';
        }
    });

    // Inicialização
    updateCode();
    loadTutorial();
}); 