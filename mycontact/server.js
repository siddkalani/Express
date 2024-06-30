const express = require("express")
const router = require("./routes/contactRoutes")
const errorHandler = require("../mycontact/middleware/errorHandler")
const app = express()
const dotenv = require("dotenv").config()
const connectDb = require("../mycontact/config/dbConnection")

connectDb()
app.use(express.json())

const port = 6001;

app.use("/api/contacts",router)
app.use(errorHandler)
app.listen(port , (req,res)=>{
    console.log(`server is running on port ${port}`)
})
