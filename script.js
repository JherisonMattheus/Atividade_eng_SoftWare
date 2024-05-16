const historico = document.getElementById('historico');
const play = document.getElementById('play');
const comecar = document.getElementById('button-nickname');
const sair = document.getElementById('sair');

const main_screen = document.getElementById('main-screen');
const sec_historico = document.getElementById('sec-historico');
const title = document.getElementById('title');
const game = document.getElementById('game');
const register = document.getElementById('nickname-register');
const tela_jogo = document.getElementById('tela-jogo');

const nickname = document.getElementById('nickname');


let num_random;


historico.addEventListener('click', ()=>{
    if(sec_historico.classList.contains('hide')){
        main_screen.classList.add('main-screen-alt');

        historico.style.pointerEvents = 'none';
        sec_historico.classList.remove('hide');
        sec_historico.classList.add('sec-historico-on');
        title.style.opacity = '1';

        play.classList.remove('button-show');
        play.classList.add('button-hide');

        sair.style.bottom = '50px';
    }
});
function resetarIndicador() {
    const indicador = document.querySelector('.indicador');
    const barra = document.querySelector('.barra-frio-quente');
    const larguraBarra = barra.clientWidth;

    indicador.style.left = larguraBarra - indicador.clientWidth + 'px';
   
    indicador.textContent = '😐'; 
    indicador.className = 'indicador'; 
}
play.addEventListener('click', ()=>{
    nickname.value ='';
    document.getElementById('chute').value = '';
    game.classList.remove('hide');
    document.getElementById('dica').querySelector('p').textContent = '';
    
    historico.classList.add('hide');
    historico.classList.remove('button-show');

    play.classList.remove('button-show');
    play.classList.add('hide');

    register.classList.remove('hide');
    register.classList.remove('dimension-zero');
    register.classList.add('dimension-full');

    sair.style.bottom = '50px';
    resetarIndicador();
});

comecar.addEventListener('click', ()=>{
    if(nickname.value === ''){
        console.log('Digite um nome');
    }else {
    num_random = Math.floor(Math.random() * 101);
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

});

sair.addEventListener('click', ()=>{

    if(!sec_historico.classList.contains('hide')) {
        main_screen.classList.remove('main-screen-alt');

        historico.style.pointerEvents = 'initial';
        sec_historico.classList.remove('sec-historico-on');
        sec_historico.classList.add('hide');
        title.style.opacity = '0';

        play.classList.remove('button-hide');
        play.classList.add('button-show');

        sair.style.bottom = '105px';   

    }else if(!game.classList.contains('hide')){

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
        }
        game.classList.add('hide');

        historico.classList.remove('hide');
        historico.classList.add('button-show');

        play.classList.remove('hide');
        play.classList.add('button-show');

        register.classList.remove('dimension-full');
        register.classList.add('dimension-zero');

        sair.style.bottom = '105px';
    }else {
        window.location.href = "about:blank";
    }
        
});
function atualizarIndicador(chuteUsuario) {
    const barra = document.querySelector('.barra-frio-quente');
    const indicador = document.querySelector('.indicador');

    const larguraBarra = barra.clientWidth;
    const intervalo = 100;
    const proximidade  = Math.abs(chuteUsuario - num_random);
    let posicaoIndicador = larguraBarra - ((larguraBarra / intervalo) * proximidade);
    posicaoIndicador = Math.min(posicaoIndicador, larguraBarra - indicador.clientWidth);

    indicador.style.left = posicaoIndicador + 'px';
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
document.getElementById('chutar').addEventListener('click', verificarChute);

function verificarChute() {
    const chute = document.getElementById('chute');
    const dica = document.getElementById('dica').querySelector('p');

    if (!isNaN(chute.value) && chute.value >= 0 && chute.value <= 100) {
        const chuteUsuario = parseInt(chute.value);

        if (chuteUsuario === num_random) {
            dica.textContent = "Você acertou!";
        } else if (Math.abs(chuteUsuario - num_random) <= 10) {
            dica.textContent = "Você está quente!";
        } else {
            dica.textContent = "Você está frio!";
        }

        atualizarIndicador(chuteUsuario);
    } else {
        dica.textContent = "Por favor, insira um número válido de 0 a 100.";
    }
}
