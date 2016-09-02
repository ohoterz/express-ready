var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

//Exsample using ejs template. Thanks Chris Sevilleja for your article in scotch.io
router.get('/', function(req, res, next) {
    var drinks = [
            { name: 'Bloody Mary', drunkness: 3 },
            { name: 'Martini', drunkness: 5 },
            { name: 'Scotch', drunkness: 10 }
        ];
        var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

        res.render('pages/index', {
            drinks: drinks,
            tagline: tagline
    });
});

router.get('/about', function(req, res, next) {
    res.render('pages/about');
});
//------------------------------

//Login to get json token for accessing API section
var SECRET = "HeySecret";
router.post('/login', function (req, res, next) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'peter' && req.body.password === '1234')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'Peter',
    last_name: 'Haha',
    email: 'peter@gmail.com',
    id: 123
  };

  // We are sending the profile inside the token
  //var token = jwt.sign(profile, SECRET, { expiresIn: 18000 }); // 60*5 minutes
  var token = jwt.sign(profile, SECRET);

  res.json({ token: token });
});

module.exports = router;