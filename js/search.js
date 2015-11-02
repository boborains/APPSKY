window.onload=function(){
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=')+1, url.length);
    if (loc==""){
        //alert("null")
        showsearchbar()
    }else{
        //alert("show")
    }
}
function showsearchbar(){
    var objul=document.createElement("ul")
    var obj=document.getElementById("searchbar")
    objul.innerHTML="<input type='text' id='key' value='请输入搜索关键字' onkeypress=showsearchlist(event)>"
    obj.appendChild(objul)
    showsearchkeyword()
}
function showsearchlist(event){
    if(event.keyCode==13) {
        //window.location.href='searchlist.html';return false;
        alert("showsearchlist")
        showsearchlist("a")
    }

}
//显示搜索热门关键字
function showsearchkeyword(){
     $.ajax({
        type: "POST",
        url:"api/searchkeyword.json",
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            var objul=document.createElement("ul")
            var obj=document.getElementById("keywordlist")
            obj.appendChild(objul)
            var num=data.data.datalist.length
            var objli=document.createElement("li")
            objli.className="t1"
            objli.innerHTML="热门搜索"
            objul.appendChild(objli)
            for(i=0;i<num;i++){
                var objli=document.createElement("li")
                objli.className="t2"
                objli.innerHTML=data.data.datalist[i].txt
                objli.onclick=function(){
                    showsearchlist(this.innerHTML)
                    //alert(this.innerHTML)
                }
                objul.appendChild(objli)
            }
        },
        error : function (data){
            alert("error")
        },
     })
}
//显示搜索结果列表
function showsearchlist(key){
    $.ajax({
        type: "POST",
        url:"api/search.json",
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            //alert("success")
            document.getElementById("keywordlist").innerHTML=""
            var obj=document.getElementById("applist")
            var num=data.data.datalist.length
            for(i=0;i<num;i++){
                var objul=document.createElement("ul")
                objul.className="appul"
                objul.id=data.data.datalist[i].id
                //跳转至详情页
                objul.onclick=function(){window.location.href='appdetails.html?id='+this.id}
                objul.innerHTML="<li class='appico'><img src='"+data.data.datalist[i].ico+"'></li><li class='apptxt'><div class='app-title'>"+data.data.datalist[i].name+"</div><div class='app-category'>"+data.data.datalist[i].category+"</div></li><li class='appbtn'><span class='dbtn' id="+data.data.datalist[i].url+" onclick=download(this,event)>下载</span></li>"
                obj.appendChild(objul)
            }
        },
        error : function (data){
            alert("error")
        },
    })
}

function download(obj,evt){
    var e=(evt)?evt:window.event;
        if (window.event) {
            e.cancelBubble=true;
        } else {
            e.stopPropagation();
        }
        alert("download=="+obj.id)
     //window.location.href='appdetails.html'
}