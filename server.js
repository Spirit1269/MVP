//Declare dependencies
import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import { check, validationResult } from 'express-validator';
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
    req.checkBody('brand', 'Brand is required').notEmpty();
    req.checkBody('fiber_type1', 'At least one fiber type is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        // Return validation errors to the client-side
        return res.status(400).json({ errors: errors });
    }
    pool.query('INSERT INTO yarn (brand, name_, size_id, fiber_type1, fiber_type2, color, length_, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ',[
        req.body.brand,
        req.body.name_, 
        req.body.size_id, 
        req.body.fiber_type1,
        req.body.fiber_type2,
        req.body.color,
        req.body.length_,
        req.body.quantity
     ])
      .then((result) => {
         // Send relevant response data to client-side
         res.status(201).json({ message: "Yarn added successfully", yarn: result.rows[0] });
     })
     .catch((error) => {
         // Handle database errors
         console.error(error);
         res.status(500).json({ message: "Internal server error" });
     });
}); 

 app.listen(port, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});