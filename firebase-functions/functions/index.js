const express = require('express')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyDc6od5tCOr3L8GwJ-nzWK5SfH8S9Wxo2U",
  authDomain: "food-o-click.firebaseapp.com",
  databaseURL: "https://food-o-click.firebaseio.com",
  projectId: "food-o-click",
  storageBucket: "food-o-click.appspot.com",
  messagingSenderId: "216202521279",
  appId: "1:216202521279:web:fc692ead78d312965ff40a",
  measurementId: "G-PEHR6QTYRF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
admin.initializeApp(functions.config().firebase)

const { signupParent, signupVendor } = require('./util/signup.js')
const { signinParent, signinVendor } = require('./util/signin.js')


const app = express()
const port = 3031

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let db = admin.firestore()

app.get('/', (req, res) => {
  res.json()
  res.end()
})

app.post('/signupParent', signupParent)
app.post('/signupVendor', signupVendor)

app.post('/signinParent', signinParent)
app.post('/signinVendor', signinVendor)

app.listen(port, console.log(`listening on port ${port}`))

exports.qwertyBack = functions.https.onRequest(app);