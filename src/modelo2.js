const knexLib = require('knex');

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

module.exports = Modelo2;