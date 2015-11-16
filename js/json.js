
/*var recommendjson="api/recommend.json"
var adjson="api/ad.json"
var categoryjson="api/category.json"
var listjson="api/list.json"
var detailsjson="api/details.json"
var searchkeyword="api/searchkeyword.json"
var search="api/search.json"
*/

var recommendjson="http://lencn.com/sd23/api/recommend.asp"
var adjson="http://lencn.com/sd23/api/ad.asp"
var categoryjson="http://lencn.com/sd23/api/category.asp"
var listjson="http://lencn.com/sd23/api/list.asp"
var detailsjson="http://lencn.com/sd23/api/detail.asp"
var searchkeyword="http://lencn.com/sd23/api/searchkeyword.asp"
var search="http://lencn.com/sd23/api/search.asp"
var ddloadurl="http://lencn.com/sd23/api/dw.asp"



//转至各频道页
function goweb(id){
    switch(id){
    case 1:
    location='index.html?pageid='+id
    break;
    case 2:
    location='apphome.html?pageid='+id
    break;
    case 3:
    location='gamehome.html?pageid='+id
    break;
    case 4:
    location='search.html?pageid='+id
    break;
    }
}

//show app list
function goAppList(pageid,listid,pageNo){
    location='list.html?pageid='+pageid+"&listid="+listid+"&pageNo="+pageNo
}
//show recommend list
function goRecommendlist(pageid,listid,pageNo){
    location='listrecommend.html?pageid='+pageid+"&listid="+listid+"&pageNo="+pageNo
}
//go Search page
function goSearch(keyword){
   location='searchlist.html?keyword='+keyword
}
//7.应用详情 details
function showdetails(pageid,listid,appid,keyword){
    var applistbox=document.getElementById("applist")
    var navobj=document.getElementById("topnav")
    var navul=document.createElement("ul")
    navul.className="navtop"
    if(listid!=0){
        navul.innerHTML="<li class='li1' onclick=goAppList("+pageid+","+listid+",1)>< </li><li class='li2'>应用详情</li>"
    }else{
        if (pageid!=4){
            navul.innerHTML="<li class='li1' onclick=goweb("+pageid+")>< </li><li class='li2'>应用详情</li>"
        }else{
            navul.innerHTML="<li class='li1' onclick=goSearch('"+keyword+"')>< </li><li class='li2'>应用详情</li>"
        }
    }
    navobj.appendChild(navul)
    //alert("应用详情---"+keyword)
    $.ajax({
        type: "POST",
            url:detailsjson+"?id="+appid,
            dataType:"json",
            contentType: "application/json",
            beforeSend:function(){
                showloadobj(applistbox,'loadobjbox')
            },
            success : function(data){
            //var data=eval("("+data+")");
                //alert("success"+data)
                if(data.code==200){
                    var apptxtobj=document.createElement("ul")
                    apptxtobj.className="appul"
                    var appimgobj=document.createElement("ul")
                    appimgobj.className="appul1"
                    var appinfoobj=document.createElement("ul")
                    appinfoobj.className="appul"
                    apptxtobj.innerHTML="<li class='appicos'><img src='"+data.data.ico+"'></li><li class='apptxts'><div class='apptitle'>"+data.data.title+"</div><div class='app-category'>"+data.data.category+"</div><div class='fontgray'>大小: "+data.data.size+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版本:"+data.data.version+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来自: "+data.data.source+"</div></li><li class='appbtn'><span class='dbtn' id="+data.data.url+" onclick=download(this,event)>下载</span></li>"
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
                    div4.id="infos"
                    div4.innerHTML="应用介绍<br/>"+data.data.introduce
                    appinfoobj.appendChild(div4)
                    applistbox.appendChild(apptxtobj)
                    applistbox.appendChild(appimgobj)
                    applistbox.appendChild(appinfoobj)
                    //div4.innerHTML="应用介绍ss<br/>"+document.getElementsByClassName("brief-long")[0].innerHTML
                	$('.thumbs-cotnainers').each(function(){
                	    $(this).swiper({
                    			slidesPerView:'auto',
                    			offsetPxBefore:25,
                    			offsetPxAfter:10,
                    			calculateHeight: true
                    	})
                	})

                }else{
                    loadcode0(applistbox)
                   // alert(data.code)
                }
                removeloadobj(applistbox,'loadobjbox')
            },
            error : function (data){
                loadcode0(applistbox)//showerror()
            },
    })


}
//1.排行 recommend
function showRecommend(pageid,listid,targetbox){
    var objbox=document.getElementById(targetbox)
    $.ajax({
        type:"POST",
        url:recommendjson+"?listid="+listid+"&ps="+20,
        dataType:"json",
        contentType:"application/json",

        success : function(data){
            //alert("success")
            if (data.code==200){
                var scrollbox=document.createElement("div")
                scrollbox.className="swiper-container thumbs-cotnainer"
                var scrolltitle=document.createElement("div")
                scrolltitle.className="thumbs-title"
                scrolltitle.innerHTML="<li class='li1'>"+data.data.title+"</li><li class='li2' onclick=goRecommendlist("+pageid+","+listid+",1)>显示全部></li>"
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
                $('.thumbs-cotnainer').each(function(){
                		$(this).swiper({
                			slidesPerView:'auto',
                			offsetPxBefore:25,
                			offsetPxAfter:10,
                			calculateHeight: true
                		})
                })
            }else{
                loadcode1(objbox)

            }

        },
        error : function (data){
            loadcode1(objbox)//showerror()
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
            if (data.code==200){
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
                var featuredSwiper = $('.featured').swiper({
                		slidesPerView:'auto',
                		centeredSlides: true,
                		initialSlide:7,
                		tdFlow: {
                			rotate : 30,
                			stretch :10,
                			depth: 150
                		}
                })
            }else{
                loadcode1(objbox)

            }

        },
        error : function (data){
            loadcode1(objbox)//showerror()
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
            if (data.code==200){
                var scrollbox=document.createElement("div")
                scrollbox.className="swiper-container banners-container border-gradient"

                var swiperbox=document.createElement("div")
                swiperbox.className="swiper-wrapper"
                for(i=0;i<data.data.datalist.length;i++){
                    var slidebox=document.createElement("div")
                    slidebox.className="swiper-slide"
                    slidebox.id=data.data.datalist[i].num
                    slidebox.innerHTML="<div class='banner' id='"+data.data.datalist[i].url+"' style='background-image:url("+data.data.datalist[i].img+")' onclick=getURL(this.id)></div>"
                    swiperbox.appendChild(slidebox)
                }
                scrollbox.appendChild(swiperbox)
                objbox.appendChild(scrollbox)
                $('.banners-container').each(function(){
                		$(this).swiper({
                			slidesPerView:'auto',
                			offsetPxBefore:25,
                			offsetPxAfter:10
                		})
                })
            }else{
                loadcode1(objbox)
            }

        },
        error : function (data){
            loadcode1(objbox)//showerror()
        },
    })
}
//2.广告，首页横通
function showhomebanner(id,targetbox){
var objbox=document.getElementById(targetbox)
    $.ajax({
        type:"POST",
        url:adjson+"?type="+id,
        dataType:"json",
        contentType:"application/json",
        success : function(data){
            //alert("ad-s")
            if (data.code==200){
                var div=document.createElement("div")
                div.innerHTML="<img id='"+data.data.datalist[0].url+"' onclick=getURL(this.id) src="+data.data.datalist[0].img+">"
                objbox.appendChild(div)
            }else{
                loadcode1(objbox)
            }

        },
        error : function (data){
            loadcode1(objbox)//showerror()
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
            if (data.code==200){
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
            }else{
                loadcode1(objbox)
            }

            //objbox.appendChild(ul1)
        },
        error:function (data){
            loadcode1(obj)//showerror()
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
        //showsearchlist(txt,1)
        goSearch(txt)
    }

}
//显示搜索热门关键字
function showsearchkeyword(){
    var obj=document.getElementById("keywordlist")
    $.ajax({
        type: "POST",
        url:searchkeyword,
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            if (data.code==200){
                var objul=document.createElement("ul")
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
                       goSearch(this.innerHTML)
                        //alert(this.innerHTML)
                    }
                    objul.appendChild(objli)
                }
            }else{
                loadcode1(obj)
            }

        },
        error : function (data){
             showerror()
        },
    })
}
//显示搜索结果列表
function showsearchlist(key,pageNo){
    //alert("showsearchlist=="+key)
    var obj=document.getElementById("applist")
    $.ajax({
        type: "POST",
        url:search+"?keyword="+key,
        dataType:"json",
        contentType: "application/json",
        beforeSend:function(){
            showload(0)
        },
        success : function(data){
        if(data.code==200){
            if (pageNo>data.data.page.totalPage){
                showload(1)
            }else{
                //alert("success")
                //document.getElementById("keywordlist").innerHTML=""
                var num=data.data.datalist.length
                for(i=0;i<num;i++){
                    var objul=document.createElement("ul")
                    objul.className="appul"
                    objul.id=data.data.datalist[i].id
                    //跳转至详情页
                    objul.onclick=function(){location=encodeURI('details.html?pageid=4&listid=0&appid='+this.id+'&keyword='+key)}
                    objul.innerHTML="<li class='appico'><img src='"+data.data.datalist[i].ico+"'></li><li class='apptxt'><div class='app-title'>"+data.data.datalist[i].title+"</div><div class='app-category'>"+data.data.datalist[i].catename+"</div></li><li class='appbtn'><span class='dbtn' id="+data.data.datalist[i].url+" onclick=download(this,event)>下载</span></li>"
                    obj.appendChild(objul)
                }

                setTimeout('hideload()',3000)
            }
        }else{
            setTimeout('hideload()',50)
            loadcode0(obj)
        }

        },
        error : function (data){
            //loadcode0(obj)//showerror()
        },
    })
}

