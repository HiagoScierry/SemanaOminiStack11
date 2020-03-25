/*
    Metodos HTTP:
        GET: Buscar uma informação do backend
        POST: Criar uma informação do backend
        PUT: Alterar uma informação do backend
        DELETE: Deletar uma informação do backend
*/

/*
    Tipos de Parametros:
        Query params: Parametros nomeados enviados na rota apos  "?" (Filtros , paginação)
        Route params: Parametros utilizados para identrificar recursos
        Request Body: Corpo da requisição , utilizado para criar ou alterar recursos
*/

/* 
    Banco de dados:     
        SQL : MySQL, SQLite, PostgreeSQL, Oracle, Microsoft SQL Server
        NoSQL: MongoDB, CouchDB, etc
*/

/*
    Driver : SELECT * FROM users
    Query Builder: table('users').select('*').where()
*/


const express =  require("express")
const cors = require('cors')
const routes = require("./routes")

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)


app.listen(3333)