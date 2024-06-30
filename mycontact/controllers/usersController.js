const asyncHandler = require("express-async-handler") //will be with async function to prevent use of try and catch
const Users = require("../models/userModal")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUsers = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    // Check if the user already exists
    const userAvailable = await Users.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash the password
    const hashedPw = await bcrypt.hash(password, 10);
    console.log(hashedPw);

    // Create the new user
    const createdUser = await Users.create({
        username,
        email,
        password: hashedPw
    });
    console.log(`user created ${createdUser}`);

    // Check if the user was created successfully and respond
    if (createdUser) {
        res.status(201).json({ _id: createdUser.id, email: createdUser.email });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const loginUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }
    const user = await Users.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign(
            {
                username: user.username,
                id: user._id,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: "1m" })
        res.status(200).json({ accesstoken })
    } else{
        res.status(401)
        throw new Error("email or password is not valid")

    }

})
    const currentUsers = asyncHandler(async (req, res) => {
        res.status(200).json({ message: "current user" })
    })


    module.exports = {
        registerUsers,
        loginUsers,
        currentUsers,
    }