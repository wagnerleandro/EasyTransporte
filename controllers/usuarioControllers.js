const controller = {};
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'db'
    }
});

const SECRECT = '10203050'
const bcrypt = require('bcrypt');
const crypto = require('crypto');

controller.create = async (req, res, next) => {
    const result = req.body
    idUsuario = crypto.randomBytes(20).toString('hex')
    const hash = await bcrypt.hashSync(req.body.password, 10)
    const {password, email, status, nome} =  req.body
    knex('usuarios')
        .insert([{email: req.body.email,
          password: hash
          ,idUsuario: idUsuario,
          nome: req.body.nome,
          status: req.body.status}])
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);
        }, next)
  }


 
  controller.login = async  (req, res, next) => {
    const {email, idUsuario, password} = req.body
    const user = await knex.select().from('usuarios').where('email', email);
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(req.body.email === user.email && req.body.password === validPassword){
      //auth ok
      
      const token = jwt.sign({ id }, SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
}





module.exports = controller;