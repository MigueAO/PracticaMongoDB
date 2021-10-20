const {Schema, model, SchemaTypes} = require('mongoose');
const User = require('./users.models');
const Product = require('./products.models');

//Definicion del esquema para la coleccion de Prductos

const OrderSchema = Schema({
    iduser:{
        type: String,
        required: true
    },
    products:[{
        idproduct: String,
        title: String,
        price: Number,
        qty: Number
    }],
    total:{
        type: Number,
        default: 0
    },
    date:{
        type: Date,
        default: Date.now
    }
});

OrderSchema.pre('save', async function(next){
    if(this.isModified('products') || this.isNew){
        const document = this;
        const idUser = document.iduser;
        const products = document.products;

        document.total = 0;

        let user;
        let promises = [];

        try{
            user = await User.findById(idUser);
        }catch(ex){
            next(new Error(`El usuario con ID '${idUser}' no existe`));
            //next(ex);
        }

        try{
            if(products.length == 0){
                //products list is empty
                next(new Error('La orden está vacía. Agrega algunos productos'));
            }else{
                for(item of products){
                    promises.push(await Product.findById(item.idproduct));
                }
    
                const resultPromises = await Promise.all(promises);
    
                console.log('res promises',resultPromises);
    
                resultPromises.forEach( (product, index) => {
                    document.total += product.price * products[index].qty;
                    document.products[index].title = product.title;
                    document.products[index].price = product.price;
                });
            }
            
        }catch(ex){
            next(new Error(`La información de uno o más productos es incorrecta`));
        }

        
    }else{
        next();
    }
});

//Este cambio es solo para fines visuales, la bd permanece con _id
OrderSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: orders
module.exports = model ('Order', OrderSchema);