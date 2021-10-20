/*
    Path: /api/orders
*/

const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require ('../middlewares/validar-jwt');

const { getOrders, createOrder } = require ('../controllers/orders.controllers')
const router = Router();

router.get('/', getOrders);
router.post('/',
    [
        validarJWT,
        check('iduser','El id del usuario es obligatorio').not().isEmpty(),
        check('products','Los datos de productos son obligatorios').not().isEmpty(),
        validarCampos,
    ] ,
    createOrder);

module.exports = router;