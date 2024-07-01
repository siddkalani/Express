const express = require("express")
const router = express.Router()
const validateToken = require("../middleware/validateTokenHandler")
const {registerUsers,loginUsers,currentUsers} = require("../controllers/usersController")

router.route("/register").post(registerUsers)
router.route("/login").post(loginUsers)
router.get("/current",validateToken, currentUsers)


module.exports = router;