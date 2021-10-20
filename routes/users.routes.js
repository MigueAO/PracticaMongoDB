/*
    Path: /api/users
*/

const { Router } = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJWT, getUsers);
router.post('/', 
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    createUser);
router.put('/:id',
    [
        validarJWT,
        check('username', 'El username es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    updateUser);
router.delete('/:id', validarJWT, deleteUser);

module.exports = router;