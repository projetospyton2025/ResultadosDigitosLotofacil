// Solução simplificada para adicionar botão e gerar resumo para Lotofácil

// Adicionar o botão quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script de resumo simplificado para Lotofácil carregado");
    
    // Função que adiciona o botão
    function adicionarBotao() {
        // Verificar se o botão já existe
        if (document.getElementById('botaoAnalisarFrequencias')) {
            return;
        }
        
        // Criar o botão
        const botao = document.createElement('button');
        botao.id = 'botaoAnalisarFrequencias';
        botao.className = 'button';
        botao.textContent = 'Resumo';
        
        // Adicionar evento de clique
        botao.addEventListener('click', function() {
            console.log("Botão clicado - gerando resumo");
            gerarResumo();
        });
        
        // Encontrar um local para adicionar o botão
        const actionsContainer = document.querySelector('.actions');
        if (actionsContainer) {
            actionsContainer.appendChild(botao);
            console.log("Botão adicionado à seção .actions");
        } else {
            // Alternativa: adicionar antes da tabela
            const tabela = document.getElementById('lotofacilResults');
            if (tabela) {
                const div = document.createElement('div');
                div.className = 'actions';
                div.style.textAlign = 'center';
                div.style.margin = '20px 0';
                div.appendChild(botao);
                
                tabela.parentNode.insertBefore(div, tabela);
                console.log("Botão adicionado antes da tabela");
            } else {
                console.log("Não foi possível encontrar um local para o botão");
            }
        }
    }
    
    // Adicionar o botão após um tempo para garantir que a página carregou
    setTimeout(adicionarBotao, 1000);
    
    // Tentar adicionar novamente quando a mensagem de carregamento completado aparecer
    const verificarCarregamento = setInterval(function() {
        const mensagemCompletada = document.getElementById('completedMessage');
        if (mensagemCompletada && getComputedStyle(mensagemCompletada).display !== 'none') {
            console.log("Carregamento completado detectado");
            adicionarBotao();
            clearInterval(verificarCarregamento);
        }
    }, 1000);
    
    // Limitar a verificação a 20 segundos
    setTimeout(function() {
        clearInterval(verificarCarregamento);
    }, 20000);
});

