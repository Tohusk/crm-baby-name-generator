// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

// packages
require('dotenv').config()
const express = require("express");
const cors = require("cors");

//create express app
const app = express();

const db = require("./app/models");

// set up middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/contact.routes')(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "UwU." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// connect to mongoDB
db.mongoose
    .connect(process.env.MONGODB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        // initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });