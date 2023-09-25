var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressEjsLayouts = require('express-ejs-layouts');
var AdminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
const dotenv=require('dotenv');
const { default: mongoose } = require('mongoose');
const { error } = require('console');
const session = require('express-session');
var app = express();
dotenv.config()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(expressEjsLayouts)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({resave:false,saveUninitialized: true,secret:"key",cookie:{maxAge:6000000}}))
app.use('/admin', AdminRouter);
app.use('/', usersRouter);


//database connection 
mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("Database connected");
}).catch((err)=>{
  console.log(`database connection error${err}`);
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = app;
