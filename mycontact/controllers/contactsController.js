//use for logic part of routes
const asyncHandler = require("express-async-handler") //will be instead of async function to prevent use of try and catch
const Contacts = require("../models/contactMode")

const getContacts = asyncHandler (async (req,res)=>{
    const contact = await Contacts.find()
    res.status(200).json(contact)
})

const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id)

    if(!contact){
        res.status(400);
        throw new Error("Contact Not Found")
    } 
    res.status(200).json(contact)
})

const postContacts = asyncHandler(async(req,res)=>{
    console.log(`here is the req body` ,req.body)
    const{name,phone,email} = req.body
    if(!name || !phone || !email){
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const contact = await Contacts.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact)
})

const deleteContacts = asyncHandler(async(req,res)=>{
    res.status(200)
    res.json({message:`welcome to delete request ${req.params.id}`})
})

const updateContact = asyncHandler(async(req,res)=>{
    res.status(200)
    res.json({message:`welcome to update request for id ${req.params.id}`})
})

module.exports = {
    getContacts,
    postContacts,
    deleteContacts,
    updateContact,
    getContact
}