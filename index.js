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


var db = pgp(process.env.DATABASE_URL || 'postgres://danielletwaalfhoven@localhost:3000/project4');

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

  res.render('index');
  // res.render('sign-up/signin');
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

//EMAIL DATA - WORKS!
app.post('/contact', function(req, res){
  console.log(req.body.name);
    db.one("INSERT INTO emails(name, email, message) values($1, $2, $3) returning message", [req.body.name, req.body.email, req.body.message])
   .then(function(data){
     console.log(data.id);
     res.render("contactSent",{message: data.message});
   })
   .catch(function(error){
     console.log("Error, User could not be made", error.message || error);
   });
});


// //SAVED DATA - WORKS!
// app.post('/save', function(req, res){
//     var user_id = req.session.user.id;
//     var name = req.body.name;
//     console.log(req.body.name);

//     db.none("INSERT INTO saved(name, user_id) values($1, $2)", [name, user_id])
//    .then(function(data){
//      console.log('saved');
//    })
// });


// //DISPLAY DATA - WORKS!
// app.get('/saved', function(req, res){
//   console.log('/saved')
//   db.any("SELECT * FROM saved WHERE user_id = $1", [req.session.user.id])
//   .then(function(data){
//     console.log(data)
//     var data = {data:data}
//     res.render('saved', data);
//   });
// });

// // DELETE ITEM FROM SAVED TABLE
// app.delete('/delete/:id', function(req,res) {
//   // console.log(req.params)
//   // db.none("DELETE FROM saved WHERE id = $1", [req.params.id])
//   id = req.params.id
//   db.none("DELETE FROM saved WHERE id = $1", [id])
//   console.log('yay')

//   res.render('saved')
// })


// ENGLISH RENDERING//
app.get('/sign-up/signin', function(req, res){
  res.render('sign-up/signin')
})
app.get('/sign-up/signup', function(req, res){
  res.render('sign-up/signup')
})
app.get('/apartments', function(req, res){
  res.render('apartments')
})
app.get('/contact', function(req, res){
  res.render('contact')
})
app.get('/contactSent', function(req, res){
  res.render('contactSent')
})
app.get('/crime', function(req, res){
  res.render('crime')
})
app.get('/events', function(req, res){
  res.render('events')
})
app.get('/index', function(req, res){
  res.render('index')
})
app.get('/neighborhoods', function(req, res){
  res.render('neighborhoods')
})
app.get('/subway', function(req, res){
  res.render('subway')
})


// DUTCH RENDERING//
app.get('/sign-up/aanmelden', function(req, res){
  res.render('sign-up/aanmelden')
})
app.get('/sign-up/inschrijven', function(req, res){
  res.render('sign-up/inschrijven')
})
app.get('/appartementen', function(req, res){
  res.render('appartementen')
})
app.get('/contact2', function(req, res){
  res.render('contact2')
})
app.get('/contactVerstuurd', function(req, res){
  res.render('contactVerstuurd')
})
app.get('/criminaliteit', function(req, res){
  res.render('criminaliteit')
})
app.get('/evenementen', function(req, res){
  res.render('evenementen')
})
app.get('/index2', function(req, res){
  res.render('index2')
})
app.get('/buurten', function(req, res){
  res.render('buurten')
})
app.get('/metro', function(req, res){
  res.render('metro')
})


