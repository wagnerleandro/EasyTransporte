
function verificarCPF(cpf) {
    try {
        var Soma;
        var Resto;
        var strCPF = cpf.replace("-", "").replace(".", "").replace(".", "")
        Soma = 0;

        if (cpf == "00000000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999") {

            document.getElementById("error").innerHTML = "CPF Inválido";
            
            return false;
        }

        if (strCPF == "00000000000") {
            document.getElementById("error").innerHTML = "CPF Inválido";
            
            return false;
        }

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) {
            document.getElementById("error").innerHTML = "CPF Inválido";
           
            return false;
        }

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) {
            document.getElementById("error").innerHTML = "CPF Inválido";
           
            return false;
        }

        document.getElementById("error").innerHTML = "CPF válido";
        
        return true;

    } catch (e) {

        return false;
    }
}


//#region 

$('#create_Motorista').submit(function (event) {
	event.preventDefault();
	var data = {}

	var unindexed_array = $(this).serializeArray();
	$.map(unindexed_array, function (n, i) {
		data[n['name']] = n['value']
	})
	console.log(unindexed_array);

	axios({
		method: 'post',
		url: `http://localhost:8081/motorista/adicionar`,
		"data": data,
		config: { headers: { 'Content-Type': 'multipart/form-data' } }
	})
		.then(function (response) {
			if (response.status === 200) {
				console.log("Update Success");

				var notify = $.notify('<strong>Dados inseridos com sucesso.</strong>', {
					type: 'success',
					allow_dismiss: false,

				});
				//window.location = "/veiculo"
			}
		})
		.catch(function (response) {

			var notify = $.notify('<strong>Algo deu errado :(</strong> Contate o administrador!', {
				type: 'warning',
				allow_dismiss: false,
			})
			console.log(response);

		});
})
//#endregion

$('#update_Motorista').submit(function (event) {
	event.preventDefault();
	var data = {}

	var unindexed_array = $(this).serializeArray();
	$.map(unindexed_array, function (n, i) {
		data[n['name']] = n['value']
	})
	console.log(unindexed_array);

	axios({
		method: 'put',
		url: `http://localhost:8081/motorista/update/${data.idCadastro}`,
		"data": data,
		config: { headers: { 'Content-Type': 'multipart/form-data' } }
	})
		.then(function (response) {
			if (response.status === 200) {
				console.log("Update Success");

				var notify = $.notify('<strong>Dados inseridos com sucesso.</strong>', {
					type: 'success',
					allow_dismiss: false,

				});
				//window.location = "/veiculo"
			}
		})
		.catch(function (response) {

			var notify = $.notify('<strong>Algo deu errado :(</strong> Contate o administrador!', {
				type: 'warning',
				allow_dismiss: false,
			})
			console.log(response);

		});
})



$(function () {
	var elemento = dataValidadeCnh
	data = new Date(elemento);
	dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
	var datanova = dataFormatada.split('/').reverse().join('-');
	document.getElementById("dataValidadeCnh").value = datanova;
});