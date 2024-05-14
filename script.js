const historico = document.getElementById('historico');
const play = document.getElementById('play');
const sair = document.getElementById('sair');

const main_screen = document.getElementById('main-screen');
const sec_historico = document.getElementById('sec-historico');
const title = document.getElementById('title');
const game = document.getElementById('game');


historico.addEventListener('click', ()=>{
    if(sec_historico.classList.contains('hide')){
        play.classList.remove('button-show');
        play.classList.add('button-hide');
        sec_historico.classList.remove('hide');
        main_screen.style.width = '600px';
        main_screen.style.height = '700px';
        sec_historico.style.width = '550px';
        sec_historico.style.height = '300px';
        sec_historico.style.padding = '10px';
        sec_historico.style.marginTop = '100px';
        title.style.opacity = '1';
        // sec_historico.style.marginTop = '100px';
        sair.style.bottom = '50px';
        historico.style.pointerEvents = 'none';
    }
});

play.addEventListener('click', ()=>{
    game.classList.remove('hide');
});

sair.addEventListener('click', ()=>{

    if(!sec_historico.classList.contains('hide')) {
        sec_historico.style.width = '300px';
        sec_historico.style.height = '0';
        sec_historico.style.padding = '0';
        sec_historico.classList.add('hide');
        title.style.opacity = '0';
        main_screen.style.width = '400px';
        main_screen.style.height = '500px';
        play.classList.remove('button-hide');
        play.classList.add('button-show');
        sair.style.bottom = '105px';
        historico.style.pointerEvents = 'initial';

    }else if(!game.classList.contains('hide')){
        game.classList.add('hide');
        game.style.marginTop = '90px';
    }else {
        window.location.href = "about:blank";
    }
        
});