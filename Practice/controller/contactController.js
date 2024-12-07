const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json({ hello: "siddharth" })
})

const addContact = asyncHandler(async (req, res) => {

    console.log(`this is the req body: ${req.body}`)

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required")

    }
    const contact = await Contact.create(
        {
            name,
            email,
            phone
        }
    )
    res.status(201).json(contact)
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("No contact found");
    }
    // Delete the specific contact
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ hello: `contact deleted for ${req.params.id}` })
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("No contact found");
    }

    // Use `findByIdAndUpdate` with correct casing
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } // Options to return the updated document and validate input
    );

    res.status(200).json(updatedContact);
});


const getContactbyId = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("no contact found")
    }
    res.status(200).json(contact)
})

module.exports = { getContact, addContact, updateContact, deleteContact, getContactbyId }