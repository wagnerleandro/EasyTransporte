$("#cnpj").keypress(function () {
    $(this).mask('99.999.999/9999-99');
});

var input = document.querySelector("#cnpj");
input.addEventListener("keypress", function (e) {
    if (!checkChar(e)) {
        e.preventDefault();
    }
});
function checkChar(e) {
    var char = String.fromCharCode(e.keyCode);
    var pattern = '[a-zA-Z0-9]';
    if (char.match(pattern)) {
        return true;
    }
}



function validarCNPJ(cnpj) {

    try {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;
    } catch (e) {

        return false;
    }
}



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





function exibir_ocultar(val) {
    if(val.value == '1') {
      document.getElementById('cnpj').style.display = 'none';
      document.getElementById('razao').style.display = 'none';
      document.getElementById('inscricaoEstadual').style.display = 'none';
      document.getElementById('nomefantasia').style.display = 'none';
      document.getElementById('cpf').style.display = 'block';
      document.getElementById('nome').style.display = 'block';
      document.getElementById('rg').style.display = 'block';
      $('label[for="cnpj1"]').css('display', 'none');
      $('label[for="razao1"]').css('display', 'none');
      $('label[for="inscricaoEstadual1"]').css('display', 'none');
      $('label[for="nomefantasia1"]').css('display', 'none');
      $('label[for="cpf1"]').css('display', 'block');
      $('label[for="rg1"]').css('display', 'block');
      $('label[for="nome1"]').css('display', 'block');
      
    }
    else {
      document.getElementById('cnpj').style.display = 'block';
      document.getElementById('razao').style.display = 'block';
      document.getElementById('inscricaoEstadual').style.display = 'block';
      document.getElementById('nomefantasia').style.display = 'block';
      document.getElementById('cpf').style.display = 'none';
      document.getElementById('nome').style.display = 'none';
      document.getElementById('rg').style.display = 'none';
      $('label[for="cpf1"]').css('display', 'none');
      $('label[for="rg1"]').css('display', 'none');
      $('label[for="nome1"]').css('display', 'none');
      $('label[for="cnpj1"]').css('display', 'block');
      $('label[for="razao1"]').css('display', 'block');
      $('label[for="inscricaoEstadual1"]').css('display', 'block');
      $('label[for="nomefantasia1"]').css('display', 'block');
    }
  };



  //#region 

$('#create_Cliente').submit(function (event) {
	event.preventDefault();
	var data = {}

	var unindexed_array = $(this).serializeArray();
	$.map(unindexed_array, function (n, i) {
		data[n['name']] = n['value']
	})
	console.log(unindexed_array);

	axios({
		method: 'post',
		url: `http://localhost:8081/cliente/adicionar`,
		"data": data,
        config: { headers: { 'Content-Type': 'application/json;charset=UTF-8',
		"Access-Control-Allow-Origin": "*", } }
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