const router = require('express').Router()
const helper = require('../helper')
router.get('/home',helper.isLogged,(req,res)=>{
	res.render('home',{title : "Home"})
})

module.exports = router