//5.分类 category
function showAppCategory(pageid,pageNo){
    var obj=document.getElementById("thislist")
    $.ajax({
        type: "POST",
        url:categoryjson+"?pageNo="+pageNo+"&id=1",
        dataType:"json",
        contentType: "application/json",
        beforeSend:function(){
            showload(0)
        },
        success : function(data){
            if(data.code==200){
                if (pageNo>data.data.page.totalPage){
                    showload(1)
                }else{
                    var listli=document.getElementById("listli")
                    listli.className="listli"
                    for(i=0;i<data.data.datalist.length;i++){
                        var cul=document.createElement("ul")
                        cul.id=data.data.datalist[i].id
                        cul.onclick=function(){goAppList(pageid,this.id,1)}
                        //cul.onclick=golist('list',2,this.id,1)
                        cul.innerHTML=data.data.datalist[i].title+"P="+pageNo
                        listli.appendChild(cul)
                    }
                    window.onscroll = function () {
                            if (getScrollTop() + getClientHeight() == getScrollHeight()) {
                                page_num=page_num+1;
                                showAppCategory(pageid,page_num)
                            }
                         }
                }
                setTimeout('hideload()',3000)
            }else{
                setTimeout('hideload()',50)
                loadcode0(obj)
            }
            //alert("success"+data.data.page.totalPage)

        },
        error : function (data){
            //loadcode0(obj)//showerror()
        },
    })

}
//5.游戏分类
function showGameCategory(pageid,pageNo){
    var obj=document.getElementById("thislist")
    $.ajax({
        type: "POST",
        url:categoryjson+"?pageNo="+pageNo+"&id=2",
        dataType:"json",
        contentType: "application/json",
        beforeSend:function(){
            showload(0)
        },
        success : function(data){
            if(data.code==200){
                if (pageNo>data.data.page.totalPage){
                    showload(1)
                }else{
                    var listli=document.getElementById("listli")
                    listli.className="listli"
                    for(i=0;i<data.data.datalist.length;i++){
                        var cul=document.createElement("ul")
                        cul.id=data.data.datalist[i].id
                        cul.onclick=function(){goAppList(pageid,this.id,1)}
                        //cul.onclick=golist('list',2,this.id,1)
                        cul.innerHTML=data.data.datalist[i].title+"P="+pageNo
                        listli.appendChild(cul)
                    }
                }
            }else{
                setTimeout('hideload()',50)
                loadcode0(obj)
            }
            setTimeout('hideload()',3000)
        },
        error : function (data){
             //loadcode0(obj)//showerror()
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
            if(data.code==200){
                var navbox=document.getElementById("nav")
                var navul=document.createElement("ul")
                navul.className="navtop"
                navul.innerHTML="<li class='li1' onclick=goweb("+pageid+")>< </li><li class='li2'>"+data.data.title+"</li>"
                navbox.appendChild(navul)
            }else{
                var navbox=document.getElementById("nav")
                var navul=document.createElement("ul")
                navul.className="navtop"
                navul.innerHTML="<li class='li1' onclick=goweb(1)>< </li><li class='li2'>列表</li>"
                navbox.appendChild(navul)

            }
        },
        error : function (data){
            //showerror()
        },
    })
}

