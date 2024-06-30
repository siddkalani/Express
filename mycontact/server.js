const express = require("express")
const errorHandler = require("../mycontact/middleware/errorHandler")
const app = express()
const dotenv = require("dotenv").config()
const connectDb = require("../mycontact/config/dbConnection")

connectDb();
app.use(express.json())

const port = 6001;
console.log(process.env.PORT)
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(port , (req,res)=>{
    console.log(`server is running on port ${port}`)
})
