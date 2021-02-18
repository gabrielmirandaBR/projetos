function setup() {
  createCanvas(500, 800);
  somTema.loop();
}

function draw() {
  background(imagemDaFazenda);
  mostraTrator();
  movimentaTrator();
  mostraPersonagens();
  verificaColisao();
  movimentaPersonagens ();
  voltaPosicaoInicial ();
  placarFundo ();
  mostraPontos();
}