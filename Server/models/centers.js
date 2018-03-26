module.exports = (sequelize, DataTypes) => {
  const Centers = sequelize.define('Centers', {
    name: DataTypes.STRING(100),
    address: DataTypes.STRING,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    picture: DataTypes.STRING, // Image url
    public_id: DataTypes.STRING, // cloudinary image public_id
    availability: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });
  Centers.associate = models => {
    // associations can be defined here
    Centers.hasMany(models.Events, { foreignKey: 'centerId', as: 'events' });
    Centers.belongsTo(models.Users, { foreignKey: 'userId', as: 'user', onDelete: 'SET NULL' });
    Centers.hasMany(models.Facilities, { foreignKey: 'centerId', as: 'facilities' });
  };
  return Centers;
};
