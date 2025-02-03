// Configuração específica do toolbox para o primeiro tutorial
const toolbox = `
  <xml id="toolbox" style="display: none">
    <category name="Texto" colour="160">
      <block type="text"></block>
      <block type="text_print"></block>
    </category>
  </xml>
`;

// Configurações do workspace
const workspaceOptions = {
    toolbox: toolbox,
    scrollbars: true,
    trashcan: true,
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
});

// Evento do botão executar
document.getElementById('runCodeBtn').addEventListener('click', () => {
    const code = Blockly.Python.workspaceToCode(workspace);
    // Simula a execução mostrando o resultado
    document.getElementById('resultOutput').textContent = 'Resultado da execução:\n' + code;
});

// Carrega um exemplo inicial para o tutorial
function loadExample() {
    const xmlText = `
        <xml>
            <block type="text_print" x="50" y="50">
                <value name="TEXT">
                    <block type="text">
                        <field name="TEXT">Olá, Mundo!</field>
                    </block>
                </value>
            </block>
        </xml>
    `;
    const xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, workspace);
}

// Carrega o exemplo quando a página carregar
document.addEventListener('DOMContentLoaded', loadExample); 