module.exports = (sequelize, DataTypes) => {
  const Facilities = sequelize.define('Facilities', {
    name: DataTypes.STRING(100),
    spec: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    centerId: DataTypes.INTEGER,
  });
  Facilities.associate = models => {
    // associations can be defined here
    Facilities.belongsTo(models.Centers, {
      foreignKey: 'centerId',
      as: 'centers',
      onDelete: 'CASCADE',
    });
  };
  return Facilities;
};
