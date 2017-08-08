//server.js
'use strict'
//first we import our dependencies…
var express = require('express'),
 mongoose = require('mongoose'),
 bodyParser = require('body-parser'),
 User = require('./model/user'),
 Code = require('./model/code'),
 WinningCode = require('./model/winningCode'),
 Winner = require('./model/winner'),
 sg = require('sendgrid')("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")

//and create our instances
var app = express()
var router = express.Router()

//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.REACT_APP_API_PORT || 3001
//db config
mongoose.connect('mongodb://rafalkaczynsky1985:paulinka97@ds129723.mlab.com:29723/kaplan-lottery')
//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*')
 res.setHeader('Access-Control-Allow-Credentials', 'true')
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache')
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'})
});


//==============================================
//adding the /users route to our /api router
router.route('/codes')

 //retrieve all records from the database
 .get(function(req, res) {
    //looks at our Comment Schema
    Code.find(function(err, record) {
        if (err)
        res.send(err);
        //responds with a json object of our database record.
        res.json(record)
    });

 })


 router.route('/winning-codes')
 //retrieve all records from the database
 .get(function(req, res) {
    //looks at our Comment Schemavar doc = parent.children.id(_id);

    WinningCode.find({}).exec(function(err, record) {
        if (err)
        res.send(err);
        //responds with a json object of our database record.
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

//==============================================
//adding the /users route to our /api router
router.route('/users')

 //retrieve all records from the database
 .get(function(req, res) {
    //looks at our Comment Schema
    User.find(function(err, record) {
        if (err)
        res.send(err)
        //responds with a json object of our database record.
        res.json(record)
    });
 })

 //post new user to the database
 .post(function(req, res) {
    var user = new User()
    //body parser lets us use the req.body
    user.firstName = req.body.firstName
    user.surname = req.body.surname
    user.email = req.body.email
    user.age = req.body.age
    user.postcode = req.body.postcode
    user.userCode = req.body.userCode

    user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User successfully created!' });

    sendUserEmail(req);
    updateCodeDB(req.body.userCode);
 });
 });

 // ===== Winners======
router.route('/winners')
//  //retrieve all records from the database
 .get(function(req, res) {

    Winner.find(function(err, record) {
        if (err)
        res.send(err);
        //responds with a json object of our database record.
        res.json(record)
    })
 })

.post(function(req, res) {

    var winner = new Winner();

    winner.user = req.body.user
    winner.winnerCode = req.body.winnerCode

    //body parser lets us use the req.body
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
//===================================
function sendUserEmail(req) {
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: req.body.email
            }
          ],
          bcc: [
            {
              email: 'admin@mediacabin.co.uk'
            }
          ],
          subject: 'New Kaplan User',
          "substitutions": {
            ":name":  req.body.firstName,
            ":code":  req.body.userCode,
          },
        }
      ],
      from: {
        email: 'kaplan@mediacabin.co.uk'
      },
      template_id: "4b5c53fa-fe82-474c-8f33-86172545163d",

    }
  });

  sg.API(request, function (error, response) {
    if (error) {
      console.log('Error response received')
    }
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  });
}



//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
