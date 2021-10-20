/*
    Path: /api/products
*/

const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require ('../middlewares/validar-jwt');

const { getProduct, getProducts, createProduct, updateProduct, deleteProduct } = require ('../controllers/products.controllers')
const router = Router();

router.get('/:id', getProduct);
router.get('/', getProducts);
router.post('/',
    [
        validarJWT,
        check('title','El nombre del producto es obligatorio').not().isEmpty(),
        check('price','El precio del producto es obligatorio').not().isEmpty(),
        validarCampos,
    ] ,
    createProduct);
router.put('/:id',
    [
        validarJWT,
        check('title','El nombre del producto es obligatorio').isString(),
        check('price','El precio del producto es obligatorio').isDecimal(),
        validarCampos,   
    ] ,
    updateProduct);

router.delete('/:id',validarJWT, deleteProduct);

module.exports = router;