// Variáveis do Trator
let xAtor = 45;
let yAtor = 550;
let colisao = false;
let meusPontos = 0;


// Função para mostrar o trator como um círculo
function mostraTrator () {
  image(imagemDoTrator, xAtor, yAtor, 50, 150);
}


// Função para comandar o Trator
function movimentaTrator() {
  
  if(keyIsDown(LEFT_ARROW)) {
    if(limiteEsquerda()) {
      xAtor -= 3; 
    }
  }
  
  if(keyIsDown(RIGHT_ARROW)) {
    if(limiteDireita()) {
      xAtor +=3; 
    }
  }
} 


// Funções que Limita até onde o trator pode ir
function limiteDireita() {
    return xAtor < 400; 
}

function limiteEsquerda() {
  return xAtor > 45;
}

function fimDoJogo () {
  if(meusPontos > 1) {
    
  }  

}


// Função que identifica a Colisão por meio da biblioteca p5.collide2d
function verificaColisao() {
  for(let i = 0; i <  imagemPersonagens.length; i++) {
    colisao = collideRectCircle(xAtor, yAtor, comprimentoPersonagens, alturaPersonagens, xPersonagens[i], yPersonagens[i], 15);
    if(colisao == true) {
      yPersonagens[i] = 0;
      meusPontos +=1;
      somPonto.play()
      if(meusPontos > 10) {
       pontoMaiorQueDez ();
      }
    }
  }
}

// Funções para desenhar/mostrar o placar e os pontos
function placarFundo () {
  fill(color(255, 255, 255));
  rect(226, 1, 50, 28, 10, 10,10, 10);
}

function mostraPontos() {
  fill(color(255, 300, 60));
  textAlign(CENTER);
  text(meusPontos, width/2, 25);
  textStyle(BOLD);
  textSize(30);
  fill(color(255, 300, 60));
}


// Função Para Parar o Jogo
function pontoMaiorQueDez () {
  text("Parabéns! Tivemos uma ótima colheita.", 170, 60, 170, 200);
  fill(color(255, 255, 255));
  somTema.stop();
return pontoMaiorQueDez ();
}