var recommendjson="api/recommend.json"
var adjson="api/ad.json"
var categoryjson="api/category.json"
var listjson="api/list.json"
var detailsjson="api/details.json"
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

//show app list
function goAppList(pageid,listid,pageNo,pageSize){
    location='list.html?pageid='+pageid+"&listid="+listid+"&pageNo="+pageNo+"&pageSize="+pageSize
}
//go Search page
function goSearch(keyword){
   location='search.html?keyword='+keyword
}
//7.应用详情 details
function showdetails(pageid,listid,appid,keyword){
//alert("应用详情---"+keyword)
    $.ajax({
        type: "POST",
            url:detailsjson+"?appid="+appid,
            dataType:"json",
            contentType: "application/json",
            success : function(data){
                //alert("success")
                var navobj=document.getElementById("topnav")
                var apptxtobj=document.getElementById("apptxt")
                var appimgobj=document.getElementById("appimg")
                var appinfoobj=document.getElementById("appinfo")
                var navul=document.createElement("ul")
                navul.className="navtop"
                if(listid!=0){
                    navul.innerHTML="<li class='li1' onclick=goAppList("+pageid+","+listid+",1,20)>< </li><li class='li2'>应用详情</li>"
                }else{
                    if (pageid!=4){
                        navul.innerHTML="<li class='li1' onclick=goweb("+pageid+")>< </li><li class='li2'>应用详情</li>"
                    }else{
                         navul.innerHTML="<li class='li1' onclick=goSearch('"+keyword+"')>< </li><li class='li2'>应用详情</li>"
                    }
                }
                navobj.appendChild(navul)
                apptxtobj.innerHTML="<li class='appicos'><img src='"+data.data.ico+"'></li><li class='apptxts'><div class='apptitle'>"+data.data.title+"</div><div class='app-category'>"+data.data.category+"</div><div class='fontgray'>大小: "+data.data.size+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版本:"+data.data.version+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下载次数:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来自: "+data.data.source+"</div></li><li class='appbtn'><span class='dbtn' id="+data.data.url+" onclick=download(this,event)>下载</span></li>"
                var div1=document.createElement("div")
                div1.className="swiper-container thumbs-cotnainers"
                var div2=document.createElement("div")
                div2.className="swiper-wrapper"
                div1.appendChild(div2)

                for(i=0;i<data.data.img.length;i++){
                var div3=document.createElement("div")
                div3.className="swiper-slide"
                div3.innerHTML="<img src="+data.data.img[i]+">"
                div2.appendChild(div3)
                }
                appimgobj.appendChild(div1)
                var div4=document.createElement("div")
                div4.innerHTML="应用介绍:</br>"+data.data.introduce
                appinfoobj.appendChild(div4)

            	$('.thumbs-cotnainers').each(function(){
            	    $(this).swiper({
                			slidesPerView:'auto',
                			offsetPxBefore:25,
                			offsetPxAfter:10,
                			calculateHeight: true
                	})
            	})

            },
            error : function (data){
                showerror()
            },
    })


}
//1.排行 recommend
function showRecommend(pageid,listid,targetbox){
    var objbox=document.getElementById(targetbox)
    $.ajax({
        type:"POST",
        url:recommendjson+"?listid="+listid,
        dataType:"json",
        contentType:"application/json",
        success : function(data){
            //alert("success")
            var scrollbox=document.createElement("div")
            scrollbox.className="swiper-container thumbs-cotnainer"
            var scrolltitle=document.createElement("div")
            scrolltitle.className="thumbs-title"
            scrolltitle.innerHTML="<li class='li1'>"+data.data.title+"</li><li class='li2' onclick=goAppList("+pageid+","+listid+",1,20)>显示全部></li>"
            scrollbox.appendChild(scrolltitle)
            objbox.appendChild(scrollbox)

            var swiperbox=document.createElement("div")
            swiperbox.className="swiper-wrapper"

            scrollbox.appendChild(swiperbox)
            for(i=0;i<data.data.datalist.length;i++){
                var slidebox=document.createElement("div")
                slidebox.className="swiper-slide"
                slidebox.id=data.data.datalist[i].id
                slidebox.onclick=function(){location='details.html?pageid='+pageid+'&listid=0&appid='+this.id}
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

//4.搜索关键字 searchkeyword
function showsearchbar(keyword){
    var objul=document.createElement("ul")
    var obj=document.getElementById("searchbar")
    objul.innerHTML="<input type='text' id='key' value='"+keyword+"' onkeypress=searchlist(event)>"
    obj.appendChild(objul)

}
function searchlist(event){

    if(event.keyCode==13) {
        var txt=document.getElementById("key").value
       //alert("searchlist=="+txt)
        showsearchlist(txt)
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
                    document.getElementById("key").value=this.innerHTML
                    showsearchlist(this.innerHTML)
                    //alert(this.innerHTML)
                }
                objul.appendChild(objli)
            }
        },
        error : function (data){
             showerror()
        },
     })
}
//显示搜索结果列表
function showsearchlist(key){
    //alert("showsearchlist=="+key)
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
                objul.onclick=function(){location=encodeURI('details.html?pageid=4&listid=0&appid='+this.id+'&keyword='+key)}
                objul.innerHTML="<li class='appico'><img src='"+data.data.datalist[i].ico+"'></li><li class='apptxt'><div class='app-title'>"+data.data.datalist[i].name+"</div><div class='app-category'>"+data.data.datalist[i].category+"</div></li><li class='appbtn'><span class='dbtn' id="+data.data.datalist[i].url+" onclick=download(this,event)>下载</span></li>"
                obj.appendChild(objul)
            }
        },
        error : function (data){
             showerror()
        },
    })
}

