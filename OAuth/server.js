const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config()
const connectDb = require("./config/dbConnection")

connectDb()
const port = process.env.PORT || 2001;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/contacts", require("../OAuth/routes/contactRoutes"))
app.use(errorHandler);
app.listen(port, (req, res) => {
    console.log("server is connected to port:", port)
})