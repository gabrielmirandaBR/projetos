// Códigos do Ator

yAtor = 366;
xAtor = 100;
let colisao = false;
let meusPontos = 0;

function mostraAtor() {
  image(imagemAtor, xAtor, yAtor, 30, 30);
}

function movimentaAtor() {
  if(keyIsDown(UP_ARROW)) {
    yAtor -= 3;
  }
  if(keyIsDown(DOWN_ARROW)) {
    if(podeSeMover()) {
    yAtor += 3;
    }
  }
}

function verificaColisao() {
  for(let i = 0; i < imagemCarros.length; i++) {
  colisao = collideRectCircle(xCarros[i], yCarros[i], comprimentoCarro, alturaCarro, xAtor, yAtor, 15)
    if(colisao) {
      somColidiu.play();
      voltaPosicaoInicial();
      if(pontosMaiorQueZero()) {
        meusPontos -= 1;
      }
    }
  }
}
  
function voltaPosicaoInicial() {
  yAtor = 366;
}

function mostraPontos() {
  textAlign(CENTER);
  text(meusPontos, width/5, 27);
  textStyle(BOLD);
  textSize(25);
  fill(color(255, 300, 60));
}

function marcaPontos() {
  if(yAtor < 15) {
    meusPontos += 1;
    somPonto.play();
    voltaPosicaoInicial();
  }
}

function pontosMaiorQueZero () {
  return meusPontos > 0;
}

function podeSeMover () {
  return yAtor < 366;
}