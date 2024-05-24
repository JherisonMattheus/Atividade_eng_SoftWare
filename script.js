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
    const chute = document.getElementById('chute');
    // //importando functions do arquivo gam   e.js
    // import('./game.js');
    //variavel que vai armazenar o numero aleatorio do jogo

    let num_random;

    //rota é regras do evento historico
    historico.addEventListener('click', ()=>{
        if(sec_historico.classList.contains('hide')){
            main_screen.classList.add('main-screen-alt');
            atualizartabelav2();
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
            
            nickname.placeholder = "Digite um Nickname";

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



