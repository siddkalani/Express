const getContact = (req, res) => {
    res.status(200).json({ hello: "siddharth" })
}

const addContact = (req, res) => {
    console.log(`this is the req body: ${req.body}`)
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("all fields are required")
    }
    res.status(201).json({ hello: "contact added" })
}

const deleteContact = (req, res) => {
    res.status(200).json({ hello: `contact deleted for ${req.params.id}` })
}

const updateContact = (req, res) => {
    res.status(200).json({ hello: `updated contact for ${req.params.id}` })
}

const getContactbyId = (req, res) => {
    res.status(200).json({ hello: `updated contact for ${req.params.id}` })
}

module.exports = { getContact, addContact, updateContact, deleteContact, getContactbyId }