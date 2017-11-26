module.exports = (sequelize, DataTypes) => {
    const Centers = sequelize.define('Centers', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        location: DataTypes.STRING,
        capacity: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
    });
    Centers.associate = (models) => {
        // associations can be defined here
        Centers.hasMany(models.Events);
        Centers.belongsTo(models.Users);
    };
    return Centers;
};
