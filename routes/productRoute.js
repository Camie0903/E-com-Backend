// this is sub-routes or routes inside of routes
const express = require("express");
const router = express.Router();
// Import connection from db_connection.js
const con = require("../lib/dbConnection");
const bcrypt = require('bcryptjs');
// in order to accept middleware
const jwt = require('jsonwebtoken');
// attach middleware
const middleware = require("../middleware/auth");

// Create GET '/' method to fetch all products from DB
router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM products", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
      
    }
});

// add new product function
router.post("/", middleware, (req, res) => {

    const user = {
      sku: req.body.sku,
      name: req.body.name,
      price: req.body.price,
      weight: req.body.weight,
      descriptions: req.body.descriptions,
      thumbnail: req.body.thumbnail,
      image: req.body.image,
      category: req.body.category,
      create_date: req.body.create_date,
      stock: req.body.stock,
    };
    try {
      let sql = `insert into products SET ?`;
      con.query(sql, user, (err, result) => {
        if (err) throw err.message;
        res.send(result);
      });
    } catch (error) {
      console.log(error.message);
    }
  
});


// update function
router.patch("/:id", (req, res) => {
    const {
        name,
        price,
        weight,
        descriptions,
        thumbnail,
        image,
        category,
        create_date,
        stock
        } = req.body;
    try {
      con.query(
        `update product set name = "${name}", price = "${price}", weight = "${weight}", descriptions = "${descriptions}", thumbnail = "${thumbnail}", image = "${image}", category = "${category}", create_date = "${create_date}", stock = "${stock}" where product = "${req.params.id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

//   delete function
router.delete("/:id", (req, res) => {
    try {
      con.query(
        `delete from product where product_id = ${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });


module.exports = router;