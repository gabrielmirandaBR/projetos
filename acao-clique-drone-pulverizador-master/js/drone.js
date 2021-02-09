// Chamar variáveis do mundo HTML
var botaoLiga = document.querySelector("#button1");
var botaoDesliga = document.querySelector("#button2");
var imagemDrone = document.querySelector("#imagem-drone");
var imagemControle = document.querySelector("#controle");

// Eventos ao clicar nos botões
botaoLiga.addEventListener("click", ligaPulverizacao);
botaoDesliga.addEventListener("click", desligaPulverizacao);

// Eventos ao passar o mouse no controle
controle.addEventListener("mouseover", ligaPulverizacao);
controle.addEventListener("mouseleave", desligaPulverizacao);
imagemDrone.addEventListener("dblclick", quebraDrone);


// Função para validar se o drone está quebrado buscando o fragmento "quebrado" (>-1 está presente)
function validaDroneQuebrado () {

	return imagemDrone.src.indexOf("quebrado") > -1;
}


// Funções para mudar as imagens
function quebraDrone ()  {

	imagemDrone.src = "imagens/drone-quebrado.png";
}

function ligaPulverizacao() {

	if(!validaDroneQuebrado()) {
		imagemDrone.src = "imagens/drone-depois.png";
	}
}
	
function desligaPulverizacao() {

	if(!validaDroneQuebrado()) {
		imagemDrone.src = "imagens/drone-resultado.png";
	}
}




