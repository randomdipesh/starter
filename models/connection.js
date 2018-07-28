const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/aston',{useNewUrlParser : true},(err,succ)=>{
	if(err){console.log(err)}
	if(succ){
		console.log("Database connection successfull")
	}
})