const { response, json } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/users.models");

const getUsers = async(req, res) => {
    const usuarios = await Usuario.find({}, 'username password nombre')

    res.json({
        ok: true,
        usuarios
    });
}

const createUser = async(req, res) => {

    //console.log(req.body);
    const { username, password, nombre } = req.body;
    try {

        const existeUsername = await Usuario.findOne({ username });
        if (existeUsername) {
            return res.status(400).json({
                ok: false,
                msg: 'El username ya está en uso'
            })
        }
        // Creamos un objeto de la clase model Usuario
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Indicamos a mongoose que registre al usuario en la BD
        await usuario.save();
        
        // Mostramos los usuarios
        res.json({
            ok: true,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500) - json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        })
    }

}

const updateUser = async(req, res= response)=>{
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Codigo previo a la actualización
        const{password, username, nombre, ...campos} = req.body;
        if(usuarioDB.username !== username){
            const existeUsername = await Usuario.findOne({username});
            if(existeUsername){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este username'
                });
            }
        }
        campos.username = username;

        //actualización de datos
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500),json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}

const deleteUser = async(req, res=response) =>{
    const uid = req.params.id;
    try{
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);
        
        res.json({
            ok:true,
            msg: 'Usuario eliminado de la db'
        });
    } catch (error) {
        console.log(error);
        res.status(500),json({
            ok: false,
            msg: 'Error al eliminar usuario'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}