const { response } = require('express');
const Producto = require('../models/products.models');

const getProduct = async(req, res = response) => {
    const id  = req.params.id;

    try {
        const producto = await Producto.findById( id );
        if ( !producto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        const result = await Producto.findById( id,'title price');
        res.json({
            ok: true,
            result
        });
        console.log(result);
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible buscar producto, consulte con el administrador'
        })
    }
}

const getProducts = async(req, res = response) => {
    const productos = await Producto.find({}, 'title price')

    res.json({
        ok: true,
        productos
    })
}

const createProduct = async(req, res = response) => {
    const {title, price} = req.body;

    try {
        const producto = new Producto(req.body);

        await producto.save();
        
        res.json({
            ok: true,
            producto: producto
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar producto, consulte con el administrador'
        })
    }
}

const updateProduct = async (req, res = response) => {
    const id  = req.params.id;
    try {
        const producto = await Producto.findById( id );
        if ( !producto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        const {title, price, ...campos} = req.body;
        campos.title = title;
        campos.price = price;
        const productoActualizado = await Producto.findByIdAndUpdate(id, campos, {new: true});

        res.json({
            ok: true,
            proyecto: productoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el producto, consulte con el administrador'
        })
    }

}

const deleteProduct = async(req, res = response) => {
    const id  = req.params.id;

    try {
        const producto = await Producto.findById( id );
        if ( !producto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        await Producto.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'El Producto se ha eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el producto, consulte con el administrador'
        })
    }
}

module.exports = {
    getProduct,
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}