const express = require('express')
const authRoutes = require('./routes/auth')
const ContactRoutes = require('./routes/contact')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const keys = require('./config/keys')

mongoose.connect(keys.MongoURL)
    .then(()=> console.log('MongoDb connected'))
    .catch(error => console.log(error))

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/contact', ContactRoutes)

module.exports = app
