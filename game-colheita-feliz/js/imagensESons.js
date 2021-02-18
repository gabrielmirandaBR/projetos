// Variáveis
let imagemDaFazenda;
let imagemDotrator;
let imagemAlho;
let imagemBatata;
let imagemBrocolis;
let imagemErvilha;
let imagemRepolho;
let imagemTomate;
let imagemRocha;
let somTema;
let somPonto;

function preload() {
  imagemDaFazenda = loadImage("imagens/plantacao.png");
  imagemDoTrator = loadImage("imagens/personagem1.png");
  imagemAlho = loadImage("imagens/alho1.png");
  imagemBatata = loadImage("imagens/batata1.png");
  imagemBrocolis = loadImage("imagens/brocolis1.png");
  imagemErvilha = loadImage("imagens/ervilha1.png");
  imagemRepolho = loadImage("imagens/repolho1.png");
  imagemTomate = loadImage("imagens/tomate1.png");
  imagemPersonagens = [imagemAlho, imagemBatata, imagemBrocolis, imagemErvilha, imagemRepolho, imagemTomate];
  somTema = loadSound("sons/farm_theme.flac");
  somPonto = loadSound("sons/point.wav");
}