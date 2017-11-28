module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define('Events', {
        title: DataTypes.STRING,
        date: DataTypes.DATE,
        venue: DataTypes.STRING,
        description: DataTypes.TEXT,
        picture: {
            type: DataTypes.STRING, // image url
            allowNull: true,
        },
        centerId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
    });
    Events.associate = (models) => {
        // associations can be defined here
        Events.belongsTo(models.Centers, { foreignKey: 'centerId', as: 'centers', onDelete: 'CASCADE' });
        Events.belongsTo(models.Users, { foreignKey: 'userId', as: 'users', onDelete: 'SET NULL' });
    };
    return Events;
};
