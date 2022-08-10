// this is sub-routes or routes inside of routes
const express = require("express");
const router = express.Router();
// Import connection from db_connection.js
const con = require("../lib/dbConnection");

// Create GET '/' method to fetch all users from DB
router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM users", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

module.exports = router;