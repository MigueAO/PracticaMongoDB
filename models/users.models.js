const { Schema, model, SchemaTypes } = require('mongoose');

//Defginicion del esquema para la coleccion de Ususairo

const UserSchema = Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
    },
});

//Configuracion opcional para cambiar el _id por uid
//Este cambio es solo para fines visuales, la bd permanece con _id

UserSchema.method('toJSON', function() {
    const { __V, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})


// se exporta el modelo
// Por defecto moongose creara un mongodb un documento en plurarl: users
module.exports = model('User', UserSchema);