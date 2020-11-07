const express = require('express')
const bodyParser = require('body-parser')
const { functions, firebase, admin } = require('../firebase-init.js')

function signupParent(req, res) {
    res.end()
}

function signupVendor(req, res) {
    var signup = {
        error: false, 
        message: "null"
    };

    if (req.body.password !== req.body.conformPassword) {

        firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
            .then(async (user) => {
                let newVendor = {
                    vendorName: req.body.vendorName,
                    mobileNumber: req.body.mobileNumber,
                    email: req.body.email,
                };
                await admin.firestore().collection('vendors').add(newVendor)
                    .then(function (doc) {
                        signup.error = false;
                        signup.message = 'user created successfully!!';
                    }).catch(function (err) {
                        signup.error = true;
                        signup.message = 'error ----- no';
                    });
            })
            .catch(function (err) {
                signup.error = true;
                signup.message = "auth error";
            });
    }
    res.json(signup);
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