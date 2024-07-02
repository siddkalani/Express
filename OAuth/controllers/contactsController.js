const asyncHandler = require("express-async-handler")
const Contacts = require("../models/contactModel")
const { default: mongoose } = require("mongoose")
// get req
// @access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contacts.find()
    res.status(200).json(contacts)
})
// get req by id
// @access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
        res.status(200).json(contact)
})
// post req
// @access public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    if (!name, !email, !phone) {
        res.status(400)
        throw new Error("enter all fields")
    }
    const contact = await Contacts.create({
        name,
        email,
        phone
    })
    res.status(200).json(contact)
})
// update req
// @access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "update contacts" })
})
// delete req
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "delete contacts" })
})

module.exports = {
    getContacts,
    updateContact,
    deleteContact,
    createContact,
    getContact,
}