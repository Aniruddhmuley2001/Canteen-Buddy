const express = require('express')
const bodyParser = require('body-parser')

const { functions, firebase, admin } = require('./firebase-init.js')
const { signupParent, signupVendor } = require('./util/signup.js')
const { transaction } = require('./util/transaction.js')
const { signinParent, signinVendor } = require('./util/signin.js')
const { myTransactions } = require('./util/myTransactions')


const app = express()
const port = 3031

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let db = admin.firestore()

app.post('/login', (req, res) => {
  let error = "null";
  firebase.auth().createUserWithEmailAndPassword('qwerty.dev2020@gmail.com', 'qwertDev2020')
    .catch(err => error=err);
  res.json({result: error});
  res.end();
});

app.post('/signupParent', signupParent)
app.post('/signupVendor', signupVendor)

app.post('/signinParent', signinParent)
app.post('/signinVendor', signinVendor)

app.post('/transaction', transaction)
app.get('/myTransactions', myTransactions)

app.listen( console.log(`listening...`))

exports.qwertyBack = functions.https.onRequest(app);