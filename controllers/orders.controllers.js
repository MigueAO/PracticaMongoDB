const { response } = require('express');
const Orden = require('../models/orders.models');

const getOrders = async(req, res = response) => {
    const ordenes = await Orden.find({}, 'iduser total date products')

    res.json({
        ok: true,
        ordenes
    })
}

const createOrder = async(req, res = response) => {
    const {iduser, products} = req.body;
    try {
        const order = new Orden({iduser, products});
        const result = await order.save();
        res.json({
            ok: true,
            result
        });
    
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible guardar orden, consulte con el administrador'
        })
    }
}


module.exports = {
    getOrders,
    createOrder,
}