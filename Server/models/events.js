module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    title: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.STRING,
    venue: DataTypes.STRING,
    description: DataTypes.STRING,
  });
  Events.associate = (models) => {
    // associations can be defined here
    Events.belongsTo(models.Users);
    Events.belongsTo(models.Centers);
  };
  return Events;
};
