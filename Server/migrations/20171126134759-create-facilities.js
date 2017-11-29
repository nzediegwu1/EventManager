module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Facilities', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING(100),
        },
        spec: {
            type: Sequelize.STRING,
        },
        quantity: {
            type: Sequelize.INTEGER,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        centerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Centers',
                key: 'id',
                as: 'centerId',
            },
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Facilities'),
};
