module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Centers', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        location: {
            type: Sequelize.STRING,
        },
        capacity: {
            type: Sequelize.INTEGER,
        },
        price: {
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
        UserId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id',
                as: 'UserId',
            },
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Centers'),
};
