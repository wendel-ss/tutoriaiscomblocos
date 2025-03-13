document.addEventListener('DOMContentLoaded', function() {
    // Configuração da toolbox do Blockly
    const toolbox = {
        kind: "categoryToolbox",
        contents: [
            {
                kind: "category",
                name: "Lógica",
                colour: "%{BKY_LOGIC_HUE}",
                contents: [
                    {
                        kind: "block",
                        type: "controls_if"
                    },
                    {
                        kind: "block",
                        type: "controls_if",
                        extraState: { hasElse: true }
                    },
                    {
                        kind: "block",
                        type: "logic_compare"
                    },
                    {
                        kind: "block",
                        type: "logic_operation"
                    },
                    {
                        kind: "block",
                        type: "logic_negate"
                    },
                    {
                        kind: "block",
                        type: "logic_boolean"
                    },
                    {
                        kind: "block",
                        type: "logic_null"
                    },
                    {
                        kind: "block",
                        type: "logic_ternary"
                    }
                ]
            },
            {
                kind: "category",
                name: "Loops",
                colour: "%{BKY_LOOPS_HUE}",
                contents: [
                    {
                        kind: "block",
                        type: "controls_repeat_ext"
                    },
                    {
                        kind: "block",
                        type: "controls_whileUntil"
                    },
                    {
                        kind: "block",
                        type: "controls_for"
                    },
                    {
                        kind: "block",
                        type: "controls_forEach"
                    },
                    {
                        kind: "block",
                        type: "controls_flow_statements",
                        enabled: true
                    },
                    {
                        kind: "block",
                        type: "controls_repeat"
                    },
                    {
                        kind: "block",
                        type: "controls_flow_statements"
                    }
                ]
            },
            {
                kind: "category",
                name: "Matemática",
                colour: "%{BKY_MATH_HUE}",
                contents: [
                    {
                        kind: "block",
                        type: "math_number"
                    },
                    {
                        kind: "block",
                        type: "math_arithmetic"
                    },
                    {
                        kind: "block",
                        type: "math_single"
                    },
                    {
                        kind: "block",
                        type: "math_trig"
                    },
                    {
                        kind: "block",
                        type: "math_constant"
                    },
                    {
                        kind: "block",
                        type: "math_round"
                    },
                    {
                        kind: "block",
                        type: "math_modulo"
                    },
                    {
                        kind: "block",
                        type: "math_constrain"
                    },
                    {
                        kind: "block",
                        type: "math_random_int"
                    },
                    {
                        kind: "block",
                        type: "math_random_float"
                    },
                    {
                        kind: "block",
                        type: "math_number_property"
                    }
                ]
            },
            {
                kind: "category",
                name: "Texto",
                colour: "%{BKY_TEXTS_HUE}",
                contents: [
                    {
                        kind: "block",
                        type: "text"
                    },
                    {
                        kind: "block",
                        type: "text_print"
                    },
                    {
                        kind: "block",
                        type: "text_join"
                    },
                    {
                        kind: "block",
                        type: "text_append"
                    },
                    {
                        kind: "block",
                        type: "text_length"
                    },
                    {
                        kind: "block",
                        type: "text_isEmpty"
                    },
                    {
                        kind: "block",
                        type: "text_indexOf"
                    },
                    {
                        kind: "block",
                        type: "text_charAt"
                    },
                    {
                        kind: "block",
                        type: "text_getSubstring"
                    },
                    {
                        kind: "block",
                        type: "text_changeCase"
                    },
                    {
                        kind: "block",
                        type: "text_trim"
                    },
                    {
                        kind: "block",
                        type: "text_count"
                    },
                    {
                        kind: "block",
                        type: "text_replace"
                    }
                ]
            },
            {
                kind: "category",
                name: "Listas",
                colour: "%{BKY_LISTS_HUE}",
                contents: [
                    {
                        kind: "block",
                        type: "lists_create_empty"
                    },
                    {
                        kind: "block",
                        type: "lists_create_with"
                    },
                    {
                        kind: "block",
                        type: "lists_repeat"
                    },
                    {
                        kind: "block",
                        type: "lists_length"
                    },
                    {
                        kind: "block",
                        type: "lists_isEmpty"
                    },
                    {
                        kind: "block",
                        type: "lists_indexOf"
                    },
                    {
                        kind: "block",
                        type: "lists_getIndex"
                    },
                    {
                        kind: "block",
                        type: "lists_setIndex"
                    },
                    {
                        kind: "block",
                        type: "lists_getSublist"
                    },
                    {
                        kind: "block",
                        type: "lists_sort"
                    },
                    {
                        kind: "block",
                        type: "lists_split"
                    },
                    {
                        kind: "block",
                        type: "lists_reverse"
                    }
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
        // Dimensões da área do Blockly
        const element = blocklyArea;
        const x = 0;
        const y = 0;
        let width = element.offsetWidth;
        let height = element.offsetHeight;

        // Atualiza o tamanho do div do Blockly
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = width + 'px';
        blocklyDiv.style.height = height + 'px';
        Blockly.svgResize(workspace);
    }

    // Adiciona listener para redimensionamento
    window.addEventListener('resize', onResize, false);
    onResize();

    // Atualiza o código Python quando os blocos são modificados
    function updateCode() {
        const code = Blockly.Python.workspaceToCode(workspace);
        document.getElementById('pythonCode').textContent = code || '# Seu código Python aparecerá aqui';
    }

    // Adiciona listener para mudanças no workspace
    workspace.addChangeListener(updateCode);

    // Configuração do botão de execução
    document.getElementById('executeButton').addEventListener('click', async () => {
        const code = document.getElementById('pythonCode').textContent;
        try {
            const response = await fetch('http://localhost:10000/execute', {
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
}); 