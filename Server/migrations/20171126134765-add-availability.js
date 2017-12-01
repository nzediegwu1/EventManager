module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.addColumn('Centers', 'availability', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'open',
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropColumn('Centers', 'availability'),
};
