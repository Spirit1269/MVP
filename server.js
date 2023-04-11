//Declare dependencies
const dotenv = require('dotenv')
const express = require('express');
const app = express();
const {Pool} = require("pg");

//Initialize dotenv
dotenv.config();

//Initialize Express
app.use(express.json());
const port = process.env.PORT || 3000;

//Initialize PG
const pool = new Pool({connectionString:process.env.DATABASE_URL})
pool.connect();

app.get('/', (req, res) => {
    res.send("Welcome to the Yarn DB")
})
app.get('/api/yarn', (req, res) => {
    pool
        .query('SELECT * FROM yarn')
        .then((result)=> {
            console.log(result)
            res.send(result.rows)
        })
    .catch((e) => console.error(e.stack))
})
app.get('/api/yarn/:id', (req, res) => {
    pool
        .query('SELECT id FROM yarn')
        .then((result) => {
            res.send(result.rows)
        })
        .catch((e) => console.error(e.stack))
})


app.post('/api/yarn', (req, res) => {
    pool.query('INSERT INTO yarn (name_, size_id, fiber_type, brand, color, length_, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ',[
        req.body.name_, 
        req.body.size_id, 
        req.body.fiber_type,
        req.body.color,
        req.body.length_,
        req.body.brand,
        req.body.quantity
     ])
      .then((result) => {
         res.send(result.rows);
     })
 }); 