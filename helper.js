const sanitizer = require('sanitizer')
var mongoClean = require('mongo-sanitize');
exports.isLogged = (req,res,next)=>{
	if(req.session.username){
		res.locals.username = req.session.username
		res.locals.user = req.session.user
		next()
	}
	else{
		req.flash('info',{type : 'error',msg : 'You must be logged in to continue'})
		res.redirect("/login")
	}
}

exports.notLogged = (req,res,next)=>{
	if(req.session.username){
		res.redirect('/home')
	}
	else{
		next()
	}
}

exports.safe = (unsafe)=>{
	let safer = mongoClean(sanitizer.escape(sanitizer.sanitize(unsafe)))
	return safer
}