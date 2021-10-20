const {Schema, model, SchemaTypes} = require('mongoose');

//Definicion del esquema para la coleccion de Prductos

const ProductSchema = Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        require: true,
    }
    
});

//Este cambio es solo para fines visuales, la bd permanece con _id
ProductSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: products
module.exports = model ('Product', ProductSchema);