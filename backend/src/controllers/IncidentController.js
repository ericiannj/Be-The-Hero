//const { delete } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    //Paginação
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    response.header('X-Total-Count', count['count(*)']);
    return response.json(incidents);
  },

  async create(request, response) {
    //Não coloca o id no corpo da requisição, pois é um caso de autenticação. Melhor colocar no cabeçalho da requsição (request.headers)
    //O cabeçalho acaba servindo para demonstrar o contexto da requisição
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      //Só é para encontrar um mesmo
      .first();

    if (incident.ong_id != ong_id) {
      //O padrão é retornar 200 (sucesso). 401 é unauthorizes
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();

    //204 é quando é uma resposta sem conteúdo de sucesso. O send manda a mensagem sem corpo.
    return response.status(204).send();
  },
};
