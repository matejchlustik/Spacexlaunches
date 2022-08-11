const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const authRoutes = require("./api/routes/authRoutes");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path")
const port = process.env.PORT || 8000

const app = express();

//middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5000' }))
app.use(cookieParser());

app.use(authRoutes);

//serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/build")))

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "/build", "index.html")))
} else {
    app.get("/", (req, res) => {
        res.send("Please set to production")
    })
}

//connect db, start server
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));
