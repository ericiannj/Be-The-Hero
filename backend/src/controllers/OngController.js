//pacote que gera uma string aleatória e pode ser usado para gerar id
const crypto = require('crypto');
const connection = require('../database/connection');

//Deixar a função assíncrona para dar tempo de esperar a conecção
module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

  //Criação de registro de ONG
  async create(request, response) {
    //É possível retornar texto (response.send(''), mas geralmente é JSON)
    const { name, email, whatsapp, city, uf } = request.body;

    //Pacote do node que gera strings aleatórios para gerar id
    const id = crypto.randomBytes(4).toString('HEX');

    //Node vai aguardar essa parte finalizar para continuar
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    //Retorna apenas o id, pois é esse que vai conectá-la e individualizá-la
    return response.json({ id });
  },
};
