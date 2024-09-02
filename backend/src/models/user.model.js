module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
		// userId :{
		// 	type:Sequelize.INTEGER
		// },
	  username: {
		  type: Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  password: {
		  type: Sequelize.STRING
	  }
	  
	},{
		timestamps: false
	});
	
	return User;
}