// // importing express for setting server
// const express = require("express")
// const app = express()

// const port = 3001;

// //routing for starting on web
// app.get("/",(req,res)=>{
//     res.json({message:"Home page"})
// })

// app.get("/users/",(req,res)=>{
//     res.json({message:"This is users page by get"})
// })
// //req.params.id for directly extracting
// app.get("/users/:id",(req,res)=>{
//     res.json({message:`This is users page with specific id ${req.params.id}`})
// })
// app.post("/users/",(req,res)=>{
//     res.json({message:"create new user"})
// })
// app.delete("/users/:id",(req,res)=>{
//     res.json({message:`delete user using id ${req.params.id}`})
// })

// app.listen(port , ()=>{
//     console.log(`Server is running on port ${port}`)
// })


// 2) learning middleware
// Importing express for setting server
const express = require("express");
const app = express();
const router = express.Router();

const port = 5001;

//built in middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))
// Application level middleware
const loggerMiddleWare = (req, res, next) => {
    console.log(`${new Date()} -- request [${req.method} ${req.url}]`);
    next();
};
app.use(loggerMiddleWare);
// Use the router level middleware
app.use("/api/users", router);
// Fake auth middleware
const fakeAuth = (req, res, next) => {
    const authStatus = true;
    if (authStatus) {
        console.log("authentication status: ", authStatus);
        next(); // Pass control to the next middleware/route handler
    } else {
        res.status(401);
        throw new Error("User is not authenticated");
    }
};


// Define routes
router.get('/', (req, res) => {
    res.send('Hello from the home route!');
});

router.post('/', (req, res) => {
    console.log("this is the request body recieved from client" , req.body)
    res.send('Hello from the post home route!');
});

const getUsers = (req, res) => {
    res.json({ message: "get req here" });
};
router.get('/home', getUsers);
router.use(fakeAuth);


// Error handler middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode)
    switch (statusCode) {
        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message
            });
            break;
        case 404:
            res.json({
                title: "Not Found",
                message: err.message
            });
            break;
        case 500:
            res.json({
                title: "Server Error",
                message: err.message
            });
            break;
        default:
            res.status(500).json({
                title: "Unknown Error",
                message: err.message
            });
            break;
    }
};

// Use error handler middleware (this should be the last middleware)

app.all("*",(req , res)=>{
    res.status("404 not found");
    throw new Error("route not found")
})

//third party middle ware
// morgan mutler etc

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
