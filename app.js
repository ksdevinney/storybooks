const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// load config
dotenv.config({ path: './config.env.test' });

// passport config
require('./config/passport')(passport);

connectDB();

const app = express();

// logging in
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
};

// handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// session middleware
app.use(
    session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
    // cookie: { secure:true }
    })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));