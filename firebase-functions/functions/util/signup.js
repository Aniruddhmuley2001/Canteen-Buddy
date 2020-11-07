const { admin } = require('firebase-admin/lib/credential');
const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const firebase = require('firebase')
const db = admin.firestore()
var firebaseConfig = {
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
admin.initializeApp(functions.config().firebase);

function signupParent(req, res) {
    let newParent = {
        parentName : req.body.parentName,
        mobileNumber : req.body.mobileNumber,
        email : req.body.email,
        childName : req.body.childName,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword
    };
    firebase.auth().createUserWithEmailAndPassword(newParent.email,newParent.password)
    .then(data => {
        db.collection('parents').add(newParent).
        then(doc => {
            res.json(`document craeted : ${doc.id}`);
        }).catch(err => {
            res.json('something went wrong!!');
        });
        return res.status(400).json({ status : true, message : 'user created successfully!!'});
    })
    .catch(err => {
        return res.status(500).json({ error : err});
    });
}

function signupVendor(req, res) {
    res.end()
}

exports.signupParent = signupParent
exports.signupVendor = signupVendor