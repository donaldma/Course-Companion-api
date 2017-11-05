const ENV = process.env.ENV || "development";
const express = require('express');  
const app = express();
const http = require('http'); 
const server = http.createServer(app);
const cors = require('cors');
const bodyParser  = require("body-parser");
const router = express.Router();

const session = require("express-session")({
    secret: "hi my name is stan",
    resave: false,
    saveUninitialized: true
});

app.use(session);

app.use(cors());

app.set('view engine', 'ejs');

app.use('/styles', express.static('../styles/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
})

app.get('/', (req, res) => {
  res.render('index');
})

require("./routes/sms")(app);

server.listen( process.env.PORT || 9005, () => {
  console.log('Server running');
});