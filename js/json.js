var recommendjson="api/recommend.json"
var adjson="api/ad.json"
var categoryjson="api/category.json"
var listjson="api/list.json"
//转至各频道页
function goweb(id){
    switch(id){
    case 1:
    location='index.html'
    break;
    case 2:
    location='apphome.html'
    break;
    case 3:
    location='gamehome.html'
    break;
    case 4:
    location='search.html'
    break;
    }
}
function golist(type,urltype,id,pageNo,pageSize){
    location='list.html?type='+type+"&urltype="+urltype+"&id="+id+"&pageNo="+pageNo+"&pageSize="+pageSize
}
//显示应用详情页
function showdetails(appid){
    var navobj=document.getElementById("topnav")
    var navobj=document.getElementById("applist")
    $.ajax({
        type: "POST",
            url:"api/details.json",
            dataType:"json",
            contentType: "application/json",
            success : function(data){
                alert("success")
            },
            error : function (data){
                showerror()
            },
    })
    var navul=document.createElement("ul")
    navul.className="navtop"
    navul.innerHTML="<li class='li1' onclick=location='applist.html'>< 工具</li>"
}
//1.排行 recommend
function showRecommend(urltype,type,targetbox){
    var objbox=document.getElementById(targetbox)
    $.ajax({
        type:"POST",
        url:recommendjson+"?type="+type,
        dataType:"json",
        contentType:"application/json",
        success : function(data){
            //alert("success")
            var scrollbox=document.createElement("div")
            scrollbox.className="swiper-container thumbs-cotnainer"
            var scrolltitle=document.createElement("div")
            scrolltitle.className="thumbs-title"
            scrolltitle.innerHTML="<li class='li1'>"+data.data.title+"</li><li class='li2' onclick=golist('rec',"+urltype+","+data.data.id+",1,20)>显示全部></li>"
            scrollbox.appendChild(scrolltitle)
            objbox.appendChild(scrollbox)

            var swiperbox=document.createElement("div")
            swiperbox.className="swiper-wrapper"

            scrollbox.appendChild(swiperbox)
            for(i=0;i<data.data.datalist.length;i++){
                var slidebox=document.createElement("div")
                slidebox.className="swiper-slide"
                slidebox.id=data.data.datalist[i].id
                slidebox.onclick=function(){location='details.html?id='+this.id}
                slidebox.innerHTML="<img src="+data.data.datalist[i].ico+"><div class='app-title'>"+data.data.datalist[i].title+"</div><div class='app-category'>"+data.data.datalist[i].describe+"</div>"
                swiperbox.appendChild(slidebox)
            }
        },
        error : function (data){
            showerror()
        },
    })
}
//2.广告 home 3D AD
function showAd(id,targetbox){

    var objbox=document.getElementById(targetbox)
    $.ajax({
        type:"POST",
        url:adjson+"?type="+id,
        dataType:"json",
        contentType:"application/json",
        success : function(data){
            //alert("ad-s")
            var scrollbox=document.createElement("div")
            scrollbox.className="swiper-container featured"

            var swiperbox=document.createElement("div")
            swiperbox.className="swiper-wrapper"
            for(i=0;i<data.data.datalist.length;i++){
                var slidebox=document.createElement("div")
                slidebox.className="swiper-slide"
                slidebox.id=data.data.datalist[i].num
                slidebox.style="background-image:url("+data.data.datalist[i].img+")"
                slidebox.innerHTML="<a href="+data.data.datalist[i].url+"></a>"
                swiperbox.appendChild(slidebox)
            }
            scrollbox.appendChild(swiperbox)
            objbox.appendChild(scrollbox)
        },
        error : function (data){
            showerror()
        },
    })
}

