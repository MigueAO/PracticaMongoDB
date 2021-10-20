const jwt =  require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Leer el token del header
    //x-token es un header perzonalizado donde se registrará un token válido
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const{uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}