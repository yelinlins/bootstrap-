/*TMODJS:{"version":8,"md5":"20d8edcf986b689076b752384984d9e6"}*/
template('table-tem',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,students=$data.students,s=$data.s,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' <thead> <tr> <th>姓名</th> <th>年龄</th> <th>性别</th> <th>手机号</th> <th>邮箱</th> <th>修改</th> <th>删除</th> </tr> </thead> <tbody> ';
$each(students,function(s,$index){
$out+=' <tr> <td>';
$out+=$escape(s.name);
$out+='</td> <td>';
$out+=$escape(s.age);
$out+='</td> <td>';
$out+=$escape(s.gender==1?"男":"女");
$out+='</td> <td>';
$out+=$escape(s.tel);
$out+='</td> <td>';
$out+=$escape(s.email);
$out+='</td> <td> <span onclick="editClick(event)" stuid="';
$out+=$escape(s._id);
$out+='" class="edit glyphicon glyphicon-edit"></span> </td> <td> <span stuid="';
$out+=$escape(s._id);
$out+='" class="delete glyphicon glyphicon-trash"></span> </td> </tr> ';
});
$out+=' </tbody> ';
return new String($out);
});