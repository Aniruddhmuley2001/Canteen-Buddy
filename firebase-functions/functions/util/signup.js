const express = require('express')
const bodyParser = require('body-parser')
const { functions, firebase, admin } = require('../firebase-init.js');

function signout(req, res) {
    var signout = {
        error: false,
    };

    firebase.auth().signOut()
        .then(() => {
            signin.user = firebase.auth().currentUser != null ? true : false;
            res.json(signout);
            res.end();
        })
        .catch(err => {
            error = true;
            res.json(signout);
            res.end();
        });
}

function signupParent(req, res) {
    let signup = {
        error: false,
    };

    if (req.body.email != "" && req.body.password != "" && req.body.password == req.body.confirmPassword) {

        firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
            .then(function (user) {
                let newParent = {
                    parentName: req.body.parentName,
                    childName: req.body.childName,
                    mobileNumber: req.body.mobileNumber,
                    email: req.body.email,
                };
                if (firebase.auth().currentUser != null) {
                    admin.firestore().collection('parents').add(newParent)
                        .then(() => {
                            signin.user = firebase.auth().currentUser != null ? true : false;
                            res.json(signup);
                            res.end();
                        })
                        .catch(function (err) {
                            console.log("Hello");
                            signup.error = true;
                            res.json(signup);
                            res.end();
                        });
                }
            })
            .catch(function (err) {
                signup.error = { ec: err.code, msg: err.message };
                res.json(signup);
                res.end();
            });
    }
}

function signupVendor(req, res) {
    var signup = {
        error: false,
    };

    if (req.body.email != "" && req.body.password != "" && req.body.password == req.body.confirmPassword) {

        firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
            .then((user) => {
                let newVendor = {
                    vendorName: req.body.vendorName,
                    mobileNumber: req.body.mobileNumber,
                    email: req.body.email,
                };
                return admin.firestore().collection('vendors').add(newVendor);
            })
            .then(function (user) {
                signup.error = false;
                signin.user = firebase.auth().currentUser != null ? true : false;
                res.json(signup);
                res.end();                
            })
            .catch(function (err) {
                signup.error = { ec: err.code, msg: err.message };
                res.json(signup);
                res.end();
            });
    }
}

exports.signout = signout
exports.signupParent = signupParent
exports.signupVendor = signupVendor

// {
//     "vendorName": "Developer",
//     "mobileNumber" : "9328661966",
//     "email" : "qwerty.dev2020@gmail.com",
//     "password": "justdoit",
//     "confirmPassword": "justdoit"
// }

// {
//     "parentName": "Developer",
//     "childName": "Dev",
//     "mobileNumber" : "9328661966",
//     "email" : "qwerty.dev2020@gmail.com",
//     "password": "justdoit",
//     "confirmPassword": "justdoit"
// }

// {
//     "parentID": "87pLOCbhmsR3TYe14hm4wKCxYN23",
//     "amount" : "93286",
//     "description" : "qwerty.dev"
// }