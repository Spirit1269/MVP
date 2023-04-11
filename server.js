//Declare dependencies
import express from "express";
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

//Initialize Express
const app = express();
app.use(express.static("public"));

//Initialize dotenv
dotenv.config();
const port = process.env.PORT || 3000;

//Initialize PG
const pool = new Pool({connectionString:process.env.DATABASE_URL})
pool.connect();

app.use(express.json());

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
    const id = req.params.id; // Get the id from URL parameter

    pool
        .query('SELECT * FROM yarn_table WHERE id = $1', [id])
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

 app.listen(port, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});