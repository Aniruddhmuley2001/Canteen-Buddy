const express = require('express')
const bodyParser = require('body-parser')
const { functions, firebase, admin } = require('../firebase-init.js')

function signinParent(req, res) {
    var signin = {
        error: false,
    };

    if (req.body.email != "" && req.body.password != "") {

        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .then(() => {
                signin.user = firebase.auth().currentUser != null ? true : false;
                return admin.firestore().collection('parents').get();
            })
            .then((docs) => {
                docs.forEach(doc => {
                    if (doc.data().email == firebase.auth().currentUser.email) {
                        signin.details = doc.data();
                    }
                });
                res.json(signin);
                res.end();
            })
            .catch(function (err) {
                signin.error = { ec: err.code, msg: err.message };
                res.json(signin);
                res.end();
            });
    }
}

function signinVendor(req, res) {
    var signin = {
        error: false,
    };

    if (req.body.email != "" && req.body.password != "") {

        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .then(() => {
                signin.user = firebase.auth().currentUser != null ? true : false;
                return admin.firestore().collection('vendors').get();
            })
            .then((docs) => {
                docs.forEach(doc => {
                    if (doc.data().email == firebase.auth().currentUser.email) {
                        signin.details = doc.data();
                    }
                });
                res.json(signin);
                res.end();
            })
            .catch(function (err) {
                signin.error = { ec: err.code, msg: err.message };
                res.json(signin);
                res.end();
            });
    }
}

exports.signinParent = signinParent
exports.signinVendor = signinVendor