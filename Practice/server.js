const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const dotenv = require("dotenv").config()
const contactRoutes = require('./routes/contactRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express()

connectDb()

app.use(express.json());
const port = process.env.PORT || 3002;

app.use('/api/contacts',contactRoutes)
app.use('/api/users',userRoutes)

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})