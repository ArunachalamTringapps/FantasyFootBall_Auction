const { Pool } = require('pg')
const pool = new Pool({
    user: 'ioolrmqi',
    host: 'bubble.db.elephantsql.com',
    database: 'ioolrmqi',
    password: 'Ma2VjJTPq1zosmS4_RUeaIDeuFVFav6j',
    port: 5432
})
module.exports = pool

