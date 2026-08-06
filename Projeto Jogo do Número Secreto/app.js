//let titulo = document.querySelector('h1'); //Cria a variável titulo e fala que essa variável representa o h1 (Título no HTML) usando esse comando document.querySelector('(nome do que voce quer pegar)')
//titulo.innerHTML = 'Jogo do número secreto'; // Atribui a variável (título) dentro do HTML (innerHTML) com o texto.

//let paragrafo = document.querySelector('p')
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10'
 
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto){ // Cria a função exibirTextoNaTela, e juntamente com essa função ele cria de imediato dois parâmetros (tag e texto), em seguida, cria uma variável dentro da função chamada "campo". Ele então seleciona no HTML usando o parâmetro "campo" quem ele vai pedir na tag. Em seguida, vai fazer com que a variável que vier em seguida (no caso representando "texto"), Seja colocado o texto que estará escrito no código.
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto.');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

exibirTextoNaTela('h1', 'Jogo do número secreto.');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas.' : 'tentativa.';
        let mensagemTentativas = `Você descobriu o Número Secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
            tentativas++;
            limparCampo();
    } else {
        exibirTextoNaTela ('p', 'O número secreto é maior.');
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); //return serve para armazenar o valor calculado dentro da função para a variável que tem o nome da função (retorna para a variável). (função numeroSecreto)
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}

exibirMensagemInicial();