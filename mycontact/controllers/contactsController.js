//use for logic part of routes
const asyncHandler = require("express-async-handler") //will be instead of async function to prevent use of try and catch

const getContacts = asyncHandler( (req,res)=>{
    res.status(200)
    res.json({message:"welcome to get request"})
})

const postContacts = asyncHandler((req,res)=>{
    console.log(`here is the req body` ,req.body)
    const{name,phone,email} = req.body
    if(!name || !phone || !email){
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    res.status(201).json({title:"create contact"})
})

const deleteContacts = asyncHandler((req,res)=>{
    res.status(200)
    res.json({message:`welcome to delete request ${req.params.id}`})
})

const updateContact = asyncHandler((req,res)=>{
    res.status(200)
    res.json({message:`welcome to update request for id ${req.params.id}`})
})

module.exports = {
    getContacts,
    postContacts,
    deleteContacts,
    updateContact
}