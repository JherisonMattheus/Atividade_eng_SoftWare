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
  
    } else if (proximidade <= 10) {
        indicador.textContent = '🔥'; // Emoji de quente
        indicador.className = 'indicador quente';
    } else {
        indicador.textContent = '😨'; // Emoji de frio
        indicador.className = 'indicador frio';
    }
}

let tentativas = 0;
document.getElementById('chutar').addEventListener('click', verificarChute);


//


function verificarChute() {
    const chute = document.getElementById('chute');
    const dica = document.getElementById('dica').querySelector('p');

    if (!isNaN(chute.value) && chute.value >= 0 && chute.value <= 100) {
        const chuteUsuario = parseInt(chute.value);
        tentativas++;  
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

//a partir dessa linha, serão criados as functions para armazenar os dados no cookie
function armazenardados(){

};

//function para a configuração de duração de tempo do cookie 
function setCookie(name, value){
        const date = new Date();
        date.setFullYear(date.getFullYear() + 40);
        const expires = "; expires =" + date.getUTCString();
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


