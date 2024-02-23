
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('usuarios', 'fecha_nacimiento', {
          type: Sequelize.DataTypes.DATE,
          allowNull: false
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('usuarios', 'fecha_nacimiento', { transaction: t })
      ]);
    });
  }
};