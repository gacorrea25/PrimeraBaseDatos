const knexLib = require('knex');

class Modelo{
    constructor(options)
    {
        this.knex = knexLib(options);
    }

    crearTabla(){
        return this.knex.schema.dropTableIfExists('chat').
            finally(() => {        
                return this.knex.schema.createTable('chat', table=> {
                table.increments('id').primary();
                table.string('autor', 50).notNullable();
                table.string('texto', 1000).notNullable();
                
            })            
        })
    }

    cerrarConexion(){
        this.knex.destroy();
    }

    insertar(chat){     
        console.log(chat);
        const chats = [chat];
        return this.knex('chat').insert(chats);
    }

    listar(){
        const tab = this.knex.from('articulos').select('*');                
        return tab;
        
    }
    eliminarArticulo(idArticulo)
    {
        return this.knex.from('articulos').where('id', '=', idArticulo).del();           
    }

    ActualizarStock(id, valor)
    {
        return this.knex.from('articulos').where('id', '=', id).update({stock: valor});           
    }

}

class Modelo2{
    constructor(options)
    {
        this.knex = knexLib(options);
    }

    crearTabla(){
        return this.knex.schema.dropTableIfExists('chat').
            finally(() => {        
                return this.knex.schema.createTable('chat', table=> {
                table.increments('id').primary();
                table.string('autor', 50).notNullable();
                table.string('texto', 1000).notNullable();
                
            })            
        })
    }
    
    insertar(chat){     
        console.log(chat);
        const chats = [chat];
        return this.knex('chat').insert(chats);
    }

}
 

 module.exports = Modelo;
 module.exports = Modelo2;