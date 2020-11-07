const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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
firebase.initializeApp(firebaseConfig);
db = admin.firestore();

////////////////////////////////////////////////////
/*
const express = require('express')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()
admin.initializeApp();
//const { signupParent, signupVendor } = require('./util/signup.js')
//const { signinParent, signinVendor } = require('./util/signin.js')
//const { FBApp } = require('./firebase-init.js')
const firebase = require('firebase');

var firebaseConfig = {
    
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
admin.initializeApp();*/

//const app = express()
const port = 3031

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/parents', (req, res) => {
    db.collection('parents').get()
    .then((data) => {
        let parents = [];
        data.forEach((doc) => {
            parents.push({
                id : doc.id,
                parentName : doc.data().parentName
            });
        });
        console.log(parents)
        return res.json(parents);
     })
     .catch(err => console.error(err));
});

//app.post('/signupParent', signupParent)
//app.post('/signupVendor', signupVendor)

//app.post('/signupParent', signinParent)
//app.post('/signupVendor', signinVendor)

app.listen(port, console.log(`listening on port ${port}`) )

exports.qwertyBack = functions.https.onRequest(app);