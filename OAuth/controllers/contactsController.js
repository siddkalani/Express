const asyncHandler = require("express-async-handler")
const Contacts = require("../models/contactModel")

// get req
// @access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contacts.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})
// get req by id
// @access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    // If contact not found, throw an error with 404 status
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    // If contact found, respond with the contact data
    res.status(200).json(contact);
});
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
        phone,
        user_id: req.user.id
    })
    res.status(200).json(contact)
})
// update req
// @access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("Not authorized to update other user details")
    }
    const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})
// delete req
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("Not authorized to delete other user details")
    }
    await Contacts.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "contact deleted successfully" })
})
module.exports = {
    getContacts,
    updateContact,
    deleteContact,
    createContact,
    getContact,
}