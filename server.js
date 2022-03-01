/* ---------------------- Modulos ----------------------*/
const express = require('express');
const path = require('path');
const {Server: HttpServer } = require('http');
const {Server: IOServer} = require('socket.io');
const {options} = require('./src/utils/option');
const {options2} = require('./src/utils/option2');
const modelo = require('./src/modelo');
const modelo2 = require('./src/modelo2');

/* ---------------------- Instancia de express ----------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* ---------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json());

/* ---------------------- Motor de plantilla ----------------------*/

app.set('view', path.join('view'));
app.set('view engine', '');

/* ---------------------- Base de Datos ----------------------*/
const modeloArticulo = new modelo(options);

const modelolite = new modelo2(options2);

/* ---------------------- WebSockets ----------------------*/
let conexiones = 0;
const mensajes = [];

io.on('connection', (socket) => {
    console.log('Conectado:' + socket.id);
    conexiones = conexiones + 1;
    console.log('Conexiones activas:' + conexiones);
    socket.emit('mensajes', mensajes);

    socket.on('mensajeNuevo', data=>{        
        mensajes.push(data);
        io.emit('mensajes', mensajes);
        modeloArticulo.insertar(data)
        .then(()=>
            {
                return modelolite.insertar(data);
            })         
        .catch((err)=>{
            console.error(
                {
                    error: err,
                     codigo: err.errno + ' ' + err.code,
                     msg: err.sqlMessage
                }
            )
        })   
        // .finally(()=>
        //     {
        //         modeloArticulo.cerrarConexion();
        //     })        
    });
        
});



/* ---------------------- Servidor ----------------------*/
const PORT = 4334;
const server = httpServer.listen(PORT, () => {
    console.log('servidor escuchando');
    modeloArticulo.crearTabla()
    .then(()=>
    {
        console.log('Tabla mysql creada');                
        modelolite.crearTabla();        
    })
    .then(()=>
    {
        console.log('Tabla sqlLite creada');                

    })
    .catch((err)=>{
        console.error(
            {
                error: err
                // codigo: err.errno + ' ' + err.code,
                // msg: err.sqlMessage
            }
        )
    })
    // .finally(()=>
    // {
    //     modeloArticulo.cerrarConexion();
    // })

});

server.on('error', error=> {
    console.log('Error del servidor');
});

