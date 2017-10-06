var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var cors = require("cors");
var config = require('./config/database');
var User = require("./app/models/user");
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; 
var mongoose   = require('mongoose');
mongoose.connect(config.database); 

var router = express.Router();


var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = config.secret;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  User.findOne({id: jwt_payload.id}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          done(null, user);
      } else {
          done(null, false);
      }
  });
});
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(strategy);
app.use(passport.initialize());

router.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
var sub = require('./routes/routes.js');
app.use('/api',sub);

app.get('/', function(req, res) {
  res.send('Page under construction.');
}); 

app.listen(port);
console.log('Magic happens on port ' + port);