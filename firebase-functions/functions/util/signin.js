const express = require('express')
const bodyParser = require('body-parser')
const { functions, firebase, admin } = require('../firebase-init.js')

function signinParent(req, res) {
    var signin = {
        error: false,
    };

    if (req.body.email != "" && req.body.password != "") {

        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .catch(function (err) {
                signin.error = { ec: err.code, msg: err.message };
            });
    }
    signin.user = firebase.auth().currentUser;
    res.json(signin);
    res.end();
}

function signinVendor(req, res) {
    var signin = {
        error: false,
    };

    if (req.body.email != "" && req.body.password != "") {

        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .catch(function (err) {
                signin.error = { ec: err.code, msg: err.message };
            });
    }
    signin.user = firebase.auth().currentUser;
    res.json(signin);
    res.end();
}

exports.signinParent = signinParent
exports.signinVendor = signinVendor