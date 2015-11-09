<!--#include file="../lib/base.asp"-->
<%
dim i,sql
dim classid:classid=sdcms.getint(sdcms.fget("listid",0),0)
dim p:p=sdcms.getint(sdcms.fget("p",0),0)
if p=0 then p=1

dim ps:ps=sdcms.getint(sdcms.fget("ps",0),0)
if ps=0 then ps=10
sdcms.page.field = "id,title,pic,catename,downurl"
sdcms.page.join = " LEFT JOIN view_category ON view_content.classid = view_category.cateid"
sdcms.page.table = "view_content"
sdcms.page.where = " view_content.classid="&classid
sdcms.page.page = p
sdcms.page.pagesize = ps
dim rs:set rs = sdcms.page.getrs()

if rs.recordcount>0 then
	with (sdcms)
		.echo "{"
		.echo "'code':200,"
		.echo "'message':'success',"
		.echo "'data':{"
		.echo "'id':'"&classid&"',"
		.echo "'title':'"&rs(3)&"',"
		.echo "'img1000':'',"
		.echo "'img200':'',"
		.echo "'datalist':["
		for i=1 to rs.pagesize
			.echo "{"
			.echo "'id':"&"'"&rs(0)&"',"
			.echo "'title':"&"'"&rs(1)&"',"
			.echo "'ico':"&"'"&rs(2)&"',"
			.echo "'describe':"&"'"&rs(3)&"',"
			.echo "'url':"&"'"&rs(4)&"'"
			.echo "}"
			rs.movenext
			if i<rs.pagesize then .echo ","
			if rs.eof then exit for
			
		next
		.echo "],"
		.echo "'page':{"
		.echo "'pageNo':"&p&","
		.echo "'pageSize':"&rs.pagesize&","
		.echo "'totalPage':"&rs.pagecount
		.echo "}"
		.echo "}"
		.echo "}"
	
	
	end with
else
	with (sdcms)
		.echo "{"
		.echo "'code':0,"
		.echo "'message':'fail',"
		.echo "'data':'datalist':[]"
		.echo "}"
	end with
end if
%>