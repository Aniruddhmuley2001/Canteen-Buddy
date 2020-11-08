const express = require('express')
const bodyParser = require('body-parser')
const { functions, firebase, admin } = require('../firebase-init.js')
let db = admin.firestore()

function myTransactions(req, res) {
    let error="null";
    let message="null"
    firebase.auth().onAuthStateChanged(user => {
        if(user)
        {
            db.collection('transactions').get()
            .orderBy('postedAt','desc')
            .get()
            .then((data) => {
                let myTransactions = []
                let total = 0
                data.forEach((doc) => {
                    if(doc.data().parentID == user.uid || doc.data().vendorID == user.uid)
                    {
                        total = total + doc.amount;
                        myTransactions.push(doc);
                    }
                });
            })
            .catch(err => console.error(err));  
        }
        else
        {
            error = true;
            message = 'you need to signin first!!'
        }
    });
    res.json({ status: error, message: message, user : firebase.auth().currentUser });
    res.end();
}

exports.myTransactions = myTransactions