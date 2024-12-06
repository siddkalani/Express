const express = require('express')
const router = express.Router()
const { getContact, addContact, updateContact, deleteContact, getContactbyId } = require('../controller/contactController')

router.route('/').get(getContact).post(addContact)
router.route('/:id').put(updateContact).delete(deleteContact).get(getContactbyId)


module.exports = router