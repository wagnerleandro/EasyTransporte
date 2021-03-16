const express  = require('express');
const router = express.Router();

const veiculoController = require('../controllers/veiculoControllers');

router.get('/excluir/:idVeiculo', veiculoController.delete);
router.get('/veiculo/editar/:idVeiculo', veiculoController.edit);

module.exports = router;