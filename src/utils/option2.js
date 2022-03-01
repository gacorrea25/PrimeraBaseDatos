const path = require('path');

const options2 = {
    client: 'better-sqlite3',
    connection: {filename: path.resolve(__dirname, '../DB/mydb.db3')},
    useNullAsDefault: true
}

module.exports = { options2 }