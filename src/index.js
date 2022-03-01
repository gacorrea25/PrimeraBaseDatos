const {options} = require('./utils/option');
const modelo = require('./modelo');

const modeloArticulo = new modelo(options);

const articulos = [
    {nombre: 'Papa', codigo: 'P1', precio: 23.60, stock: 24},
    {nombre: 'Zanahoria', codigo: 'Z1', precio: 33.60, stock: 324},
    {nombre: 'Rabanito', codigo: 'R1', precio: 50.30, stock: 104},
    {nombre: 'Zapallo', codigo: 'Z2', precio: 80.00, stock: 324},
    {nombre: 'Uva', codigo: 'U1', precio: 300.00, stock: 300}
]

modeloArticulo.crearTabla()
    .then(()=>
    {
        console.log('Tabla creada');        
        return modeloArticulo.insertar(articulos);
    }) 
    .then(()=>{
        console.log('Insertar Articulos');
        return modeloArticulo.listar();
    })
    .then((respuesta)=>{
        console.log('Listado de Articulos');
        console.table(respuesta);
        return modeloArticulo.eliminarArticulo(3);
    })   
    .then(()=>{
        console.log('Articulos Eliminado');
        return modeloArticulo.listar();
    })
    .then((respuesta)=>{
        console.log('Articulos Actuales despues de la eliminación');
        console.table(respuesta);
        return modeloArticulo.ActualizarStock(2, 0);        
    })
    .then(()=>{
        console.log('Actualizacion de stock');
        return modeloArticulo.listar();
    })   
    .then((respuesta)=>{
        console.log('Articulos Actuales despues de la actualizacion de stock');
        console.table(respuesta);
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
    .finally(()=>
    {
        modeloArticulo.cerrarConexion();
    })