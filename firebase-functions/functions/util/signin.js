const express = require('express')
const bodyParser = require('body-parser')
const { functions, firebase, admin } = require('../firebase-init.js')

function signinParent(req, res) {
    var signup = {
        error: false,
    };

    if (req.body.email != "" && req.body.password != "") {

        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .then((user) => {
                admin.firestore().collection('transaction').get()
                    .then(function (data) {
                        data.forEach(doc => {
                            if (doc.parentID == firebase.auth().currentUser.uid)
                            {
                                signup.data.push(doc);
                            }
                        })
                    }).catch(function (err) {
                        signup.error = true;
                    });
            })
            .catch(function (err) {
                signup.error = { ec: err.code, msg: err.message };
            });
    }
    res.json(signup);
    res.end();
}

function signinVendor(req, res) {
    var signup = {
        error: false,
    };

    if (req.body.email != "" && req.body.password != "") {

        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .then((user) => {
                admin.firestore().collection('vendors')
                .doc(firebase.auth().currentUser.uid).get()
                    .then(function (doc) {
                        signup.error = doc
                    }).catch(function (err) {
                        signup.error = true;
                    });
            })
            .catch(function (err) {
                signup.error = { ec: err.code, msg: err.message };
            });
    }
    res.json(signup);
    res.end();
}

exports.signinParent = signinParent
exports.signinVendor = signinVendor