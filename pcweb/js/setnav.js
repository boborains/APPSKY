function setucnav(id){
	var ucnavbox=document.getElementById("ucnavbox")
	ucnavbox.innerHTML="<ul><li onclick=location='myapp.html'>我的应用</li><li>数据报表</li><li onclick=location='userinfo.html'>资料修改</li><li onclick=location='setuser.html'>帐号安全</li></ul>"
	for(i=0;i<4;i++){
		document.getElementById("ucnavbox").getElementsByTagName("li")[i].className=""
	}
	document.getElementById("ucnavbox").getElementsByTagName("li")[id].className="navactive"
}