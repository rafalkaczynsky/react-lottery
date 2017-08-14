'use strict'

var express = require('express'),
 mongoose = require('mongoose'),
 bodyParser = require('body-parser'),
 User = require('./model/user'),
 Code = require('./model/code'),
 WinningCode = require('./model/winningCode'),
 Winner = require('./model/winner'),
 sg = require('sendgrid')("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")


var app = express()
var router = express.Router()


var port = process.env.REACT_APP_API_PORT || 3001

mongoose.connect('mongodb://rafalkaczynsky1985:paulinka97@ds129723.mlab.com:29723/kaplan-lottery')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*')
 res.setHeader('Access-Control-Allow-Credentials', 'true')
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 res.setHeader('Cache-Control', 'no-cache')
 next();
});

router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'})
});

router.route('/codes')

 .get(function(req, res) {

    Code.find(function(err, record) {
        if (err)
        res.send(err);
        res.json(record)
    });

 })

 router.route('/winning-codes')

 .get(function(req, res) {

    WinningCode.find({}).exec(function(err, record) {
        if (err)
        res.send(err);
        res.json(record)
    });
 })

  .post(function(req, res) {

    WinningCode.findOne({ _id: req.body._id}, function(err, doc){
        doc.claimed = true
        doc.save(function(err) {
        if (err)
            res.send(err);

        });
    });
 })

router.route('/users')

 .get(function(req, res) {

    User.find(function(err, record) {
        if (err)
        res.send(err)
        res.json(record)
    });
 })


 .post(function(req, res) {
    var user = new User()

    user.firstName = req.body.firstName
    user.surname = req.body.surname
    user.email = req.body.email
    user.dob = req.body.dob
    user.lastPlay =req.body.lastPlay
    user.postcode = req.body.postcode
    user.apprenticeship = req.body.apprenticeship
    user.consent = req.body.consent,
    user.userCode = req.body.userCode


    user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User successfully created!' });

    updateCodeDB(req.body.userCode);
 });
 });

router.route('/winners')

 .get(function(req, res) {

    Winner.find(function(err, record) {
        if (err)
        res.send(err);
        res.json(record)
    })
 })

.post(function(req, res) {
    var winner = new Winner();

    winner.user = req.body.user
    winner.winnerCode = req.body.winnerCode


    winner.save(function(err) {
    if (err)
    res.send(err);
    res.json({ message: 'Winner successfully created!' });

 });
 });

function updateCodeDB(codeUsed){
  Code.findOne({ code: codeUsed}, function(err, doc){
    console.log(doc)
      doc.used = true
      doc.save(function(err) {
      if (err)
          console.log('updated')
      });
  });
}

app.use('/api', router);
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
