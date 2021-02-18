// Variáveis da Bolinha
let xBolinha  = 300;
let yBolinha= 200;
let diamBolinha = 13;
let raio = diamBolinha/2;

// Variáveis da Velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis da Raquete
let xRaquete = 10;
let yRaquete = 150;
let compRaquete = 6;
let altRaquete = 68;

// Variáveis do Oponente
let xRaqueteOponente = 582;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let velocidadeYOponente2 = 0;

// Variáveis do Placar
let meusPontos = 0;
let pontosOponente = 0;

let colisao = false;

// Variáveis dos Sons
let ponto;
let raquetada;
let trilha;

function preload() {
  trilha = loadSound("sons/trilha.mp3");
  ponto = loadSound("sons/ponto.mp3");
  raquetada = loadSound("sons/raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  bola();
  posicaoDaBolinha ();
  velocidadeDaBolinha();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //colisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraPontos();
  marcaPonto();
}

function velocidadeDaBolinha () {
  if(xBolinha > width - raio || xBolinha - raio < 0) {
    velocidadeXBolinha *=-1;
  }
  
  if(yBolinha > height - raio || yBolinha < 0 + raio) {
    velocidadeYBolinha *= -1;
  }
}

function bola () {
  circle(xBolinha, yBolinha, diamBolinha);
}

function posicaoDaBolinha () {
  xBolinha = xBolinha + velocidadeXBolinha;
  yBolinha = yBolinha + velocidadeYBolinha;
  
}

function mostraRaquete(x,y) {
   rect(x, y, compRaquete, altRaquete);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete +=10;
  }
}

/*
function colisaoRaquete() {
  if(xBolinha - raio < xRaquete + compRaquete && yBolinha - raio < yRaquete + altRaquete && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
  }
}
*/

function colisaoRaqueteBiblioteca(x,y) {
  colisao = 
    collideRectCircle (x, y, compRaquete, altRaquete, xBolinha, yBolinha, raio);
  if(colisao) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - (compRaquete/2) - velocidadeYOponente2
  if(pontosOponente > meusPontos) {
    velocidadeYOponente2 = 80;
  }
  if(pontosOponente < meusPontos && velocidadeYOponente2 > 50) {
    velocidadeYOponente2 -= 3;
  }
  yRaqueteOponente += velocidadeYOponente;
}

function mostraPontos() {
  stroke(255);
  textAlign(CENTER)
  textSize(16);
  fill(color(255, 140, 0));
  rect(180, 10, 40, 20);
  fill(255);
  text(meusPontos,200,26);
  fill(color(255, 140, 0));
  rect(380, 10, 40, 20);
  fill(255);
  text(pontosOponente,400,26);
}

function marcaPonto() {
  if(xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  }
}