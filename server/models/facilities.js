module.exports = (sequelize, DataTypes) => {
  const Facilities = sequelize.define('Facilities', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING(100),
    spec: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    centerId: DataTypes.INTEGER,
  });
  Facilities.associate = models => {
    // associations can be defined here
    Facilities.belongsTo(models.Centers, {
      foreignKey: 'centerId',
      as: 'center',
      onDelete: 'CASCADE',
    });
  };
  return Facilities;
};
