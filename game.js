document.getElementById('chutar').addEventListener('click', verificarChute);

function verificarChute() {
    const chute = document.getElementById('chute');
    const dica = document.getElementById('dica');

    if(!isNaN(chute.value) && chute.value >= 0 && chute.value <= 100){
        contador++;
        const chuteUsuario = parseInt(chute.value);
        const diferenca = Math.abs(chuteUsuario - numeroAleatorio);
        if (diferenca === 0) {
            dica.textContent = "Você acertou!";
        } else if (diferenca <= 10) {
            dica.textContent = "Você está quente!";
        } else {
            dica.textContent = "Você está frio!";
        }
    } else {
        dica.textContent = "Por favor, insira um número válido de 0 a 100.";
    }
}