function showAppList(pageid,listid,pageNo){
    var listbox=document.getElementById("thelist")
    $.ajax({
        type: "POST",
        url:listjson+'?listid='+listid+"&pageNo="+pageNo,
        dataType:"json",
        contentType: "application/json",
        //alert("success==="+pageNo)
         beforeSend:function(){
             showload(0)
         },
        success : function(data){
        if (data.code==200){
            if (pageNo>data.data.page.totalPage){
                showload(1)
            }else{
            for(i=0;i<data.data.datalist.length;i++){
                var appul=document.createElement("div")
                appul.className="appone"
                appul.id=data.data.datalist[i].id
                //跳转至详情页
                appul.onclick=function(){location='details.html?pageid='+pageid+'&listid='+listid+'&appid='+this.id}
                appul.innerHTML="<div class='appico'><img src='"+data.data.datalist[i].ico+"'></div><div class='apptxt'><ul class='app-title'>"+data.data.datalist[i].title+"P="+pageNo+"</ul><ul class='app-category'>"+data.data.datalist[i].catename+"</ul></div><div class='appbtn'><span class='dbtn' id="+data.data.datalist[i].url+" onclick=download(this,event)>下载</span></div>"
                listbox.appendChild(appul)
            }
            setTimeout('hideload()',3000)
            }
            //alert(getScrollHeight()+"=="+window.screen.height)

        }else{
         setTimeout('hideload()',50)
         loadcode0(listbox)
        }

        },
        error : function (data){
            //loadcode0(listbox)
            //showerror()
        },
    })
}
//show recommend nav
function showRecNav(pageid,listid){
    $.ajax({
        type: "POST",
        url:recommendjson+'?listid='+listid,
        dataType:"json",
        contentType: "application/json",
        success : function(data){
            if(data.code==200){
                var navbox=document.getElementById("nav")
                var navul=document.createElement("ul")
                navul.className="navtop"
                navul.innerHTML="<li class='li1' onclick=goweb("+pageid+")>< </li><li class='li2'>"+data.data.title+"</li>"
                navbox.appendChild(navul)
            }else{
                var navbox=document.getElementById("nav")
                var navul=document.createElement("ul")
                navul.className="navtop"
                navul.innerHTML="<li class='li1' onclick=goweb(1)>< </li><li class='li2'>列表</li>"
                navbox.appendChild(navul)

            }
        },
        error : function (data){
            //showerror()
        },
    })
}
//show Recommend list
function showRecommedList(pageid,listid,pageNo){
    var listbox=document.getElementById("thelist")
    $.ajax({
        type: "POST",
        url:recommendjson+"?listid="+listid+"&pageNo="+pageNo,
        dataType:"json",
        contentType: "application/json",
        //alert("success==="+pageNo)
         beforeSend:function(){
             showload(0)
         },
        success : function(data){
        if (data.code==200){
            if (pageNo>data.data.page.totalPage){
                showload(1)
            }else{
            for(i=0;i<data.data.datalist.length;i++){
                var appul=document.createElement("div")
                appul.className="appone"
                appul.id=data.data.datalist[i].id
                //跳转至详情页
                appul.onclick=function(){location='details.html?pageid='+pageid+'&listid='+listid+'&appid='+this.id}
                appul.innerHTML="<div class='appico'><img src='"+data.data.datalist[i].ico+"'></div><div class='apptxt'><ul class='app-title'>"+data.data.datalist[i].title+"P="+pageNo+"</ul><ul class='app-category'>"+data.data.datalist[i].describe+"</ul></div><div class='appbtn'><span class='dbtn' id="+data.data.datalist[i].url+" onclick=download(this,event)>下载</span></div>"
                listbox.appendChild(appul)
            }
            setTimeout('hideload()',3000)
            }
            //alert(getScrollHeight()+"=="+window.screen.height)

        }else{
         setTimeout('hideload()',50)
         loadcode0(listbox)
        }

        },
        error : function (data){
            //loadcode0(listbox)
            //showerror()
        },
    })
}

