module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING(100),
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    phoneNo: DataTypes.BIGINT,
    accountType: {
      // admin or regular only
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: 'regular',
    },
    password: DataTypes.STRING,
  });
  Users.associate = models => {
    // associations can be defined here
    Users.hasMany(models.Events, { foreignKey: 'userId', as: 'events' });
    Users.hasMany(models.Centers, { foreignKey: 'userId', as: 'centers' });
  };
  return Users;
};
