var app = require("./js/app.js");

var Student = require("./js/database-Student.js");

var numberPerPage = 5;

//按条件查询学生接口
app.get("/student",function(req,res){
	var condition = {};
	if(req.query.name){
		var reg = new RegExp(req.query.name);
		condition.name = reg;
	}
	if(req.query.gender){
		condition.gender = req.query.gender;
	}
	if(req.query.tel){
		var reg = new RegExp(req.query.tel);
		condition.tel = reg;
	}
	var page = req.query.page;
	
	Student.find(condition)
	.count()
	.exec(function(err,data){
		var pageCount = Math.ceil(data/numberPerPage);
		Student.find(condition)
		.skip(page*numberPerPage)
		.limit(numberPerPage)
		.exec(function(err,data){
			res.json({
				err:0,
				pageCount,
				data
			});
		});
	});
});

//添加学生接口
app.post("/add",function(req,res){
	
	var s = new Student(req.body);
	
	s.save(function(err){
		res.json({
			err:0,
			msg:"添加成功"
		});
	});
});


//删除学生接口
app.get("/delete",function(req,res){
	Student.remove({_id:req.query.stuid})
	.exec(function(err){
		res.json({err:0,msg:"删除成功"});
	});
});


//修改学生信息接口
app.get("/update",function(req,res){
	var _id = req.query._id;
	delete req.query._id;
	
	Student.update({_id:_id},req.query)
	.exec(function(err){
		res.json({err:0,msg:"修改成功"});
	});
});


app.listen(8080,function(){
	console.log("服务器已开启");
});
