const express  = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteControllers');


router.post('/cliente/adicionar', clienteController.create);


module.exports = router;