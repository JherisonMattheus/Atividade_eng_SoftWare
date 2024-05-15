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

play.addEventListener('click', ()=>{

    game.classList.remove('hide');
    
    historico.classList.add('hide');
    historico.classList.remove('button-show');

    play.classList.remove('button-show');
    play.classList.add('hide');

    register.classList.remove('hide');
    register.classList.remove('dimension-zero');
    register.classList.add('dimension-full');

    sair.style.bottom = '50px';
});

comecar.addEventListener('click', ()=>{
    main_screen.classList.add('main-screen-alt-2');
    setTimeout(function(){
        main_screen.querySelector('h1').style.zIndex = '3';
    }, 2800);

    register.classList.add('hide');
    register.classList.add('dimension-zero');
    register.classList.remove('dimension-full');

    tela_jogo.classList.remove('dimension-zero');
    tela_jogo.classList.add('dimension-full');

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
            // main_screen.querySelector('h1').style.opacity = '0';
            setTimeout(function(){
                main_screen.querySelector('h1').style.zIndex = '1';
            }, 2100);

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