const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./firebase-init')

db = admin.firestore();
const port = 3031
const signupVendor = require('./util/signup')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/parents', (req, res) => {
    db.collection('parents').get()
    .then((data) => {
        let parents = [];
        data.forEach((doc) => {
            parents.push({
                id : doc.id,
                parentName : doc.data().parentName
            });
        });
        console.log(parents)
        return res.json(parents);
     })
     .catch(err => console.error(err));
});

//app.post('/signupParent', signupParent)
app.post('/signupVendor', signupVendor)

//app.post('/signupParent', signinParent)
//app.post('/signupVendor', signinVendor)

app.listen(port, console.log(`listening on port ${port}`) )

exports.qwertyBack = functions.https.onRequest(app);