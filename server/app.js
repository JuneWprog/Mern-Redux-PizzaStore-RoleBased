const express = require('express');
const indexRouter = require("./routes/indexRouter");
const dishRouter = require("./routes/dishRouter");
const menuRouter = require("./routes/menuRouter");
const orderRouter = require("./routes/orderRouter");
const db = require("./db");
require('dotenv').config();
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public/build"));
app.use(express.static(__dirname + "/public/images"));

app.use("/api/", indexRouter);
app.use("/api/dishes", dishRouter);
app.use("/api/menus", menuRouter);
app.use("/api/orders", orderRouter);

app.get('*', (req, res) => res.sendFile(path.resolve("public/build", 'index.html')));

// Handle 404
app.use(function (req, res) {
    res.sendStatus(404);
});

let port = process.env.PORT || 5000;

db.connectDB()
    .then(
        app.listen(port, function () {
            console.log(`App listening on port ${port}!`)
        })
    ).catch(err => {
        console.log(err);
    });