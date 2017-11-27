module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNo: DataTypes.INTEGER,
    accountType: {
      type: DataTypes.ENUM,
      values: ['regular', 'admin'],
    },
    password: DataTypes.STRING,
  });
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasMany(models.Events);
    Users.hasMany(models.Centers);
  };
  return Users;
};
