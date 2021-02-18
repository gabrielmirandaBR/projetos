// Códigos do Carro

xCarros = [600, 600, 600, 600, 600, 600];
yCarros = [40, 96, 150, 210, 270, 318];
velocidadeCarros = [2, 2.5, 3.2, 5, 3.3, 2.3];
let comprimentoCarro = 50;
let alturaCarro = 40;
let pontosCarros = 0;

function mostraCarro() {
  for(let i = 0; i < imagemCarros.length; i++) {
    image(imagemCarros[i], xCarros[i], yCarros [i], comprimentoCarro, alturaCarro);
  }
}

function movimentaCarro () {
  for(let i = 0; i < imagemCarros.length; i++) {
    xCarros [i] -= velocidadeCarros[i]
  }
}

function VoltaPosicaoInicialCarro () {
  for(let i = 0; i< imagemCarros.length; i++) {
    if(passouTodaATela (xCarros[i])) {
      xCarros[i] = 600;
    }
  }
}

function passouTodaATela (xCarros) {
  return xCarros < -50;
}