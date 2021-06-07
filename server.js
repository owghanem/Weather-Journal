// setup variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3020;

// apps
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// project files
app.use(express.static('Website'));

// Server
app.listen(port, () => {
    console.log("Server is working einwandfrei on " + port);
})
