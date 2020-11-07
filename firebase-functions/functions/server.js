const express = require('express')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')
const admin = require('firebase-admin')

const { signupParent, signupVendor } = require('./util/signup.js')
const { signinParent, signinVendor } = require('./util/signin.js')

admin.initializeApp(functions.config().firebase)

const app = express()
const port = 3031

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hi!")
    res.end()
})

app.post('/signupParent', signupParent)
app.post('/signupVendor', signupVendor)

app.post('/signupParent', signinParent)
app.post('/signupVendor', signinVendor)

app.listen(port, console.log(`listening on port ${port}`) )

exports.qwertyBack = functions.https.onRequest(app);