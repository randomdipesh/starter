const router = require('express').Router()
const User = require('../models/User')
const helper = require('../helper')
const bcrypt = require('bcryptjs')
router.get("/login",(req,res)=>{
	res.render("login",{title : "Login"})
})
router.post('/login',helper.notLogged,async (req,res)=>{
	const {body} = req
	const username = helper.safe(body.username.toLowerCase())
	const password = helper.safe(body.password)
	//check if the user with that email or username is there
	const check_user = await User.findOne({$or : [{email : username},{username}]})
	if(username == "" || password == ""){
		req.flash('info',{type : 'error',msg : "Donot leave any fields empty!"})
		res.redirect('back')
	}
	else if(check_user == null){
		req.flash('info',{type : "error",msg : "The user doesn't exists"})
		res.redirect('back')
	}
	else{
		 if (!bcrypt.compareSync(password,check_user.password)){
		 	req.flash('info',{type : "error",msg : "Invalid password"})
			res.redirect('back')
		 }
		 else{
		 	req.session.username = check_user.username
		 	req.session.user = check_user
		 	res.redirect('/home')
		 }

	}

})
module.exports = router