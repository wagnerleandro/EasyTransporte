

$(function () {
	var verificaStatus = document.querySelector('input[name="status"]:checked').value;
	if (verificaStatus == 1) {
		$('#status').bootstrapToggle('on')
	}
	else {
		$('#status').bootstrapToggle('off')
	}
})

$(function () {
	var elemento = dataAquisicao
	data = new Date(elemento);
	dataFormatada = data.toLocaleDateString('en-US', { timeZone: 'UTC' });
	var datanova = dataFormatada.split('/').reverse().join('-');
	document.getElementById("dataAquisicao").value = datanova;
});
$(function () {
	var elemento = ano
	data = new Date(elemento);
	dataFormatada = data.toLocaleDateString('en-US', { timeZone: 'UTC' });
	var datanova = dataFormatada.split('/').reverse().join('-');
	document.getElementById("ano").value = datanova;
});