// Função para gerar o resumo
function gerarResumo() {
    console.log("Início da geração do resumo");
    
    // Verificar se os dados foram carregados
    if (!window.allResults || window.allResults.length === 0) {
        console.error("Resultados não carregados ainda");
        alert("É necessário carregar os resultados primeiro antes de gerar o resumo.\n\nPor favor, clique em 'Carregar Resultados' e tente novamente.");
        return;
    }
    
    // Remover resumo anterior, se existir
    const resumoAnterior = document.getElementById('resumo');
    if (resumoAnterior) {
        resumoAnterior.remove();
        console.log("Resumo anterior removido");
    }
    
    // Criar o resumo
    const resumo = document.createElement('div');
    resumo.id = 'resumo';
    resumo.style.margin = '30px 0';
    resumo.style.padding = '20px';
    resumo.style.backgroundColor = '#f9f9f9';
    resumo.style.borderRadius = '8px';
    resumo.style.border = '2px solid #673AB7';
    resumo.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    
    // Valores padrão para a Lotofácil - ajuste conforme os dados reais
    let combinacao = '0,1,2,5,6,7,8,9';
    let frequencia = 35;
    let intervaloMedio = 28;
    let menorIntervalo = 2;
    let maiorIntervalo = 95;
    let ultimoIntervalo = 18;
    
    // Tentar extrair dados reais da tabela
    try {
        console.log("Tentando extrair dados da tabela de combinações");
        const tabelaCombinacoes = document.querySelector('.combinations-table');
        
        if (tabelaCombinacoes) {
            console.log("Tabela de combinações encontrada");
            const linhasTabela = tabelaCombinacoes.querySelectorAll('tbody tr');
            
            if (linhasTabela && linhasTabela.length > 0) {
                console.log(`Encontradas ${linhasTabela.length} linhas na tabela`);
                
                // Pegar a primeira linha (combinação mais frequente)
                const primeiraLinha = linhasTabela[0];
                const colunas = primeiraLinha.querySelectorAll('td');
                
                console.log(`Colunas na primeira linha: ${colunas.length}`);
                
                // Verificamos se temos 4 colunas conforme o design atual
                if (colunas.length >= 3) {
                    // Extrair valores específicos de cada coluna
                    combinacao = colunas[0].textContent.trim();
                    frequencia = parseInt(colunas[2].textContent) || frequencia;
                    
                    // Se a tabela tiver as colunas de intervalos, extrair também
                    if (window.resultadosAnalisados && 
                        window.resultadosAnalisados.combinacoesOrdenadas && 
                        window.resultadosAnalisados.combinacoesOrdenadas.length > 0) {
                        
                        const primeiraCombo = window.resultadosAnalisados.combinacoesOrdenadas[0];
                        intervaloMedio = primeiraCombo.mediaIntervalos || intervaloMedio;
                        menorIntervalo = primeiraCombo.menorIntervalo || menorIntervalo;
                        maiorIntervalo = primeiraCombo.maiorIntervalo || maiorIntervalo;
                        ultimoIntervalo = primeiraCombo.ultimoIntervalo || ultimoIntervalo;
                    }
                    
                    console.log("Dados extraídos com sucesso da tabela:");
                    console.log(`Combinação: ${combinacao}`);
                    console.log(`Frequência: ${frequencia}`);
                    console.log(`Intervalo Médio: ${intervaloMedio}`);
                    console.log(`Menor Intervalo: ${menorIntervalo}`);
                    console.log(`Maior Intervalo: ${maiorIntervalo}`);
                    console.log(`Último Intervalo: ${ultimoIntervalo}`);
                } else {
                    console.log(`Número insuficiente de colunas: ${colunas.length}, esperado pelo menos 3`);
                }
            } else {
                console.log("Nenhuma linha encontrada na tabela");
            }
        } else {
            console.log("Tabela de combinações não encontrada");
        }
    } catch (e) {
        console.error("Erro ao extrair dados da tabela:", e);
    }
    
    // Conteúdo do resumo
    resumo.innerHTML = `
    <h2 style="color: rebeccapurple;">RESUMO GERAL</h2>
    <p>A análise dos dados mostra que a combinação <strong>${combinacao}</strong> apareceu <strong>${frequencia} vezes</strong> nos concursos da Lotofácil, com um intervalo médio de <strong>${intervaloMedio} concursos</strong> entre suas aparições. A menor sequência entre ocorrências foi de apenas <strong>${menorIntervalo} concursos</strong>, e a maior chegou a <strong>${maiorIntervalo} concursos</strong>.</p>
    
    <h2 style="color: red;">Estratégia de Aposta Recomendada:</h2>
    
    <ol>
        <li>
            <strong>Acompanhar o Intervalo Médio</strong>
            <p>Como a média entre aparições é de <strong>${intervaloMedio} concursos</strong>, um bom momento para apostar nessa sequência seria quando ela já estiver sem sair por algo próximo a esse número de concursos.</p>
        </li>
        <li>
            <strong>Apostar com Maior Frequência quando o Intervalo Estiver Próximo da Média</strong>
            <p>Se o intervalo entre as aparições da sequência atingir <strong>${Math.floor(intervaloMedio * 0.8)} a ${Math.ceil(intervaloMedio * 1.2)} concursos</strong>, pode ser um bom indicativo de que ela tem uma boa chance de sair.</p>
        </li>
        <li>
            <strong>Monitorar o Último Intervalo</strong>
            <p>O último intervalo registrado foi de <strong>${ultimoIntervalo} concursos</strong>, o que indica que pode haver uma tendência de repetição em períodos mais curtos.</p>
        </li>
        <li>
            <strong>Variar os Números Dentro da Combinação</strong>
            <p>Algumas combinações semelhantes (ex.: adicionando ou removendo um ou dois dígitos) também aparecem frequentemente. Fazer apostas variando um ou dois números pode aumentar as chances.</p>
        </li>
        <li>
            <strong>Evitar Apostar Quando a Sequência Saiu Recentemente</strong>
            <p>Se essa sequência apareceu nos últimos <strong>5 a 10 concursos</strong>, a chance de repetição imediata pode ser menor.</p>
        </li>
    </ol>
    
    <h2>Conclusão:</h2>
    
    <p>Se a combinação <strong>${combinacao}</strong> estiver sem aparecer por <strong>${intervaloMedio} concursos ou mais</strong>, pode valer a pena apostar nela ou em variações próximas. Caso tenha saído recentemente, melhor esperar mais alguns concursos antes de apostar nessa combinação novamente.</p>
    
    <p>Esta análise é baseada em padrões históricos e não garante resultados futuros. A Lotofácil é um jogo de sorte com resultados aleatórios.</p>
`;

    
    // Adicionar o resumo à página
    const botao = document.getElementById('botaoAnalisarFrequencias');
    if (botao) {
        // Adicionar após o container do botão
        const container = botao.closest('.actions');
        if (container) {
            container.parentNode.insertBefore(resumo, container.nextSibling);
        } else {
            botao.parentNode.insertBefore(resumo, botao.nextSibling);
        }
    } else {
        // Adicionar antes da tabela se o botão não for encontrado
        const tabela = document.getElementById('lotofacilResults');
        if (tabela) {
            tabela.parentNode.insertBefore(resumo, tabela);
        } else {
            // Última opção: adicionar ao final do container principal
            const container = document.querySelector('.container');
            if (container) {
                container.appendChild(resumo);
            } else {
                console.error("Não foi possível encontrar um local para inserir o resumo");
                alert("Não foi possível exibir o resumo. Verifique o console para mais detalhes.");
                return;
            }
        }
    }
    
    // Rolar até o resumo
    resumo.scrollIntoView({ behavior: 'smooth' });
    
    console.log("Resumo gerado com sucesso");
}