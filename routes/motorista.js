const express  = require('express');
const router = express.Router();

const motoristaController = require('../controllers/motoristaControllers');

router.get('/motorista/listar/:idCadastro', motoristaController.list);
router.post('/motorista/adicionar', motoristaController.create);
router.get('/motorista/editar/:idCadastro', motoristaController.edit);
router.put('/motorista/update/:idCadastro', motoristaController.update);
router.get('/motorista/excluir/:idCadastro', motoristaController.delete);

module.exports = router;