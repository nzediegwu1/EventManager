module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    picture: {
      type: DataTypes.STRING, // image url
      allowNull: true,
    },
    publicId: {
      type: DataTypes.STRING, // cloudinary image public_id
      allowNull: true,
    },
    centerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
  });
  Events.associate = models => {
    // associations can be defined here
    Events.belongsTo(models.Centers, { foreignKey: 'centerId', as: 'center', onDelete: 'CASCADE' });
    Events.belongsTo(models.Users, { foreignKey: 'userId', as: 'user', onDelete: 'SET NULL' });
  };
  return Events;
};
