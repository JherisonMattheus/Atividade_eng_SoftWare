export function atualizarIndicador(chuteUsuario) {
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

export function verificarChute() {
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
        return null;
    }
}

