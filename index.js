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
