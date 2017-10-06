var express = require('express');
var router = express.Router();
var mongoose   = require('mongoose');
var Bear     = require('../app/models/bear');
var Contact     = require('../app/models/contact');
var config = require('../config/database');
var User = require("../app/models/user");
var tokens = [];

var jwt = require('jsonwebtoken');
var passport = require("passport");

var middle =  function(req,res,next){
console.log(req.headers);

  passport.authenticate('jwt', function(err, user, info){
    if (err) { return next(err); }
    if (!user) { return res.status(401).send({success: false, msg: 'Unauthorized user'}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return next();
    });
  })(req, res, next);
}
router.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');
	next();
});

router.get('/' ,middle,function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/users_contact')
	
	.post(function(req, res) {
		console.log(req.body);
		var contact = new Contact();			
		contact.name = req.body.name;
		contact.company = req.body.company;
		contact.phone = req.body.phone;
		contact.email = req.body.email;
		contact.subject = req.body.subject;  
		contact.message = req.body.message;
		contact.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'user contactus Added' });
		});
	})
	 .get(middle,function(req, res) {

        Contact.find(function(err, bears) {
            console.log(bears);
            if (err)
                res.send(err);
            res.json(bears);
        });
    });
router.route('/users_subscribed')
	.post(function(req, res) {
		var bear = new Bear();		
		bear.email = req.body.email;  
		Bear.find({email : req.body.email},function(err,bears){
			if (!bears.length){
				bear.save(function(err) {
					if (err)
						res.send(err);

					res.json({ message: 'subscriber Added' });
				});
			}
			else {
				res.json({ message: 'email already existed' });
			}
		})
	})

	.get(middle,function(req, res) {
		Bear.find(function(err, bears) {
			console.log(bears);
			if (err)
				res.send(err);
			res.json(bears);
		});
	});


router.route('/users_subscribed/:bear_id')

	.get(middle,function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// .put(middle,function(req, res) {
	// 	Bear.findById(req.params.bear_id, function(err, bear) {

	// 		if (err)
	// 			res.send(err);

	// 		bear.email = req.body.email;
	// 		bear.save(function(err) {
	// 			if (err)
	// 				res.send(err);

	// 			res.json({ message: 'Bear updated!' });
	// 		});

	// 	});
	// })

	.delete(middle,function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
router.post('/signup', middle,function(req, res) {
	console.log(req);
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
	User.findOne({
	    username: req.body.username
	}, function(err, user) {
	    if (err) throw err;
	    if (!user) {
			res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
	    } else {
			
			user.comparePassword(req.body.password, function (err, isMatch) {
		        if (isMatch && !err) {
					var token = jwt.sign(user.toObject(),config.secret);
					console.log(req.user);
					res.json({success: true, token: 'JWT ' + token});
		        } else {
					res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
		        }
			});
	    }
	});
});

module.exports = router;