module.exports = (sequelize, DataTypes) => {
    const Centers = sequelize.define('Centers', {
        name: DataTypes.STRING(100),
        address: DataTypes.STRING,
        location: DataTypes.STRING,
        capacity: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        picture: {
            type: DataTypes.STRING, // Image url
            allowNull: true,
        },
        userId: DataTypes.INTEGER,
    });
    Centers.associate = (models) => {
        // associations can be defined here
        Centers.hasMany(models.Events, { foreignKey: 'centerId', as: 'events' });
        Centers.belongsTo(models.Users, { foreignKey: 'userId', as: 'users', onDelete: 'SET NULL' });
        Centers.hasMany(models.Facilities, { foreignKey: 'centerId', as: 'facilities' });
    };
    return Centers;
};
