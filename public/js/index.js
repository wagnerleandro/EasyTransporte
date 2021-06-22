function deleteRowById(idVeiculo) {
    fetch('http://localhost:8081/excluir/' + idVeiculo, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}


