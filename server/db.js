const Pool = require('pg').Pool
require('dotenv').config()

const pool=new Pool({
    user:'postgres',
    password:'Janardhan@30351',
    host: 'localhost',
    port:5432,
    database: 'todoapp'
})

module.exports=pool