//2.广告 home banner
function showAdBanner(id,targetbox){
    var objbox=document.getElementById(targetbox)
    $.ajax({
        type:"POST",
        url:adjson+"?type="+id,
        dataType:"json",
        contentType:"application/json",
        success : function(data){
            //alert("ad-s")
            var scrollbox=document.createElement("div")
            scrollbox.className="swiper-container banners-container border-gradient"

            var swiperbox=document.createElement("div")
            swiperbox.className="swiper-wrapper"
            for(i=0;i<data.data.datalist.length;i++){
                var slidebox=document.createElement("div")
                slidebox.className="swiper-slide"
                slidebox.id=data.data.datalist[i].num
                slidebox.innerHTML="<div class='banner' id='"+data.data.datalist[i].img+"' style='background-image:url("+data.data.datalist[i].img+")' onclick=getURL(this.id)></div>"
                swiperbox.appendChild(slidebox)
            }
            scrollbox.appendChild(swiperbox)
            objbox.appendChild(scrollbox)
        },
        error : function (data){
            showerror()
        },
    })
}
//2.广告，频道焦点
function showFocusAd(id,targetbox){
    var objbox=document.getElementById(targetbox)
    $.ajax({
        type:"POST",
        url:adjson+"?type="+id,
        dataType:"json",
        contentType:"application/json",
        success:function(data){
            for(i=0;i<data.data.datalist.length;i++){
                var libox=document.createElement("li")
                libox.innerHTML="<a class='pic' href='"+data.data.datalist[i].url+"'><img src='"+data.data.datalist[i].img+"'/></a>"
                objbox.appendChild(libox)
            }
        TouchSlide({
        					slideCell:"#slideBox",
        					titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        					mainCell:".bd ul",
        					effect:"leftLoop",
        					autoPage:true,//自动分页
        					autoPlay:true //自动播放
        				});
            //objbox.appendChild(ul1)
        },
        error:function (data){
            showerror()
        }
    })
}
//3.搜索结果 search
//4.搜索关键字 searchkeyword
//5.分类 category
function showAppCategory(type){
    $.ajax({
        type: "POST",
        url:categoryjson+"?type="+type,
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            //alert("success")
            var listli=document.getElementById("listli")
            listli.className="listli"
            for(i=0;i<data.data.datalist.length;i++){
                var cul=document.createElement("ul")
                cul.id=data.data.datalist[i].id
                cul.onclick=function(){location='list.html?type=list&urltype=2&id='+this.id+'&pageNo=1&pageSize=20'}
                //cul.onclick=golist('list',2,this.id,1,20)
                cul.innerHTML=data.data.datalist[i].title
                listli.appendChild(cul)
            }
        },
        error : function (data){
            alert("error")
        },
    })

}
//5.游戏分类
function showGameCategory(type){
    $.ajax({
        type: "POST",
        url:categoryjson+"?type="+type,
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            //alert("success")
            var listli=document.getElementById("listli")
            listli.className="listli"
            for(i=0;i<data.data.datalist.length;i++){
                var cul=document.createElement("ul")
                cul.id=data.data.datalist[i].id
                cul.onclick=function(){location='list.html?type=list&urltype=3&id='+this.id+'&pageNo=1&pageSize=20'}
                //cul.onclick=golist('list',2,this.id,1,20)
                cul.innerHTML=data.data.datalist[i].title
                listli.appendChild(cul)
            }
        },
        error : function (data){
            alert("error")
        },
    })

}
//6.排行列表
function RecommendNav(urltype,id){
    $.ajax({
        type: "POST",
        url:recommendjson,
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            //alert("success==="+urltype)
            var navbox=document.getElementById("nav")
            var navul=document.createElement("ul")
            navul.className="navtop"
            navul.innerHTML="<li class='li1' onclick=goweb("+urltype+")>< 返回</li><li class='li2'>"+data.data.title+"</li>"
            navbox.appendChild(navul)

        },
        error : function (data){
            showerror()
        },
    })
}
function RecommendList(id,pageNo,pageSize){
    $.ajax({
        type: "POST",
        url:recommendjson,
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            //alert("success==="+urltype)

            var listbox=document.getElementById("thelist")
            listbox.style="margin-top:50px"
            for(i=0;i<data.data.datalist.length;i++){
                var appul=document.createElement("div")
                appul.className="appone"
                appul.id=data.data.datalist[i].id
                //跳转至详情页
                appul.onclick=function(){window.location.href='appdetails.html?id='+this.id}
                appul.innerHTML="<div class='appico'><img src='"+data.data.datalist[i].ico+"'></div><div class='apptxt'><ul class='app-title'>"+data.data.datalist[i].title+"</ul><ul class='app-category'>"+data.data.datalist[i].describe+"</ul></div><div class='appbtn'><span class='dbtn' id="+data.data.datalist[i].url+" onclick=download(this,event)>下载</span></div>"
                listbox.appendChild(appul)

            }
        },
        error : function (data){
            showerror()
        },
    })



}
//6.应用列表
function AppNav(urltype,id){
    $.ajax({
        type: "POST",
        url:listjson,
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            //alert("success==="+urltype)
            var navbox=document.getElementById("nav")
            var navul=document.createElement("ul")
            navul.className="navtop"
            navul.innerHTML="<li class='li1' onclick=goweb("+urltype+")>< 返回</li><li class='li2'>"+data.data.title+"</li>"
            navbox.appendChild(navul)

        },
        error : function (data){
            showerror()
        },
    })
}
function AppList(id,pageNo,pageSize){
    $.ajax({
        type: "POST",
        url:listjson,
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            //alert("success==="+urltype)

            var listbox=document.getElementById("thelist")
            listbox.style="margin-top:50px"
            for(i=0;i<data.data.datalist.length;i++){
                var appul=document.createElement("div")
                appul.className="appone"
                appul.id=data.data.datalist[i].id
                //跳转至详情页
                appul.onclick=function(){window.location.href='appdetails.html?id='+this.id}
                appul.innerHTML="<div class='appico'><img src='"+data.data.datalist[i].ico+"'></div><div class='apptxt'><ul class='app-title'>"+data.data.datalist[i].title+"</ul><ul class='app-category'>"+data.data.datalist[i].describe+"</ul></div><div class='appbtn'><span class='dbtn' id="+data.data.datalist[i].url+" onclick=download(this,event)>下载</span></div>"
                listbox.appendChild(appul)

            }
        },
        error : function (data){
            showerror()
        },
    })
}
//7.应用详情 details
//show error
function showerror(){
    alert("error")
}
//getURL
function getURL(url){
    location=url;
}
//下载
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