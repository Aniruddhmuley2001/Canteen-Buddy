const express = require('express')
const bodyParser = require('body-parser')
const { functions, firebase, admin } = require('../firebase-init.js')
let db = admin.firestore()

function transaction(req, res) {
    let error="null";
    let message="null";
    firebase.auth().onAuthStateChanged(user => {
        if(user)
        {
            let newTransaction = {
                parentID : req.body.parentID,
                vendorID : user.uid,
                amount : req.body.amount,
                createdAt : new Date().toISOString,
                description : req.body.description
            }
            db.collection('transactions').add(newTransaction)
            .then(doc => {
                error = false;
                message = 'transaction created successfully!!';
            })
            .catch(err => {
                error = true;
                message = 'error ----- no';
            });
        }
        else
        {
            error = true;
            message = 'you need to signin first!!'
        }
    });
    res.json({ status: error, message: message });
    res.end();
}

exports.transaction = transaction