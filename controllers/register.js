const router = require('express').Router()
const User = require("../models/User")
const bcrypt = require('bcryptjs')
const helper = require('../helper')
router.get("/register",(req,res)=>{
	res.render("register",{title : "Register"})
})

router.post('/register',async (req,res)=>{
	const {body} = req
	const username = helper.safe(body.username.toLowerCase())
	const password = helper.safe(body.password)
	const email = helper.safe(body.email.toLowerCase())
	var {type} = helper.safe(body.type) 
	if(type == "student"){
		type = "student"
	}
	else{
		type = "organizer"
	}
	//check if username is taken already
	const check_username = await User.findOne({username})
	//check if email is taken
	const check_email = await User.findOne({email})
	//email validation
	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	function validateUsername(username){
		var re = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/
		return re.test(username)
	}	

	if(username == "" || password == "" || email == ""){
		req.flash('info',{type : "error",msg : "Donot leave any fields empty!!"})
		res.redirect('back')
	}
	else if(username.length<3){
		req.flash('info',{type : "error",msg : "Username should be of atleast 3 characters"})
		res.redirect('back')
	}
	else if (password.length<6){
		req.flash('info',{type : "error",msg : "Password should be of atleast 6 characters"})
		res.redirect('back')
	}
	else if (!validateEmail(email)){
		req.flash('info',{type : "error",msg : "Invalid Email Address"})
		res.redirect('back')
	}
	else if (!validateUsername(username)){
		req.flash('info',{type : "error",msg : "Invalid Username"})
		res.redirect('back')
	}
	else if (check_username!==null){
		req.flash('info',{type : "error",msg : "Username is already taken ! Please choose another username"})
		res.redirect('back')
	}
	else if (check_email!==null){
		req.flash('info',{type : "error",msg : "Email is already taken ! Please choose another email"})
		res.redirect('back')
	}
	else{
		const hash = bcrypt.hashSync(password,8)
		new User({
			username,
			password : hash,
			email,
			type,
			date : new Date()
		})
		.save((err)=>{
			if(err){console.log(err)}
			else{
				req.flash('info',{type : "success",msg : "Successfully registered !! You can now login"})
				res.redirect('back')
			}
		})
	}
})


module.exports = router