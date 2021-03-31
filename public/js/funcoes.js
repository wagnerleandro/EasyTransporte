


$(function () {
	var elemento = dataAquisicao
	data = new Date(elemento);
	dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
	var datanova = dataFormatada.split('/').reverse().join('-');
	document.getElementById("dataAquisicao").value = datanova;
});
$(function () {
	var elemento = ano
	data = new Date(elemento);
	dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
	var datanova = dataFormatada.split('/').reverse().join('-');
	document.getElementById("ano").value = datanova;
});


$('#update_veiculo').submit(function(event){
	event.preventDefault();
	var data = {}
	
	var unindexed_array = $(this).serializeArray();
	$.map(unindexed_array, function(n, i){
	data[n['name']] = n['value']
	})
	console.log(unindexed_array);

    axios({
        method: 'put',
        url: `http://localhost:8081/editar/${data.idVeiculo}`,
        "data": data,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
       .then(function (response) {
         if (response.status === 200) {
           console.log("Update Success");

		   var notify = $.notify('<strong>Dados atualizados com sucesso.</strong>', {
			type: 'success',
			allow_dismiss: false,
	
		});
         }
       })
       .catch(function (response) {

		var notify = $.notify('<strong>Algo deu errado :(</strong> Contate o administrador!', {
			type: 'success',
			allow_dismiss: false,
		}) 
         console.log(response);
        
       });
	})