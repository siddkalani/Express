const asyncHandler = require("express-async-handler") //will be with async function to prevent use of try and catch
const Users = require("../models/userModal")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validateToken = require("../middleware/validateTokenHandler")


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
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Find the user by email in the database
    const user = await Users.findOne({ email });

    // If the user exists and the password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate an access token
        const accesstoken = jwt.sign(
            {
                username: user.username,
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // Send the access token in the response
        res.status(200).json({ accesstoken });
    } else {
        // If the email or password is invalid
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

//protected route , access private

const currentUsers = asyncHandler(async (req, res) => {
    res.json(req.user)
    console.log(req.user)
})


module.exports = {
    registerUsers,
    loginUsers,
    currentUsers,
}