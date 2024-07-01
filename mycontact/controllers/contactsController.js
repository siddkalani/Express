//use for logic part of routes
const asyncHandler = require("express-async-handler") //will be instead of async function to prevent use of try and catch
const Contacts = require("../models/contactMode")
//protected route , access private
const getContacts = asyncHandler(async (req, res) => {
    // Find contacts in the database where the user_id matches the id of the authenticated user
    const contact = await Contacts.find({ user_id: req.user.id });
    res.status(200).json(contact);
});

//protected route , access private
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id)

    if(!contact){
        res.status(400);
        throw new Error("Contact Not Found")
    } 
    res.status(200).json(contact)
})
//protected route , access private
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
        user_id: req.user.id,
    })
    res.status(201).json(contact)
})
//protected route , access private
const deleteContacts = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Not Authorized to delete other users details")
    }
    await Contacts.findByIdAndDelete(req.params.id); // Correct method to delete by ID
    res.status(200).json({ message: 'Contact deleted successfully' });
});
//protected route , access private
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id)
    if(!contact){
        res.status(400);
        throw new Error("Contact Not Found")
    } 
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Not Authorized to update other users details")
    }
    const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact)
})

module.exports = {
    getContacts,
    postContacts,
    deleteContacts,
    updateContact,
    getContact
}