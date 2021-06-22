const express  = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioControllers');


router.post('/cadastro', usuarioController.create);
router.post('/loginUsuario', usuarioController.login);

module.exports = router;