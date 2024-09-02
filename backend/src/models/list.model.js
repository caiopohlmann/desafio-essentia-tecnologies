module.exports = (sequelize, Sequelize) => {
  const List = sequelize.define('lists', {
      title: {
          type: Sequelize.STRING
      },
      user_id: {
          type: Sequelize.INTEGER
      }
  }, {
      timestamps: false
  });

  return List;
};
