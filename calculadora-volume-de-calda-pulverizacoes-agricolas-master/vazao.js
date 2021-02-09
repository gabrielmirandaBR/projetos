// Chamar os parâmetros do mundo HTML
var botao = document.querySelector("#calcular");
	
// Criar um evento de click no button
botao.addEventListener("click", calculaVolumeDeCalda);

// Calcular o Volume de Calda
function calculaVolumeDeCalda (vazao, velocidade, espacamento) {

	// Chamar os parâmetros do mundo HTML
	var vazao = document.querySelector("#vazao").value;
	var velocidade  = document.querySelector("#velocidade").value;
	var espacamento = document.querySelector("#espacamento").value;
	var boxResultado = document.querySelector("#resultado");

	// Condição se não tiver nada escrito no input
	if(vazao !== "" && velocidade !== "" && espacamento !== "") {

		var calculaVolume = (60000*vazao) / (velocidade*espacamento);

		var classificacao = "";

		// Condições para classificar o Volume de Calda
		if(calculaVolume < 0.5) {
			classificacao = "Ultra Ultra Baixo Volume"

		} else if (calculaVolume >= 0.5 && calculaVolume < 5) {
			classificacao = "Ultra Baixo Volume"

		} else if(calculaVolume >= 5 && calculaVolume < 50) {
			classificacao = "Baixo Volume"

		} else if(calculaVolume >= 50 && calculaVolume < 500) {
			classificacao = "Médio Volume"

		} else if(calculaVolume >= 500) {
			classificacao = "Alto Volume"
		}

		boxResultado.textContent = calculaVolume.toFixed(2) + " l/ha - " + classificacao;

	// Se não tiver nada escrito no input 
	} else {
		boxResultado.textContent = "Preencha todos os campos";
	}
}