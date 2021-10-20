/*
    Path: /api/login
*/

const {Router} = require('express');
const {login} = require('../controllers/auth.controller');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();
router.post('/',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

module.exports = router;