
//每次页面刷新时，重置表单。
$("#form")[0].reset();


var stuOfPage;


//按条件请求某页学生
function requestStudent(param){
	$.get("/student",param,function(resData){
		pc = resData.pageCount;
		stuOfPage = resData.data;
		renderTable(resData.data);
		renderPageControl(resData.pageCount);
		
		//给删除按钮绑定函数
		$(".delete").click(function(e){
			var stuid = $(e.target).attr("stuid");
			
			$.get("/delete",{stuid:stuid},function(resData){
				if(resData.err==0){
					var param = $("#form").serialize();
					param = param+"&page="+currentPage;
					requestStudent(param);
				}else{
					alert(resData.msg);
				}
			});
			
		});
		
	});
}

//渲染表格的函数
function renderTable(stuArray){
	var htmlStr = template("table-tem",{students:stuArray});
//	console.log(htmlStr);
	$("#s-table").html(htmlStr);
}

//记录当前显示的页数。
var currentPage = 0;

//总页数
var pc = 0;

//渲染页码的函数
function renderPageControl(pageCount){
	var num = currentPage+1;
	var pageArray = [num];
	var left = num;
	var right = num;
	var maxPageCount = pageCount<5?pageCount:5;
	while (pageArray.length<maxPageCount){
		if(left>1){
			left--;
			pageArray.unshift(left);
		}
		if(right<pageCount){
			right++;
			pageArray.push(right);
		}
	}
	
	var htmlStr = template("page-tem",{
		currentPage:currentPage+1,
		pageArray:pageArray,
		totalPage:pageCount
	});
	
	$("#page-control").html(htmlStr);
	
}

//下一页
function nextPage(){
	if(currentPage<pc-1){
		currentPage++;
		var param = $("#form").serialize();
		param = param+"&page="+currentPage;
		requestStudent(param);
	}
}
//上一页
function prePage(){
	if(currentPage>0){
		currentPage--;
		var param = $("#form").serialize();
		param = param+"&page="+currentPage;
		requestStudent(param);
	}
}
//前往某一页
function gotoPage(e){
	currentPage = Number($(e.target).text())-1;
	var param = $("#form").serialize();
	param = param+"&page="+currentPage;
	requestStudent(param);
}

//搜索按钮函数
function search(){
	var param = $("#form").serialize();
	//console.log(param);
	currentPage = 0;
	param+="&page=0";
	
	requestStudent(param);
	
	//让模态框消失
	$('#search-model').modal('hide');
}


//添加按钮函数
function add(){
	
	var param = $("#add-form").serialize();
	//console.log(param);
	
	$.post("/add",param,function(resData){
		if(resData.err==0){
			//添加成功
			alert(resData.msg);
			//添加成功之后，立刻请求新数据
			$("#form")[0].reset();
			currentPage = pc-1;
			requestStudent({page:currentPage});
		}
	});
	
	$('#add-model').modal('hide');
}

//点击修改按钮的函数
function update(){
	$('#edit-model').modal('hide');
	
	var param = $("#edit-form").serialize();
	
	param+="&_id="+editID;
	
	$.get("/update",param,function(resData){
		if(resData.err == 0){
			var pa = $("#form").serialize();
			pa = pa+"&page="+currentPage;
			requestStudent(pa);
		}else{
			alert(resData.msg);
		}
	});
	
}

var editID;

//点击某行修改图标的函数
function editClick(e){
	$("#edit-model").modal("show");
	
	var stuid = $(e.target).attr("stuid");
	editID = stuid;
	
	var stu = stuOfPage.find(function(obj){
		return obj._id==stuid;
	});
	
	$("#edit-model [name=name]").val(stu.name);
	$("#edit-model [name=age]").val(stu.age);
	if(stu.gender==1){
		$("#edit-model #edit-male").prop("checked",true);
		//$("#edit-model #edit-female").prop("checked",false);
	}else{
		//$("#edit-model #edit-male").prop("checked",false);
		$("#edit-model #edit-female").prop("checked",true);
	}
	$("#edit-model [name=tel]").val(stu.tel);
	$("#edit-model [name=email]").val(stu.email);
	$("#edit-model [name=detail]").text(stu.detail);
	
}

requestStudent();



