function atualizarIndicador(chuteUsuario) {
    const barra = document.querySelector('.barra-frio-quente');
    const indicador = document.querySelector('.indicador');


    const larguraBarra = barra.clientWidth;
    const intervalo = 100;
    let proximidade  = Math.abs(chuteUsuario - num_random);
    let posicaoIndicador = larguraBarra - ((larguraBarra / intervalo) * proximidade);
    posicaoIndicador = Math.min(posicaoIndicador, larguraBarra - indicador.clientWidth);
    
    const divisoes = 20; // Dividir a barra em 20 partes
    const larguraDivisao = larguraBarra / divisoes;
    const posicaoCentro = Math.round(posicaoIndicador / larguraDivisao) * larguraDivisao;

    indicador.style.left = Math.max(0, Math.min(posicaoCentro, larguraBarra - indicador.clientWidth)) + 'px';

    if (proximidade === 0) {
        indicador.textContent = '😁'; // Emoji de acerto
        indicador.className = 'indicador acerto';
  
    } else if (proximidade <= 5) {
        indicador.textContent = '🔥'; // Emoji de quente
        indicador.className = 'indicador quente';
    } else {
        indicador.textContent = '😨'; // Emoji de frio
        indicador.className = 'indicador frio';
    }
}

let tentativas = 0;
document.getElementById('chutar').addEventListener('click', verificarChute);
document.getElementById('chute').addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        verificarChute();
        chute.value = '';
    }
});

let telaParabens = document.createElement('div');
let buttonParabens = document.createElement('button');
let msgParabens = document.createElement('p');

function verificarChute() {
    const chute = document.getElementById('chute');
    const dica = document.getElementById('dica').querySelector('p');

    if (!isNaN(chute.value) && chute.value >= 0 && chute.value <= 100) {
        const chuteUsuario = parseInt(chute.value);
        ++tentativas;
        if (chuteUsuario === num_random) {
            dica.textContent = "Você acertou!";
            armazenardados();

            buttonParabens.textContent = 'Sair';
            msgParabens.textContent = "Parabéns";

            main_screen.appendChild(telaParabens);
            telaParabens.classList.add('tela-parabens');
            telaParabens.appendChild(msgParabens);
            telaParabens.appendChild(buttonParabens);
            buttonParabens.addEventListener('click', sairTela);
            return(true);

        } else if (Math.abs(chuteUsuario - num_random) <= 10) {
            dica.textContent = "Você está quente!";
            
        } else {
            dica.textContent = "Você está frio!";
            
        }

        atualizarIndicador(chuteUsuario);
    } else {
        dica.textContent = "Por favor, insira um número válido de 0 a 100.";
        return null;
    }
}

let nomeJogador = '';

document.getElementById('button-nickname').addEventListener('click', () => {
    nomeJogador = document.getElementById('nickname').value;
    document.getElementById('nickname-register').classList.add('hide');
});

//function para armazenar os dados no cookie
function armazenardados(){
    const data = new Date().toLocaleDateString('pt-BR');
    const scores = JSON.parse(getCookie('gameScores') || '[]');

    console.log('Scores existentes:', scores);

    const novoScore = {
        nome: nomeJogador,
        data: data,
        tentativas: tentativas
    };

    scores.push(novoScore);
    saveScore(scores);
    atualizarTabela(scores);
    tentativas = 0;
};

//function para a configuração de duração de tempo do cookie 
function setCookie(name, value){
        const date = new Date();
        date.setFullYear(date.getFullYear() + 40);
        const expires = "; expires =" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

//function para deletar jogador
function eraseCookie(name){
    document.cookie = name + '=; Max-Age=-99999999;';
};

//function para salvar jogador
function saveScore(scores){
    setCookie('gameScores', JSON.stringify(scores));
};
// Function para obter cookie
function getCookie(name) {
    const cookies = Object.fromEntries(
        document.cookie.split("; ").map(cookie => cookie.split("="))
    );
    return cookies[name];
}

// Function para atualizar a tabela com os dados armazenados
function atualizarTabela(scores) {
    const tabela = document.getElementById('tabela-dados');
    tabela.innerHTML = ''; 
// ordenação de scores
        scores.sort((a, b) => a.tentativas - b.tentativas);
        const topScores = scores.slice(0, 5);
        
    topScores.forEach((score, index) => {
        const row = tabela.insertRow(index);
        const cellNome = row.insertCell(0);
        const cellTentativas = row.insertCell(1);
        const cellData = row.insertCell(2);

        cellNome.textContent = score.nome;
        cellTentativas.textContent = score.tentativas;
        cellData.textContent = score.data;
    });
}
// Atualiza a tabela ao carregar a página com dados existentes
function atualizartabelav2(){
    const cookieValue = getCookie('gameScores');
    console.log('oi');  
    console.log('Cookie Value:', cookieValue);
    const scores = JSON.parse(getCookie('gameScores') || '[]');
    console.log('Scores:', scores); // Adicione este log para verificar os scores
    atualizarTabela(scores);
}