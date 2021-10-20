const createError = require('http-errors');

const express = require('express'); //Sintáxis de importación NodeJS

require('dotenv').config();

const {dbConection} = require('./config/database');

const cors = require('cors');

//Routes
const usersRoute = require('./routes/users.routes');
const productsRoute = require('./routes/products.routes');
const ordersRoute = require('./routes/orders.routes');
const authRoute = require('./routes/auth.routes');

//Crear el servidor express
const app = express();

app.get("/",(req,res)=>{
    res.send("Bienvenido al servidor");
})

//Configurar CORS
app.use(cors());

//Parciar objetos JSON
app.use(express.json());

//Estableciendo conexion a la BD
dbConection();

//Rutas de la API Proyectos
app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/login', authRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404, 'La ruta no existe'));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({
        errorcode: err.status || 500,
        message: res.locals.message
    });
  });

//Código para desplegar el servidor
app.listen(process.env.PORT,()=>{
    console.log("Servidor desplegado en el pueto: "+ process.env.PORT);
})