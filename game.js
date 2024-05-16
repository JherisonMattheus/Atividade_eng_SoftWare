const dica = document.getElementById('dica');
const chute = document.getElementById('chute');
const chutar = document.getElementById('chutar');
const comecar = document.getElementById('button-nickname');
let contador = 0;   

chutar.addEventListener('click', ()=>{
    if(!isNaN(chute.value) && chute.value >= 0 && chute.value <= 100){
        console.log(contador);
        contador++;
    }else {

    }
});
