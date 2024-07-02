const asyncHandler = require("express-async-handler")
const Users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// post req
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    //validating input
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("enter all fields")
    }
    //checking if user exists
    const userAvaliable = await Users.findOne({ email })
    if (userAvaliable) {
        res.status(400)
        throw new Error("user already exists")
    }
    //hash password
    const hashPW = await bcrypt.hash(password, 10)
    console.log(`this is hashed pass:${hashPW}`)
    //create user
    const user = await Users.create({
        username,
        email,
        password: hashPW
    })
    console.log(`user created:${user}`)
    //respond user if created
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("invalid user data")
    }
})
// post req
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error("Enter all fields");
    }

    // Check if user exists
    const user = await Users.findOne({ email });

    // Check if password is valid
    if (user && (await bcrypt.compare(password, user.password))) {
        // Sign a token
        const token = jwt.sign(
            {
                user: {
                    username: user.username,
                    id: user._id,
                    email: user.email
                }
            },process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // Send generated access token
        res.status(200).json({ token });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})
module.exports = {
    registerUser,
    loginUser,
    currentUser
}