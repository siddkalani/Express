const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const app = express()

app.use(express.json());
const port = 3002;

app.use('/api/contacts',require("./routes/contactRoutes"))
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})