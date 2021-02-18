// Variáveis dos Personagens
let yPersonagens = [0,0,0,0,0,0];
let xPersonagens = [45, 120, 190, 260, 330, 400]
let velocidadePersonagens = [1.5, 2.5, 3.2, 5, 3.3, 2.3]
let comprimentoPersonagens = 35;
let alturaPersonagens = 35;


// Função que mostra os personagens 
function mostraPersonagens() {
  for(let i = 0; i < imagemPersonagens.length; i++ ) {
    image(imagemPersonagens[i], xPersonagens[i], yPersonagens[i], comprimentoPersonagens, alturaPersonagens);
  }
}

// Função que faz com que os Personagens se movimentem
 function movimentaPersonagens () {
  for(let i = 0; i < imagemPersonagens.length;i++) {
     yPersonagens[i] += velocidadePersonagens[i];
   }
 }

// Funções para que quando os personagens chegarem ao final da área de plantio eles retornem para a posição inicial
function voltaPosicaoInicial () {
    for(let i= 0; i< imagemPersonagens.length; i++) {
      if(passouTodaTela(yPersonagens[i])) {
        yPersonagens[i] = 0;
      }
    }
}

function passouTodaTela (yPersonagens) {
  return yPersonagens > 650;
}
