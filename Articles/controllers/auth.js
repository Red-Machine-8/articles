const User = require('../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const bcrypt = require('bcrypt')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (req.body.password === candidate.password) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: token
            })
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })
        }
    } else {
        res.status(404).json({
            message: 'Пользователь с таким email не найден'
        })
    }
}

module.exports.register = async function(req, res){
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save().then(() => console.log('User created'))
}


