const express = require("express")
const router = express.Router()
const {registerUsers,loginUsers,currentUsers} = require("../controllers/usersController")

router.route("/register").post(registerUsers)
router.route("/login").post(loginUsers)
router.route("/current").get(currentUsers)


module.exports = router;