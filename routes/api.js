//All request here must set header following this example 
//Content-Type: application/json and
//authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiUGV0ZXIiLCJsYXN0X25hbWUiOiJIYWhhIiwiZW1haWwiOiJwZXRlckBnbWFpbC5jb20iLCJpZCI6MTIzLCJpYXQiOjE0NzI3OTc5MjR9.E4TbVPFqY1BxV2tjOJAcRoKUdBiw1tIK4yvfMP-5kLw

//Authorization Key is JSON token that you've got from login response

var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var handler_sample = require('../db_handler/handler_sample');

var SECRET = "HeySecret"; //Change this to your own secret. Its must match secret key when login

/* GET api listing. */
router.get('/', expressJwt({secret: SECRET}), function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', expressJwt({secret: SECRET}), function(req, res, next) {
  res.send('test response');
});

//Work with database and json
router.get('/getUser', expressJwt({secret: SECRET}), function(req, res, next) {
    handler_sample.get_user(req,res);
});

router.post('/getUserById', expressJwt({secret: SECRET}), function(req, res, next) {
    //You need to send Post request with json like this -> { "iduser" : "1" }
    handler_sample.get_user_byid(req,res);
});
//------------------------------

//handler errer invalid token
router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

module.exports = router;