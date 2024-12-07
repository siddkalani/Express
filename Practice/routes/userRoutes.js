const express = require('express')
const router = express.Router()
const {registerUser} = require('../controller/userController')


router.route('/register').post(registerUser)

router.route('/login').post((req, res) => {
    res.status(200).json({ message: 'Registration' })
})
router.route('/current').get((req, res) => {
    res.status(200).json({ message: 'Registration' })
})


module.exports = router