//5.分类 category
function showAppCategory(pageid,type){
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
                cul.onclick=function(){goAppList(pageid,this.id,1,20)}
                //cul.onclick=golist('list',2,this.id,1,20)
                cul.innerHTML=data.data.datalist[i].title
                listli.appendChild(cul)
            }
        },
        error : function (data){
            showerror()
        },
    })

}
//5.游戏分类
function showGameCategory(pageid,type){
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
                cul.onclick=function(){goAppList(pageid,this.id,1,20)}
                //cul.onclick=golist('list',2,this.id,1,20)
                cul.innerHTML=data.data.datalist[i].title
                listli.appendChild(cul)
            }
        },
        error : function (data){
             showerror()
        },
    })

}
//6.应用列表
function showNav(pageid,listid){
    $.ajax({
        type: "POST",
        url:listjson+'?listid='+listid,
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            //alert("success==="+urltype)
            var navbox=document.getElementById("nav")
            var navul=document.createElement("ul")
            navul.className="navtop"
            navul.innerHTML="<li class='li1' onclick=goweb("+pageid+")>< </li><li class='li2'>"+data.data.title+"</li>"
            navbox.appendChild(navul)

        },
        error : function (data){
            showerror()
        },
    })
}

function showAppList(pageid,listid,pageNo,pageSize){
    $.ajax({
        type: "POST",
        url:listjson+'?listid='+listid,
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
                appul.onclick=function(){location='details.html?pageid='+pageid+'&listid='+listid+'&appid='+this.id}
                appul.innerHTML="<div class='appico'><img src='"+data.data.datalist[i].ico+"'></div><div class='apptxt'><ul class='app-title'>"+data.data.datalist[i].title+"</ul><ul class='app-category'>"+data.data.datalist[i].describe+"</ul></div><div class='appbtn'><span class='dbtn' id="+data.data.datalist[i].url+" onclick=download(this,event)>下载</span></div>"
                listbox.appendChild(appul)

            }
        },
        error : function (data){
            showerror()
        },
    })
}

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
     //window.location.href='details.html'
}