const express = require("express")
const router = express.Router()
const {getContacts,postContacts,deleteContacts,updateContact,getContact} = require("../controllers/contactsController")

router.route("/").get(getContacts).post(postContacts)

router.route("/:id").delete(deleteContacts).put(updateContact).get(getContact)

module.exports = router;