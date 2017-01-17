const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const session = require ("express-session");
const bcrypt = require('bcrypt');


var fetch = require('node-fetch');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/public/views');
app.use("/", express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'theTruthIsOutThere51',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


var db = pgp(process.env.DATABASE_URL || 'postgres://danielletwaalfhoven@localhost:3000');

app.listen(PORT, function() {
  console.log('Node app is running on', PORT);
});

//WORKS!
app.get("/", function(req, res){
  var logged_in;
  var email;
  var id;

  if(req.session.user){
    logged_in = true;
    email = req.session.user.email;
    id = req.session.user.id;
  }

  var user = {
    "logged_in": logged_in,
    "email": email,
    "id": id
  }

  res.render('sign-up/signin');
});



//SIGN UP - WORKS!
app.post('/signup', function(req, res){
  var data = req.body;

  bcrypt.hash(data.password, 10, function(err, hash){
    db.one(
      "INSERT INTO users (email, password_digest) VALUES ($1, $2) returning *",
      [data.email, hash]
    ).then(function(user){
      req.session.user = user;
      res.render('index')
    })
  });
})

//SIGN IN - WORKS!
app.post('/signin', function(req, res){
  var data = req.body;

  db.one("SELECT * FROM users WHERE email = $1",[data.email])
  .catch(function(){
    res.send('Email/Password not found.')
  }).then(function(user){
    bcrypt.compare(data.password, user.password_digest, function(err, cmp){
      if(cmp){
        req.session.user = user;
        res.render('index')
      } else {
        res.send('Email/Password not found.')
      }
    });
  });
});


