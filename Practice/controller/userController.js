const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const bcrypt = require("bcrypt")

const CurrentUser = asyncHandler(async (req, res) => {
    const user = await User.find();
    res.status(200).json({ hello: "siddharth" })
})

const registerUser = asyncHandler(async (req, res) => {

    console.log(`this is the req body: ${req.body}`)

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required")
    }
    // check if user already exists
    const userAvaliable = await User.findOne({email});
    if (userAvaliable) {
        res.status(400);
        throw new Error("User already exists")
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(
        {
            username,
            email,
            password: hashedPassword,
        }
    )
    console.log(`if user created ${user}`)
    if (user) {
        res.status(201).json({ email: user.email, _id: user.id });
    } else {
        res.status(400)
        throw new Error("User data not")
        // res.status(201).json(user)
    }
})


const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        
    }
});


const getContactbyId = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("no contact found")
    }
    res.status(200).json(contact)
})

module.exports = { registerUser,loginUser }