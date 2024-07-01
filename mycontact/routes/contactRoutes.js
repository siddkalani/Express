const express = require("express")
const router = express.Router()
const {getContacts,postContacts,deleteContacts,updateContact,getContact} = require("../controllers/contactsController")
const validateToken = require("../middleware/validateTokenHandler")

//applying validateToken condition to all routes for making them private

router.use(validateToken)
router.route("/").get(getContacts).post(postContacts)
router.route("/:id").delete(deleteContacts).put(updateContact).get(getContact)

module.exports = router;