/*TMODJS:{"version":7,"md5":"3bb85ff69ddfdff43a695833827c9605"}*/
template('page-tem',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,currentPage=$data.currentPage,$each=$utils.$each,pageArray=$data.pageArray,page=$data.page,$index=$data.$index,$escape=$utils.$escape,totalPage=$data.totalPage,$out='';$out+=' <ul class="pagination"> <li ';
if(currentPage==1){
$out+='class="disabled"';
}
$out+='> <a onclick="prePage()">&laquo;</a> </li> ';
$each(pageArray,function(page,$index){
$out+=' <li ';
if(currentPage==page){
$out+='class="active"';
}
$out+='> <a onclick="gotoPage(event)"> ';
$out+=$escape(page);
$out+=' </a> </li> ';
});
$out+=' <li ';
if(currentPage==totalPage){
$out+='class="disabled"';
}
$out+='> <a onclick="nextPage()">&raquo;</a> </li> </ul> ';
return new String($out);
});