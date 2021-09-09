const knex = require('knex');
//Importar configurações do banco de dados
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;
