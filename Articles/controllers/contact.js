const Contact = require('../models/Contact')
const errorHandler = require('../error')

module.exports.getAll = async function (req, res){
    try {
        const contacts = await Contact.find()
        res.status(200).json(contacts)
    } catch (e) {
        console.log(e)
    }
}

module.exports.getById = async function (req, res){
    try {
        const contact = await Contact.findById(req.params.id)
        res.status(200).json(contact)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async function (req, res){
    try {
        await Contact.remove({_id: req.params.id})
        res.status(200).json({message: 'Удалено'})
    } catch (e) {
        console.log(e)
    }
}

module.exports.create = async function (req, res){
    const contact = new Contact({
        title: req.body.title,
        body: req.body.body
    })

    try {
        await contact.save()
        res.status(201).json(contact)
    } catch (e) {
        console.log(contact)
    }
}

module.exports.update = async function (req, res){
    const updated = {
        title: req.body.title,
        body: req.body.body
    }
    try {
        const contact = await Contact.findOneAndUpdate({_id: req.params.id}, {$set: updated}, {new: true})
        res.status(200).json(contact)
    } catch (e) {
        console.log(e)
    }
}
