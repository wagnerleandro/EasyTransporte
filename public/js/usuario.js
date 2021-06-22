$('#create_Usuario').submit(function (event) {
	event.preventDefault();
	var data = {}

	var unindexed_array = $(this).serializeArray();
	$.map(unindexed_array, function (n, i) {
		data[n['name']] = n['value']
	})
	console.log(unindexed_array);

	axios({
		method: 'post',
		url: `http://localhost:8081/cadastro`,
		"data": data,
		config: { headers: { 'Content-Type': 'application/json;charset=UTF-8',
		"Access-Control-Allow-Origin": "*", } }
	})
		.then(function (response) {
			if (response.status === 200) {
				console.log("Update Success");

				

				window.location = "/login"
			}
		})
		.catch(function (response) {

			console.log(response);

		});
})
//#endregion