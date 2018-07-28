const express = require("express")
const app = express()
var port = process.env.PORT || 3000
const bparser = require('body-parser')
app.use(bparser.urlencoded({extended : false}))
const session = require('express-session')
app.use(session({
	secret : "3927iIUERYH384973YT8w8&(@*yhe",
	saveUninitialized : false,
	resave : false	
}))
const flash = require('express-flash')
app.use(flash())
//global flash message as info
app.use((req,res,next)=>{
	res.locals.info = req.flash('next')
	next()
})
//use public for static files storage dir
app.use(express.static('public'))
//use ejs as view engine
app.set('view engine','ejs')
//connect to database
require("./models/connection")


//using all routes at once
var normalizedPath = require("path").join(__dirname, "controllers");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
 app.use(require('./controllers/'+file));
});


app.listen(port,(err)=>{
	if(err){
		console.log(err)
	}
	else{
		console.log("App up and running at port ",port)
	}
})