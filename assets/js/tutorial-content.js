const TUTORIALS = {
    '1-1': {
        title: 'Meu Primeiro Programa',
        prev: null,
        next: '1-2',
        content: `
            <section class="tutorial-section">
                <h3>Introdução</h3>
                <p>Neste tutorial, você aprenderá a criar seu primeiro programa usando blocos. 
                   Vamos começar com algo simples: exibir mensagens na tela!</p>
            </section>

            <section class="tutorial-section">
                <h3>Passo 1: Encontrando o Bloco de Texto</h3>
                <p>Na barra lateral esquerda, procure a categoria "Texto" (em verde) e encontre o bloco "imprimir".</p>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Você precisará de dois blocos:</p>
                    <ul>
                        <li>O bloco "imprimir" (para exibir texto na tela)</li>
                        <li>O bloco de texto (para escrever sua mensagem)</li>
                    </ul>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 2: Criando uma Mensagem</h3>
                <p>1. Arraste o bloco "imprimir" para a área de trabalho</p>
                <p>2. Arraste um bloco de texto para dentro do espaço do bloco "imprimir"</p>
                <p>3. Digite sua mensagem no bloco de texto</p>
                <div class="tutorial-challenge">
                    <h4>Desafio</h4>
                    <p>Tente criar um programa que exiba "Olá, Mundo!" na tela.</p>
                </div>
            </section>
        `,
        toolbox: `
            <xml id="toolbox" style="display: none">
                <category name="Texto" colour="160">
                    <block type="text_print">
                        <value name="TEXT">
                            <shadow type="text">
                                <field name="TEXT">digite seu texto aqui</field>
                            </shadow>
                        </value>
                    </block>
                    <block type="text">
                        <field name="TEXT">digite seu texto aqui</field>
                    </block>
                </category>
            </xml>
        `,
        startingBlock: `
            <xml>
                <block type="text_print" x="50" y="50">
                    <value name="TEXT">
                        <block type="text">
                            <field name="TEXT">Olá, Mundo!</field>
                        </block>
                    </value>
                </block>
            </xml>
        `
    },
    '1-2': {
        title: 'Números e Operações',
        prev: '1-1',
        next: '2-1',
        content: `
            <section class="tutorial-section">
                <h3>Introdução</h3>
                <p>Neste tutorial, você aprenderá a trabalhar com números e operações matemáticas usando blocos.</p>
            </section>

            <section class="tutorial-section">
                <h3>Passo 1: Blocos Matemáticos</h3>
                <p>Na barra lateral esquerda, procure a categoria "Matemática" (em azul) e observe os blocos disponíveis:</p>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Você encontrará blocos para:</p>
                    <ul>
                        <li>Números</li>
                        <li>Operações básicas (+, -, ×, ÷)</li>
                        <li>Operações matemáticas mais complexas</li>
                    </ul>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 2: Criando uma Calculadora Simples</h3>
                <p>Vamos criar um programa que realiza um cálculo e mostra o resultado:</p>
                <ol>
                    <li>Arraste um bloco "imprimir" da categoria "Texto"</li>
                    <li>Arraste um bloco de operação matemática para dentro do bloco "imprimir"</li>
                    <li>Adicione números aos espaços do bloco de operação</li>
                </ol>
                <div class="tutorial-challenge">
                    <h4>Desafio</h4>
                    <p>Crie um programa que calcule e mostre o resultado de: 42 + 18</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 3: Experimente!</h3>
                <p>Tente criar outros cálculos usando diferentes operações matemáticas.</p>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Você pode combinar várias operações matemáticas para criar expressões mais complexas!</p>
                </div>
            </section>
        `,
        toolbox: `
            <xml id="toolbox" style="display: none">
                <category name="Matemática" colour="230">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                    <block type="math_arithmetic">
                        <field name="OP">ADD</field>
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>
                </category>
                <category name="Texto" colour="160">
                    <block type="text_print">
                        <value name="TEXT">
                            <shadow type="text">
                                <field name="TEXT">digite seu texto aqui</field>
                            </shadow>
                        </value>
                    </block>
                </category>
            </xml>
        `,
        startingBlock: `
            <xml>
                <block type="text_print" x="50" y="50">
                    <value name="TEXT">
                        <block type="math_arithmetic">
                            <field name="OP">ADD</field>
                            <value name="A">
                                <shadow type="math_number">
                                    <field name="NUM">42</field>
                                </shadow>
                            </value>
                            <value name="B">
                                <shadow type="math_number">
                                    <field name="NUM">18</field>
                                </shadow>
                            </value>
                        </block>
                    </value>
                </block>
            </xml>
        `
    },
    '2-1': {
        title: 'Variáveis',
        prev: '1-2',
        next: '2-2',
        content: `
            <section class="tutorial-section">
                <h3>Introdução</h3>
                <p>Neste tutorial, você aprenderá a usar variáveis para armazenar e manipular dados em seu programa.</p>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Variáveis são como "caixas" onde podemos guardar informações para usar depois!</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 1: Criando Variáveis</h3>
                <p>Para criar uma variável:</p>
                <ol>
                    <li>Clique na categoria "Variáveis" (em laranja)</li>
                    <li>Clique no botão "Criar variável"</li>
                    <li>Digite um nome para sua variável (por exemplo: "idade")</li>
                </ol>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Use nomes que façam sentido para suas variáveis. Por exemplo: "nome", "idade", "total".</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 2: Usando Variáveis</h3>
                <p>Vamos criar um programa que:</p>
                <ol>
                    <li>Cria uma variável chamada "idade"</li>
                    <li>Atribui um valor a ela</li>
                    <li>Mostra a idade na tela</li>
                    <li>Aumenta a idade em 1</li>
                    <li>Mostra a nova idade</li>
                </ol>
                <div class="tutorial-challenge">
                    <h4>Desafio</h4>
                    <p>Crie um programa que mostre sua idade atual e depois mostre sua idade no próximo ano!</p>
                </div>
            </section>
        `,
        toolbox: `
            <xml id="toolbox" style="display: none">
                <category name="Variáveis" custom="VARIABLE" colour="330">
                </category>
                <category name="Matemática" colour="230">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                    <block type="math_arithmetic">
                        <field name="OP">ADD</field>
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>
                </category>
                <category name="Texto" colour="160">
                    <block type="text_print">
                        <value name="TEXT">
                            <shadow type="text">
                                <field name="TEXT">digite seu texto aqui</field>
                            </shadow>
                        </value>
                    </block>
                </category>
            </xml>
        `,
        startingBlock: `
            <xml>
                <variables>
                    <variable id="idade">idade</variable>
                </variables>
                <block type="variables_set" x="50" y="50">
                    <field name="VAR" id="idade">idade</field>
                    <value name="VALUE">
                        <block type="math_number">
                            <field name="NUM">15</field>
                        </block>
                    </value>
                    <next>
                        <block type="text_print">
                            <value name="TEXT">
                                <block type="variables_get">
                                    <field name="VAR" id="idade">idade</field>
                                </block>
                            </value>
                        </block>
                    </next>
                </block>
            </xml>
        `
    },
    '2-2': {
        title: 'Condicionais',
        content: `
            <section class="tutorial-section">
                <h3>Introdução</h3>
                <p>Neste tutorial, você aprenderá a fazer seu programa tomar decisões usando estruturas condicionais (if/else).</p>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Condicionais são como "escolhas" que seu programa faz baseado em certas condições!</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 1: Estrutura Condicional</h3>
                <p>Na categoria "Lógica" (em azul), você encontrará o bloco "se/senão". Este bloco permite:</p>
                <ul>
                    <li>Verificar uma condição</li>
                    <li>Executar código quando a condição for verdadeira</li>
                    <li>Opcionalmente, executar outro código quando for falsa</li>
                </ul>
            </section>

            <section class="tutorial-section">
                <h3>Passo 2: Comparações</h3>
                <p>Para criar condições, use os blocos de comparação:</p>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <ul>
                        <li>= (igual a)</li>
                        <li>≠ (diferente de)</li>
                        <li>< (menor que)</li>
                        <li>> (maior que)</li>
                        <li>≤ (menor ou igual a)</li>
                        <li>≥ (maior ou igual a)</li>
                    </ul>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 3: Criando um Programa com Decisões</h3>
                <p>Vamos criar um programa que verifica a idade de uma pessoa e mostra uma mensagem apropriada:</p>
                <ol>
                    <li>Crie uma variável "idade"</li>
                    <li>Use um bloco "se/senão"</li>
                    <li>Compare a idade com 18</li>
                    <li>Mostre mensagens diferentes baseadas no resultado</li>
                </ol>
                <div class="tutorial-challenge">
                    <h4>Desafio</h4>
                    <p>Crie um programa que verifica se uma pessoa é maior de idade (18 anos ou mais) e mostra "Maior de idade" ou "Menor de idade".</p>
                </div>
            </section>
        `,
        toolbox: `
            <xml id="toolbox" style="display: none">
                <category name="Lógica" colour="210">
                    <block type="controls_if"></block>
                    <block type="logic_compare">
                        <field name="OP">EQ</field>
                    </block>
                </category>
                <category name="Variáveis" custom="VARIABLE" colour="330">
                </category>
                <category name="Matemática" colour="230">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </category>
                <category name="Texto" colour="160">
                    <block type="text">
                        <field name="TEXT">digite seu texto aqui</field>
                    </block>
                    <block type="text_print">
                        <value name="TEXT">
                            <shadow type="text">
                                <field name="TEXT">digite seu texto aqui</field>
                            </shadow>
                        </value>
                    </block>
                </category>
            </xml>
        `,
        startingBlock: `
            <xml>
                <variables>
                    <variable id="idade">idade</variable>
                </variables>
                <block type="variables_set" x="50" y="50">
                    <field name="VAR" id="idade">idade</field>
                    <value name="VALUE">
                        <block type="math_number">
                            <field name="NUM">16</field>
                        </block>
                    </value>
                    <next>
                        <block type="controls_if">
                            <mutation else="1"></mutation>
                            <value name="IF0">
                                <block type="logic_compare">
                                    <field name="OP">GTE</field>
                                    <value name="A">
                                        <block type="variables_get">
                                            <field name="VAR" id="idade">idade</field>
                                        </block>
                                    </value>
                                    <value name="B">
                                        <block type="math_number">
                                            <field name="NUM">18</field>
                                        </block>
                                    </value>
                                </block>
                            </value>
                            <statement name="DO0">
                                <block type="text_print">
                                    <value name="TEXT">
                                        <block type="text">
                                            <field name="TEXT">Maior de idade</field>
                                        </block>
                                    </value>
                                </block>
                            </statement>
                            <statement name="ELSE">
                                <block type="text_print">
                                    <value name="TEXT">
                                        <block type="text">
                                            <field name="TEXT">Menor de idade</field>
                                        </block>
                                    </value>
                                </block>
                            </statement>
                        </block>
                    </next>
                </block>
            </xml>
        `
    },
    '3-1': {
        title: 'Loops',
        content: `
            <section class="tutorial-section">
                <h3>Introdução</h3>
                <p>Neste tutorial, você aprenderá a usar loops para repetir ações em seu programa.</p>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Loops são úteis quando você precisa fazer a mesma coisa várias vezes!</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 1: Tipos de Loops</h3>
                <p>Na categoria "Loops" (em verde), você encontrará diferentes tipos de loops:</p>
                <ul>
                    <li><strong>Repetir X vezes</strong>: Repete um bloco de código um número específico de vezes</li>
                    <li><strong>Repetir enquanto</strong>: Repete enquanto uma condição for verdadeira</li>
                    <li><strong>Repetir para cada item</strong>: Repete para cada elemento em uma lista</li>
                </ul>
            </section>

            <section class="tutorial-section">
                <h3>Passo 2: Contagem Regressiva</h3>
                <p>Vamos criar um programa que faz uma contagem regressiva de 5 até 1:</p>
                <ol>
                    <li>Use o bloco "repetir X vezes" e configure para 5 repetições</li>
                    <li>Dentro do loop, use um bloco "imprimir"</li>
                    <li>Use uma variável para contar de 5 até 1</li>
                </ol>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Você pode usar uma variável como contador e diminuir seu valor a cada repetição!</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 3: Experimente!</h3>
                <div class="tutorial-challenge">
                    <h4>Desafio</h4>
                    <p>Modifique o programa para:</p>
                    <ol>
                        <li>Contar de 1 até 10</li>
                        <li>Mostrar apenas os números pares</li>
                        <li>No final, mostrar "Fim da contagem!"</li>
                    </ol>
                </div>
            </section>
        `,
        toolbox: `
            <xml id="toolbox" style="display: none">
                <category name="Loops" colour="120">
                    <block type="controls_repeat_ext">
                        <value name="TIMES">
                            <shadow type="math_number">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
                    </block>
                    <block type="controls_whileUntil">
                        <field name="MODE">WHILE</field>
                    </block>
                    <block type="controls_for">
                        <field name="VAR" id="count">i</field>
                        <value name="FROM">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="TO">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                        <value name="BY">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>
                </category>
                <category name="Variáveis" custom="VARIABLE" colour="330">
                </category>
                <category name="Matemática" colour="230">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                    <block type="math_arithmetic">
                        <field name="OP">ADD</field>
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>
                </category>
                <category name="Texto" colour="160">
                    <block type="text_print">
                        <value name="TEXT">
                            <shadow type="text">
                                <field name="TEXT">digite seu texto aqui</field>
                            </shadow>
                        </value>
                    </block>
                    <block type="text">
                        <field name="TEXT">Fim da contagem!</field>
                    </block>
                </category>
            </xml>
        `,
        startingBlock: `
            <xml>
                <variables>
                    <variable id="contador">contador</variable>
                </variables>
                <block type="variables_set" x="50" y="50">
                    <field name="VAR" id="contador">contador</field>
                    <value name="VALUE">
                        <block type="math_number">
                            <field name="NUM">5</field>
                        </block>
                    </value>
                    <next>
                        <block type="controls_repeat_ext">
                            <value name="TIMES">
                                <shadow type="math_number">
                                    <field name="NUM">5</field>
                                </shadow>
                            </value>
                            <statement name="DO">
                                <block type="text_print">
                                    <value name="TEXT">
                                        <block type="variables_get">
                                            <field name="VAR" id="contador">contador</field>
                                        </block>
                                    </value>
                                    <next>
                                        <block type="variables_set">
                                            <field name="VAR" id="contador">contador</field>
                                            <value name="VALUE">
                                                <block type="math_arithmetic">
                                                    <field name="OP">MINUS</field>
                                                    <value name="A">
                                                        <block type="variables_get">
                                                            <field name="VAR" id="contador">contador</field>
                                                        </block>
                                                    </value>
                                                    <value name="B">
                                                        <block type="math_number">
                                                            <field name="NUM">1</field>
                                                        </block>
                                                    </value>
                                                </block>
                                            </value>
                                        </block>
                                    </next>
                                </block>
                            </statement>
                        </block>
                    </next>
                </block>
            </xml>
        `
    },
    '3-2': {
        title: 'Listas',
        content: `
            <section class="tutorial-section">
                <h3>Introdução</h3>
                <p>Neste tutorial, você aprenderá a trabalhar com listas, que são coleções ordenadas de dados.</p>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Listas são úteis quando você precisa armazenar vários valores juntos, como uma lista de nomes ou números!</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 1: Criando Listas</h3>
                <p>Na categoria "Listas" (em azul escuro), você encontrará blocos para:</p>
                <ul>
                    <li>Criar uma lista vazia</li>
                    <li>Criar uma lista com itens</li>
                    <li>Adicionar itens à lista</li>
                    <li>Obter itens da lista</li>
                </ul>
            </section>

            <section class="tutorial-section">
                <h3>Passo 2: Trabalhando com Listas</h3>
                <p>Vamos criar um programa que trabalha com uma lista de frutas:</p>
                <ol>
                    <li>Crie uma lista com algumas frutas</li>
                    <li>Mostre o primeiro item da lista</li>
                    <li>Adicione uma nova fruta</li>
                    <li>Mostre a lista completa</li>
                </ol>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Use o bloco "criar lista com" para começar e depois adicione mais itens!</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 3: Percorrendo Listas</h3>
                <p>Você pode usar um loop para mostrar cada item da lista:</p>
                <ol>
                    <li>Use o bloco "para cada item em" da categoria Loops</li>
                    <li>Selecione sua lista</li>
                    <li>Dentro do loop, mostre cada item</li>
                </ol>
                <div class="tutorial-challenge">
                    <h4>Desafio</h4>
                    <p>Crie um programa que:</p>
                    <ol>
                        <li>Crie uma lista com 5 cores</li>
                        <li>Adicione uma nova cor</li>
                        <li>Mostre cada cor em uma linha separada</li>
                        <li>No final, mostre quantas cores há na lista</li>
                    </ol>
                </div>
            </section>
        `,
        toolbox: `
            <xml id="toolbox" style="display: none">
                <category name="Listas" colour="260">
                    <block type="lists_create_with">
                        <mutation items="3"></mutation>
                    </block>
                    <block type="lists_repeat">
                        <value name="NUM">
                            <shadow type="math_number">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
                    </block>
                    <block type="lists_length"></block>
                    <block type="lists_getIndex">
                        <value name="VALUE">
                            <block type="variables_get">
                                <field name="VAR" id="lista">lista</field>
                            </block>
                        </value>
                    </block>
                    <block type="lists_setIndex">
                        <value name="LIST">
                            <block type="variables_get">
                                <field name="VAR" id="lista">lista</field>
                            </block>
                        </value>
                    </block>
                </category>
                <category name="Loops" colour="120">
                    <block type="controls_forEach">
                        <value name="LIST">
                            <block type="variables_get">
                                <field name="VAR" id="lista">lista</field>
                            </block>
                        </value>
                    </block>
                </category>
                <category name="Variáveis" custom="VARIABLE" colour="330">
                </category>
                <category name="Texto" colour="160">
                    <block type="text">
                        <field name="TEXT">maçã</field>
                    </block>
                    <block type="text_print">
                        <value name="TEXT">
                            <shadow type="text">
                                <field name="TEXT">digite seu texto aqui</field>
                            </shadow>
                        </value>
                    </block>
                </category>
            </xml>
        `,
        startingBlock: `
            <xml>
                <variables>
                    <variable id="lista">frutas</variable>
                </variables>
                <block type="variables_set" x="50" y="50">
                    <field name="VAR" id="lista">frutas</field>
                    <value name="VALUE">
                        <block type="lists_create_with">
                            <mutation items="3"></mutation>
                            <value name="ADD0">
                                <block type="text">
                                    <field name="TEXT">maçã</field>
                                </block>
                            </value>
                            <value name="ADD1">
                                <block type="text">
                                    <field name="TEXT">banana</field>
                                </block>
                            </value>
                            <value name="ADD2">
                                <block type="text">
                                    <field name="TEXT">laranja</field>
                                </block>
                            </value>
                        </block>
                    </value>
                    <next>
                        <block type="controls_forEach">
                            <field name="VAR" id="item">item</field>
                            <value name="LIST">
                                <block type="variables_get">
                                    <field name="VAR" id="lista">frutas</field>
                                </block>
                            </value>
                            <statement name="DO">
                                <block type="text_print">
                                    <value name="TEXT">
                                        <block type="variables_get">
                                            <field name="VAR" id="item">item</field>
                                        </block>
                                    </value>
                                </block>
                            </statement>
                        </block>
                    </next>
                </block>
            </xml>
        `
    },
    '3-3': {
        title: 'Funções',
        content: `
            <section class="tutorial-section">
                <h3>Introdução</h3>
                <p>Neste tutorial, você aprenderá a criar e usar funções, que são blocos de código reutilizáveis.</p>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Funções são como "receitas" que você pode usar várias vezes em seu programa!</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 1: Criando Funções</h3>
                <p>Na categoria "Funções" (em roxo), você pode:</p>
                <ol>
                    <li>Clicar em "Criar uma Função"</li>
                    <li>Dar um nome para sua função</li>
                    <li>Adicionar parâmetros (dados que a função recebe)</li>
                    <li>Adicionar blocos dentro da função</li>
                </ol>
            </section>

            <section class="tutorial-section">
                <h3>Passo 2: Função com Parâmetros</h3>
                <p>Vamos criar uma função que cumprimenta uma pessoa:</p>
                <ol>
                    <li>Crie uma função chamada "cumprimentar"</li>
                    <li>Adicione um parâmetro chamado "nome"</li>
                    <li>Dentro da função, use blocos de texto para criar uma mensagem</li>
                    <li>Use a função várias vezes com diferentes nomes</li>
                </ol>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Parâmetros permitem que sua função trabalhe com diferentes valores cada vez que é usada!</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 3: Funções com Retorno</h3>
                <p>Funções também podem retornar valores:</p>
                <ol>
                    <li>Crie uma função que recebe dois números</li>
                    <li>Faça um cálculo com esses números</li>
                    <li>Retorne o resultado</li>
                    <li>Use o resultado em outra parte do programa</li>
                </ol>
                <div class="tutorial-challenge">
                    <h4>Desafio</h4>
                    <p>Crie uma função chamada "calcularArea" que:</p>
                    <ol>
                        <li>Recebe base e altura como parâmetros</li>
                        <li>Calcula a área de um retângulo (base × altura)</li>
                        <li>Retorna o resultado</li>
                        <li>Use a função para calcular áreas de diferentes retângulos</li>
                    </ol>
                </div>
            </section>
        `,
        toolbox: `
            <xml id="toolbox" style="display: none">
                <category name="Funções" custom="PROCEDURE" colour="290">
                </category>
                <category name="Matemática" colour="230">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                    <block type="math_arithmetic">
                        <field name="OP">MULTIPLY</field>
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>
                </category>
                <category name="Texto" colour="160">
                    <block type="text">
                        <field name="TEXT">Olá, </field>
                    </block>
                    <block type="text_print">
                        <value name="TEXT">
                            <shadow type="text">
                                <field name="TEXT">digite seu texto aqui</field>
                            </shadow>
                        </value>
                    </block>
                </category>
            </xml>
        `,
        startingBlock: `
            <xml>
                <block type="procedures_defnoreturn" x="50" y="50">
                    <mutation>
                        <arg name="nome"></arg>
                    </mutation>
                    <field name="NAME">cumprimentar</field>
                    <comment pinned="false">Descreva esta função...</comment>
                    <statement name="STACK">
                        <block type="text_print">
                            <value name="TEXT">
                                <block type="text_join">
                                    <mutation items="2"></mutation>
                                    <value name="ADD0">
                                        <block type="text">
                                            <field name="TEXT">Olá, </field>
                                        </block>
                                    </value>
                                    <value name="ADD1">
                                        <block type="variables_get">
                                            <field name="VAR">nome</field>
                                        </block>
                                    </value>
                                </block>
                            </value>
                        </block>
                    </statement>
                    <next>
                        <block type="procedures_callnoreturn">
                            <mutation name="cumprimentar">
                                <arg name="nome"></arg>
                            </mutation>
                            <value name="ARG0">
                                <block type="text">
                                    <field name="TEXT">João</field>
                                </block>
                            </value>
                        </block>
                    </next>
                </block>
            </xml>
        `
    },
    '3-4': {
        title: 'Entrada de Dados',
        content: `
            <section class="tutorial-section">
                <h3>Introdução</h3>
                <p>Neste tutorial, você aprenderá a receber dados do usuário durante a execução do programa.</p>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Programas interativos são mais interessantes porque podem responder às informações fornecidas pelo usuário!</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 1: Bloco de Entrada</h3>
                <p>Na categoria "Entrada/Saída", você encontrará o bloco "perguntar":</p>
                <ol>
                    <li>Este bloco mostra uma mensagem ao usuário</li>
                    <li>Espera que o usuário digite algo</li>
                    <li>Guarda a resposta para ser usada no programa</li>
                </ol>
            </section>

            <section class="tutorial-section">
                <h3>Passo 2: Usando a Entrada</h3>
                <p>Vamos criar um programa que pergunta o nome do usuário e o cumprimenta:</p>
                <ol>
                    <li>Use o bloco "perguntar" para obter o nome</li>
                    <li>Guarde a resposta em uma variável</li>
                    <li>Use a variável para criar uma mensagem personalizada</li>
                </ol>
                <div class="tutorial-tip">
                    <span class="tip-icon">💡</span>
                    <p>Combine blocos de texto para criar mensagens mais elaboradas!</p>
                </div>
            </section>

            <section class="tutorial-section">
                <h3>Passo 3: Entrada Numérica</h3>
                <p>Você também pode receber números como entrada:</p>
                <ol>
                    <li>Use o bloco "perguntar" para pedir um número</li>
                    <li>Converta a entrada para número</li>
                    <li>Faça cálculos com o número recebido</li>
                </ol>
                <div class="tutorial-challenge">
                    <h4>Desafio</h4>
                    <p>Crie uma calculadora de idade que:</p>
                    <ol>
                        <li>Pergunta o ano de nascimento do usuário</li>
                        <li>Calcula a idade atual</li>
                        <li>Mostra quantos anos a pessoa terá em 2030</li>
                    </ol>
                </div>
            </section>
        `,
        toolbox: `
            <xml id="toolbox" style="display: none">
                <category name="Entrada/Saída" colour="160">
                    <block type="text_prompt_ext">
                        <value name="TEXT">
                            <shadow type="text">
                                <field name="TEXT">Digite seu nome:</field>
                            </shadow>
                        </value>
                    </block>
                    <block type="text_print">
                        <value name="TEXT">
                            <shadow type="text">
                                <field name="TEXT">digite seu texto aqui</field>
                            </shadow>
                        </value>
                    </block>
                </category>
                <category name="Variáveis" custom="VARIABLE" colour="330">
                </category>
                <category name="Texto" colour="160">
                    <block type="text">
                        <field name="TEXT">Olá, </field>
                    </block>
                    <block type="text_join">
                        <mutation items="2"></mutation>
                    </block>
                </category>
                <category name="Matemática" colour="230">
                    <block type="math_number">
                        <field name="NUM">2024</field>
                    </block>
                    <block type="math_arithmetic">
                        <field name="OP">MINUS</field>
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>
                </category>
            </xml>
        `,
        startingBlock: `
            <xml>
                <variables>
                    <variable id="nome">nome</variable>
                </variables>
                <block type="variables_set" x="50" y="50">
                    <field name="VAR" id="nome">nome</field>
                    <value name="VALUE">
                        <block type="text_prompt_ext">
                            <value name="TEXT">
                                <shadow type="text">
                                    <field name="TEXT">Digite seu nome:</field>
                                </shadow>
                            </value>
                        </block>
                    </value>
                    <next>
                        <block type="text_print">
                            <value name="TEXT">
                                <block type="text_join">
                                    <mutation items="2"></mutation>
                                    <value name="ADD0">
                                        <block type="text">
                                            <field name="TEXT">Olá, </field>
                                        </block>
                                    </value>
                                    <value name="ADD1">
                                        <block type="variables_get">
                                            <field name="VAR" id="nome">nome</field>
                                        </block>
                                    </value>
                                </block>
                            </value>
                        </block>
                    </next>
                </block>
            </xml>
        `
    },
    // Adicione outros tutoriais aqui
};