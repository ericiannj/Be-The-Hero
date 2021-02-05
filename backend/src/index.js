//A variável vai conter todas as funcionalidades do express
const express = require('express');
const cors = require('cors');
//Tem que deixar o ./ para mostrar que não é um pacote, mas sim um arquivo
const routes = require('./routes.js');

//Criação da aplicação por meio de uma variável
const app = express();

app.use(cors()); //Após a produção, colocar no origin qual o endereço para acesso
//Informar para o express que estaremos usando JSON para o corpo das requisições. Assim, o express vai transformar o JSON em um objeto de JS.
app.use(express.json());
app.use(routes);

//Local em que se terá acesso à aplicação. Usa-se essa para rodar o node (há um padrão
// com a linguagem)
app.listen(3333);
