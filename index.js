const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally
const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors

// This is where we check URLs and Request methods to create functionality
app.get("/", (req, res) => {
    res.json({ msg: "Welcome" });
});

// app listening for API calls
app.listen(app.get("port"), () => {
    console.log(`Listening for calls on port ${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
});