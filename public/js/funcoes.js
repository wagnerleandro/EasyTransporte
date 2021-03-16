var select = document.getElementById('combustivel');
	var combustivel = select.options[select.selectedIndex].value;

	function timeConverter(UNIX_timestamp){
		var a = new Date(UNIX_timestamp * 1000);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		return time;
	  }

	  
	 
	  function teste() {
	   var teste = document.querySelector('input[name="status"]:checked').value;
	   if (teste.value == '0')
	   $('#status').bootstrapToggle('off')
	   else
	   $('#status').bootstrapToggle('on')
	  }
	  
	 


	$('#status').val(teste);