const historico = document.getElementById('historico');
const play = document.getElementById('play');
const sair = document.getElementById('sair');

const main_screen = document.getElementById('main-screen');
const sec_historico = document.getElementById('sec-historico');


historico.addEventListener('click', ()=>{

    play.style.display = 'none';
    sec_historico.classList.remove('hide');
    main_screen.style.width = '600px';
    main_screen.style.height = '700px';
    sec_historico.style.width = '550px';
    sec_historico.style.height = '300px';
    sec_historico.style.padding = '10px';
    sair.style.bottom = '50px';
});

play.addEventListener('click', ()=>{

});

sair.addEventListener('click', ()=>{

    if(!sec_historico.classList.contains('hide')) {
        sec_historico.style.width = '0';
        sec_historico.style.height = '0';
        sec_historico.style.padding = '0';
        sec_historico.classList.add('hide');
        main_screen.style.width = '400px';
        main_screen.style.height = '500px';
        play.style.display = 'block';
        sair.style.bottom = '105px';

    }else {
        window.location.href = "about:blank";
    }
    
    
});