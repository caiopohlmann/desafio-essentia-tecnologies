const { Sequelize } = require('sequelize');
const path = require('path');
const config = require(path.join(__dirname, 'src', 'config', 'config.json'))['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const User = require('./src/models/user.model')(sequelize, Sequelize);
const List = require('./src/models/list.model')(sequelize, Sequelize);
const Task = require('./src/models/task.model')(sequelize, Sequelize);


sequelize.sync({ force: true }) 
  .then(() => {
    console.log('Tables have been created successfully.');
  })
  .catch(err => {
    console.error('Error creating tables:', err);
  });