//show error
function showerror(){
    //alert("error")
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
        ddload()
        //alert("download=="+obj.id)
     //window.location.href='details.html'
}
//show load
function showload(n){
    var loadobj=document.getElementById("loading")
    switch (n){
    case 0:
    loadobj.innerHTML="<li style='padding:20px;'><img src='img/loading.gif'> 正在加载…</li>"
    break;
    case 1:
    loadobj.innerHTML="<li style='padding:20px;'>已经全部加载完…</li>"
    break;
    }

    loadobj.style.display="block"
}
//hide load
function hideload(){
    var loadobj=document.getElementById("loading")
    loadobj.style.display="none"

}
//show loadobj
function showloadobj(obj,box){
    var  loadobj=document.createElement("div")
    loadobj.id=box
    loadobj.className="loadtips"
    loadobj.innerHTML="<img src='img/loading.gif'><br/>加载中"
    obj.appendChild(loadobj)
}
function removeloadobj(obj,box){
    var loadobj=document.getElementById(box)
    obj.removeChild(loadobj)
}

function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    }else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
//show nav
function showmenu(pageid){
    var menuobj=document.getElementById("menudiv")
    menuobj.innerHTML="<li onclick=location='index.html?pageid=1' id='menu1'>首页</li><li id='menu2' onclick=location='apphome.html?pageid=2'>应用</li><li id='menu3' onclick=location='gamehome.html?pageid=3'>游戏</li><li id='menu4' onclick=location='search.html?pageid=4'>搜索</li>"
    for(i=1;i<5;i++){
        var menu=document.getElementById("menu"+i)
        menu.className=""
    }

        var menu=document.getElementById("menu"+pageid)
        menu.className="title1"
}
//
function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
}
//load code 0
function loadcode0(obj){
    var loadingtips=document.createElement("ul")
    loadingtips.innerHTML="<img src='img/Load_failed.png'><br/>暂无数据!<br/>"
    loadingtips.className="loadtips"
    obj.appendChild(loadingtips)
}
function loadcode1(obj){
    var loadingtips=document.createElement("ul")
    loadingtips.innerHTML="<img src='img/Load_failed2.png'>加载失败，请稍后再试!"
    loadingtips.className="loadtips1"
    obj.appendChild(loadingtips)
}

//submit download data

function ddload(){
var s=126;
var dataJson={t0:s}
//t0:,t1:,t2
        //alert(dataJson)
    $.ajax({
        type: "POST",
        url: ddloadurl,
        data:"t0=126",
        success: function(message){
             alert( "Data Saved: " + message );
        }
        error: function (message) {
            alert("loaderror")
         }

    });
}