const { Sequelize } = require('sequelize');
const config = require('./env.js');

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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.list = require('../models/list.model.js')(sequelize, Sequelize);
db.task = require('../models/task.model.js')(sequelize, Sequelize);

db.list.belongsTo(db.user, { foreignKey: 'user_id' });
db.user.hasMany(db.list, { foreignKey: 'user_id' });

db.task.belongsTo(db.list, { foreignKey: 'list_id' });
db.list.hasMany(db.task, { foreignKey: 'list_id' });

db.user.belongsToMany(db.list, { through: 'user_list', foreignKey: 'userId', otherKey: 'listId' });
db.list.belongsToMany(db.user, { through: 'user_list', foreignKey: 'listId', otherKey: 'userId' });

module.exports = db;
