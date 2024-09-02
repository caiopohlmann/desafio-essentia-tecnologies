require('dotenv').config();

const env = {
    database: 'tasksdb',
    username: 'root',
    password: '1234',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    secret: process.env.TOKEN_SECRET || 'default_secret_key'
};

module.exports = env;
