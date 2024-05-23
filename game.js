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


function verificarChute() {
    const chute = document.getElementById('chute');
    const dica = document.getElementById('dica').querySelector('p');

    ++tentativas;
    if (!isNaN(chute.value) && chute.value >= 0 && chute.value <= 100) {
        const chuteUsuario = parseInt(chute.value);
        if (chuteUsuario === num_random) {
            dica.textContent = "Você acertou!";
            armazenardados();
    
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
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Function para atualizar a tabela com os dados armazenados
function atualizarTabela(scores) {
    const tabela = document.getElementById('tabela-dados');
    tabela.innerHTML = ''; 

    scores.forEach((score, index) => {
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
window.addEventListener('DOMContentLoaded', () => {
    const cookieValue = getCookie('gameScores');
    console.log('oi');  
    console.log('Cookie Value:', cookieValue);
    const scores = JSON.parse(getCookie('gameScores') || '[]');
    console.log('Scores:', scores); // Adicione este log para verificar os scores
    atualizarTabela(scores);
});

