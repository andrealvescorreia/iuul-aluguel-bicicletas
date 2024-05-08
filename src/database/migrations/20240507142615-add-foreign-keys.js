'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addConstraint('CartaoDeCredito', {
        fields: ['ciclista'],
        type: 'foreign key',
        name: 'cartao_de_credito_ciclista_fkey',
        references: {
          table: 'Ciclista',
          field: 'id'
        }
      }),
      queryInterface.addConstraint('Aluguel', {
        fields: ['ciclista'],
        type: 'foreign key',
        name: 'aluguel_ciclista_fkey',
        references: {
          table: 'Ciclista',
          field: 'id'
        }
      }),
      queryInterface.addConstraint('Devolucao', {
        fields: ['ciclista'],
        type: 'foreign key',
        name: 'devolucao_ciclista_fkey',
        references: {
          table: 'Ciclista',
          field: 'id'
        }
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeConstraint('CartaoDeCredito', 'cartao_de_credito_ciclista_fkey'),
      queryInterface.removeConstraint('Aluguel', 'aluguel_ciclista_fkey'),
      queryInterface.removeConstraint('Devolucao', 'devolucao_ciclista_fkey'),
    ])
  }
};
