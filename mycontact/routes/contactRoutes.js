const express = require("express")
const router = express.Router()
const {getContacts,postContacts,deleteContacts,updateContact} = require("../controllers/contactsController")

router.route("/").get(getContacts).post(postContacts)

router.route("/:id").delete(deleteContacts).put(updateContact)

module.exports = router;