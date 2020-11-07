const express = require('express')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp();
require('../firebase-init')

/*function signupParent(req, res) {
    let newParent = {
        parentName : req.body.parentName,
        mobileNumber : req.body.mobileNumber,
        email : req.body.email,
        childName : req.body.childName,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword
    };
    let newParentCollection = {
        parentName : req.body.parentName,
        mobileNumber : req.body.mobileNumber,
        email : req.body.email,
        childName : req.body.childName,
    };
    firebase.auth().createUserWithEmailAndPassword(newParent.email,newParent.password)
    .then(data => {
        db.collection('parents').add(newParentCollection)
        .then(doc => {
            res.json(`document craeted : ${doc.id}`);
        }).catch(err => {
            res.json('something went wrong!!');
        });
        return res.status(400).json({ status : true, message : 'user created successfully!!'});
    })
    .catch(err => {
        return res.status(500).json({ error : err});
    });
}*/

function signupVendor(req, res) {
    let newVendor = {
        vendorName : req.body.vendorName,
        email : req.body.email,
        mobileNumber : req.body.mobileNumber
    }
    admin.firestore().collection('vendors').add(newVendor)
    .then(doc => {
        res.status(400).json(`User ${doc.id} : ${doc.vendorName} creadted successfully!!`);
    })
    .catch(err => {
        res.status(500).json(`Something went wrong!!`);
    })
}

//exports.signupParent = signupParent
exports.signupVendor = signupVendor