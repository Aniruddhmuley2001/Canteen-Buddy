const express = require('express')
const bodyParser = require('body-parser')
const { functions, firebase, admin } = require('../firebase-init.js')

let db = admin.firestore()

function signupParent(req, res) {
    res.end()
}

function signupVendor(req, res) {
    let error="null";
    let message="null";

    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then(data => {
            let newVendor = {
                vendorName: req.body.vendorName,
                mobileNumber: req.body.mobileNumber,
                email: req.body.email,
            };
            db.collection('parents').add(newVendor).
                then(doc => {
                    err = false;
                    message = 'user created successfully!!';
                }).catch(err => {
                    err = true;
                    message = 'error ----- no';
                });
        })
        .catch(err => {
            err = true;
            message = "auth error";
        });
    res.json({ status: error, message: message });
    res.end();
}

exports.signupParent = signupParent
exports.signupVendor = signupVendor

// {
//     "vendorName": "Developer",
//     "mobileNumber" : "9328661966",
//     "email" : "qwerty.dev2020@gmail.com",
//     "password": "justdoit"
// }