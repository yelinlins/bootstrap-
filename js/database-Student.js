var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/h5-7");

var db = mongoose.connection;

db.on("open",function(){
	console.log("数据库连接成功");
});

db.on("error",function(){
	console.log("数据库连接失败");
});


var studentSchema = mongoose.Schema({
	name:String,
	age:Number,
	gender:Number,
	tel:String,
	email:String,
	detail:String
});

var Student = mongoose.model("stu",studentSchema);


module.exports = Student;










