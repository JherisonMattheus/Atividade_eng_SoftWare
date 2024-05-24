//importando dados do arquivo index.html
const historico = document.getElementById('historico');
const play = document.getElementById('play');
const comecar = document.getElementById('button-nickname');
const sair = document.getElementById('sair');
const main_screen = document.getElementById('main-screen');
const sec_historico = document.getElementById('sec-historico');
const table = document.getElementById('table');
const game = document.getElementById('game');
const register = document.getElementById('nickname-register');
const tela_jogo = document.getElementById('tela-jogo');
const nickname = document.getElementById('nickname');
//importando functions do arquivo gam   e.js
// import('./game.js');
//variavel que vai armazenar o numero aleatorio do jogo

let num_random;

//rota é regras do evento historico
historico.addEventListener('click', ()=>{
    if(sec_historico.classList.contains('hide')){
        main_screen.classList.add('main-screen-alt');

        historico.style.pointerEvents = 'none';
        sec_historico.classList.remove('hide');
        sec_historico.classList.add('sec-historico-on');

        table.classList.remove('hide');
        table.classList.add('table-delay');

        play.classList.remove('button-show');
        play.classList.add('button-hide');

        sair.style.bottom = '50px';
    }
});

//função para resetar o indicador da barra de muito alto ou baixo o numero chutado
function resetarIndicador() {
    const indicador = document.querySelector('.indicador');
    const barra = document.querySelector('.barra-frio-quente');
    const larguraBarra = barra.clientWidth;

    indicador.style.left = larguraBarra - indicador.clientWidth + 'px';
   
    indicador.textContent = '😐'; 
    indicador.className = 'indicador'; 
}

//rota e regras do evento play
play.addEventListener('click', ()=>{
    nickname.value ='';
    document.getElementById('chute').value = '';
    game.classList.remove('hide');
    document.getElementById('dica').querySelector('p').textContent = '';
    
    historico.classList.add('hide');
    historico.classList.remove('button-show');
    //retira o botão
    play.classList.remove('button-show');
    play.classList.add('hide');

    register.classList.remove('hide');
    register.classList.remove('dimension-zero');
    register.classList.add('dimension-full');

    sair.style.bottom = '50px';
    resetarIndicador();
});

//rota e regras do evento começar
comecar.addEventListener('click', ()=>{
    //condição para validar se foi colocado um nome na tela de nomes // Reinicia o contador de tentativas
    if(nickname.value === ''){
        console.log('Digite um nome');
    }else{//caso sim, inicia o jogo

        //cria um numero aleatorio
        num_random = Math.floor(Math.random() * 101);
        //necessita desse console log?
        console.log('Número aleatório:', num_random)
        main_screen.classList.add('main-screen-alt-2');
        setTimeout(function(){
            main_screen.querySelector('h1').style.zIndex = '3';
    }, 2800);

    register.classList.add('hide');
    register.classList.add('dimension-zero');
    register.classList.remove('dimension-full');
    
    tela_jogo.style.display = 'flex';
    setTimeout(function(){
    tela_jogo.classList.remove('hide');
    }, 2000);
    tela_jogo.classList.remove('dimension-zero');
    tela_jogo.classList.add('dimension-full');
    }
    // armazenardados();
});

sair.addEventListener('click', sairTela);

function sairTela(){
    
    if(!sec_historico.classList.contains('hide')) {
        main_screen.classList.remove('main-screen-alt');

        historico.style.pointerEvents = 'initial';
        sec_historico.classList.remove('sec-historico-on');
        sec_historico.classList.add('hide');

        table.classList.remove('table-delay');
        table.classList.add('hide');

        play.classList.remove('button-hide');
        play.classList.add('button-show');

        sair.style.bottom = '105px';   

    }
    
    else if(!game.classList.contains('hide')){

        if(!tela_jogo.classList.contains('hide')){
            main_screen.classList.remove('main-screen-alt-2');
            setTimeout(function(){
                main_screen.querySelector('h1').style.zIndex = '1';
            }, 2500);

            tela_jogo.classList.add('hide');
            setTimeout(function(){
                tela_jogo.style.display = 'none';
            }, 2000);
            tela_jogo.classList.remove('dimension-full');
            tela_jogo.classList.add('dimension-zero');
            if(telaParabens.classList.contains('tela-parabens')){
                setTimeout(function(){
                    main_screen.removeChild(telaParabens);
                }, 2000);
            }

        }
        game.classList.add('hide');

        historico.classList.remove('hide');
        historico.classList.add('button-show');

        play.classList.remove('hide');
        play.classList.add('button-show');

        register.classList.remove('dimension-full');
        register.classList.add('dimension-zero');

        sair.style.bottom = '105px';
    }
    
    else {
        window.location.href = "about:blank";
    }
}


//game.js


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
