function load_category(target,obj,page_num){
alert(page_num)
    switch (target){
        case 'app':
        loadapp(obj)
        break;
        case 'game':
        break;
    }
}
function loadapp(obj){
    var obj=document.getElementById(obj)
    $.ajax({
        type: "POST",
        url:"api/category.json",
        //url:"api/recommend1.json",
        dataType:"json",
        contentType: "application/json",
        success : function(data){

            //alert(data.data.datalist.length)
            if (data.data.datalist.length>0){
                for(i=0;i<data.data.datalist.length;i++){
                    var objul=document.createElement("ul")
                    objul.innerHTML=data.data.datalist[i].title
                    obj.appendChild(objul)
                }
            }else{
                obj.innerHTML="还没有分类!"
            }
        },
        error : function (data){
            alert("error")
        },
    })
}
