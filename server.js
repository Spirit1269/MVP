//Declare dependencies
import express from "express";
import bodyParser from'body-parser';
import dotenv from "dotenv";
import pg from "pg";
import { check, validationResult } from 'express-validator';
const { Pool } = pg;



//Initialize Express
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());



//Initialize dotenv
dotenv.config();
const port = process.env.PORT || 3000;

//Initialize PG
const pool = new Pool({connectionString:process.env.DATABASE_URL})
pool.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Welcome to the Yarn DB")
})
app.get('/api/yarn', (req, res) => {
    pool
        .query('SELECT * FROM yarn_table')
        .then((result)=> {
            console.log(result)
            res.send(result.rows)
        })
    .catch((e) => console.error(e.stack))
})

//Get yarn by ID
app.get('/api/yarn/:id', (req, res) => {
    const id = req.params.id; // Get the id from URL parameter
    pool
        .query('SELECT * FROM yarn_table WHERE id = $1', [id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch((e) => console.error(e.stack))
})

//Get all Brands of yarn in DB
app.get('/api/brands', (req, res) => {
    pool
        .query('SELECT brand FROM yarn_table')
        .then((result)=> {
            console.log(result)
            res.send(result.rows)
        })
    .catch((e) => console.error(e.stack))
})

//Get all sizes of yarn in DB
app.get('/api/size',  (req, res) => {
    // const brand = req.params.brand;
       pool
       .query('SELECT size_id FROM yarn_table')
       .then((result) => {
            console.log(result.rows)
            res.send(result.rows)
       })
       .catch((e) => console.error(e.stack))
});

app.post('/api/yarn', [
    check('brand').notEmpty().withMessage('Brand is required'),
    check('fiber_type1').notEmpty().withMessage('At least one fiber type is required'),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors to the client-side
      return res.status(400).json({ errors: errors.array() });
    }
  
    console.log(req.body)
    pool.query('INSERT INTO yarn_table (brand, name_, size_id, fiber_type1, fiber_type2, color, length_, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * ',
    [
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

app.delete('/api/yarn/:id', (req, res) => {
    const id = req.params.id; // Get the id from URL parameter

    pool.query('DELETE FROM yarn_table WHERE id = $1 RETURNING *', [id])
    .then((result) => {
        if (result.rowCount === 0) {
            // If no rows were affected, return an error
            res.status(404).json({ message: 'Yarn not found' });
        } else {
            // Send relevant response data to client-side
            res.json({ message: 'Yarn deleted successfully', to_do_list: result.rows[0] });
        }
    })
    .catch((error) => {
        // Handle database errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    });
});

app.patch('/api/yarn/:id', (req, res) => {
    const id = req.params.id; // Get the id from URL parameter
    const { brand, name_, size_id, fiber_type1, fiber_type2, color, length_, quantity } = req.body; // Get the updated data from request body

    // Construct the update query dynamically based on the fields that are present in the request body
    let updateQuery = 'UPDATE yarn_table SET ';
    const updateParams = [];
    let paramCount = 1;

    // Check if each field is present in the request body, and add it to the update query and parameters array
    if (brand) {
        updateQuery += `brand = $${paramCount}, `;
        updateParams.push(brand);
        paramCount++;
    }
    if (name_) {
        updateQuery += `name_ = $${paramCount}, `;
        updateParams.push(name_);
        paramCount++;
    }
    if (size_id) {
        updateQuery += `size_id = $${paramCount}, `;
        updateParams.push(size_id);
        paramCount++;
    }
    if (fiber_type1) {
        updateQuery += `fiber_type1 = $${paramCount}, `;
        updateParams.push(fiber_type1);
        paramCount++;
    }
    if (fiber_type2) {
        updateQuery += `fiber_type2 = $${paramCount}, `;
        updateParams.push(fiber_type2);
        paramCount++;
    }
    if (color) {
        updateQuery += `color = $${paramCount}, `;
        updateParams.push(color);
        paramCount++;
    }
    if (length_) {
        updateQuery += `length_ = $${paramCount}, `;
        updateParams.push(length_);
        paramCount++;
    }
    if (quantity) {
        updateQuery += `quantity = $${paramCount}, `;
        updateParams.push(quantity);
        paramCount++;
    }

    updateQuery = updateQuery.slice(0, -2);

    // Add the WHERE clause to specify the item to be updated
    updateQuery += ` WHERE id = $${paramCount} RETURNING *`;
    updateParams.push(id);

    pool.query(updateQuery, updateParams)
        .then((result) => {
            if (result.rowCount === 0) {
                // If no rows were affected, return an error
                res.status(404).json({ message: 'Yarn not found' });
            } else {
                // Send relevant response data to client-side
                res.json({ message: 'Yarn updated successfully', yarn_table: result.rows[0] });
            }
        })
        .catch((error) => {
            // Handle database errors
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        });
});



 app.listen(port, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});