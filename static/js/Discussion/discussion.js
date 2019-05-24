				
				$(document).ready(function () {
					
					//获取讨论主题分类
// 				var params_categories = "";
// 				ajax('GET', 'pc/discuss/categories', params_categories).then(res => {
		$.ajax({
	        url:'http://www.youquhua.com:9055/pc/discuss/categories',
	        type:'GET',
			xhrFields: {
							withCredentials: true
						},
			data:{},
	        dataType:'json',
	        contentType: "application/json; charset=UTF-8", 
	        timeout:600000,
	        cache:false,
			async:false,
	       	success: function(res){	
					console.log("获取讨论主题分类" + JSON.stringify(res));
					if (res.rs == 1) {
						var newlist = res.data.list;
						var table = document.body.querySelector('.discusscategoriesbox');
						$(table).html("");

						if (newlist.length > 0) {
				
							for (var i = 0; i < newlist.length; i++) {
								var html = "";
								if(i==0){
									getlist(newlist[i].code);//初始化列表
									html += "<li  onclick=\"changetabs(this,'" + newlist[i].code +"')\" class=\"active\"  id=\"'" +newlist[i].code +"'\">" +newlist[i].name +"</li>";
								}else{
									html += "<li  onclick=\"changetabs(this,'" + newlist[i].code +"')\"  id=\"'" +newlist[i].code +"'\">" +newlist[i].name +"</li>";
								}
								
								$(table).append(html);
							}
				
						} else {
							$(table).html("暂无数据");
						}
				
					} else {
						console.log("首页展示话题列表接口请求失败，请稍后再试");
					}
				}
				
				
			})
				
					
					
					
					
					
					
					
					
					// 4.5.首页最新口子列表(讨论区最新产品公用)
// 					var params004 = "";
// 					ajax('GET', 'pc/loan<ul class="nrow">products', params004).then(res => {
	$.ajax({
	        url:'http://www.youquhua.com:9055/pc/loan/newproducts',
	        type:'GET',
			xhrFields: {
							withCredentials: true
						},
			data:{},
	        dataType:'json',
	        contentType: "application/json; charset=UTF-8", 
	        timeout:600000,
	        cache:false,
			async:false,
	       	success: function(res){	
						// console.log("首页最新口子列表(讨论区最新产品公用)" + JSON.stringify(res));
						if (res.rs == 1) {
							var newlist = res.data.list;
							var table = document.body.querySelector('.newproductsBox');
							$(table).html("");
							if (newlist.length > 0) {
								for (var i = 0; i < newlist.length; i++) {
									console.log(newlist);
									var html = "";
                                    //html += '<a href="../loanSupermarket/loanlist-details.html?' + newlist[i].lpLoanproductId + '">';
									html += '<a href="http://www.edgvip.cn/dk/loan' + newlist[i].lpLoanproductId + '.html">';
									html += '<li>';
									html += '<div  class="newMouth_list">';
									html += '<div class="newMouth_list_details nrow">';
									html += '<img src="' + newlist[i].iconUrl + '" alt="" />';
									html += '<div class="appinfo">';
									html += '<h1 class="appname">' + newlist[i].title + '</h1>';
									html += '<p class="appdesc">额度范围： <span class="yellowcolor">' + newlist[i].amountRange1 + '-' + newlist[i].amountRange2 +
										'</span></p>';
										
									if(newlist[i].periodRange1==newlist[i].periodRange2){
										html += '<p class="appdesc">借款期限：<span class="yellowcolor">' + newlist[i].periodRange1 +newlist[i].periodUnit + '内</span></p>';
									}else{
										html += '<p class="appdesc">借款期限：<span class="yellowcolor">' + newlist[i].periodRange1 + '-' + newlist[i].periodRange2 +
											'' + newlist[i].periodUnit + '</span></p>';
									}
										
									html += '</div>';
									html += '</div>';
									var tagline =  newlist[i].tagline.replace(/\|/g, '，');
									html += '<p class="newMouth_list_ul_decs">' + tagline+ '</p>';
									html += '</div>';
									html += '</li>';
                                    html += '</a>';

									$(table).append(html);
								}
					
							} else {
								$(table).html("暂无数据");
							}
					
						} else {
							console.log("4.5.首页最新口子列表(讨论区最新产品公用)接口请求失败，请稍后再试");
						}
					}
					
					
			})
					
					
					
					// 公用首页最新资讯接口
					//newinformationsBox最新资讯
// 					var params002 = "";
// 					ajax('GET', 'pc/discuss/newinformations', params002).then(res => {
	$.ajax({
	        url:'http://www.youquhua.com:9055/pc/discuss/newinformations',
	        type:'GET',
			xhrFields: {
							withCredentials: true
						},
			data:{},
	        dataType:'json',
	        contentType: "application/json; charset=UTF-8", 
	        timeout:600000,
	        cache:false,
			async:false,
	       	success: function(res){	
						console.log(res);
						if (res.rs == 1) {
							console.log("最新资讯接口" + res.data.newlist);
							var newlist = res.data.newlist;
							var table = document.body.querySelector('.newinformationsBox');
							$(table).html("");
							if (newlist.length > 0) {
								for (var i = 0; i < newlist.length; i++) {
									var html = "";
                                    //html += '<a href="discuss-details.html?' + newlist[i].id  + '">';
									html += '<a href="../dd/new' + newlist[i].id  + '.html">';
									html += '<li id="'+newlist[i].id+'"><span class="circle"></span> ' + newlist[i].title + '</li> ';
                                    html += '</a>';
									$(table).append(html);
								}
							} else {
								$(table).html("暂无数据");
							}
					
					
						} else {
							console.log("最新资讯接口请求失败，请稍后再试");
						}
					}
					
					
				})
					
					
					
});
				
				
				//首页展示话题列表点击详情展示全部
				function viewall(obj, objid) {
					var indx = objid.split("_")[1];
   				 localStorage.setItem('discussdetailID',indx);
				window.location.href =  "discuss-details.html";
				window.event.returnValue=false;
				
				}
				
				//首页跳转到贷款产品详情
				function getproductDetails(lpLoanproductId){
					console.log("lpLoanproductId_"+lpLoanproductId);//
					window.location.href = "../loanSupermarket/loanlist-details.html?"+lpLoanproductId;
					window.event.returnValue=false;
					
				}
				
				function changetabs(obj,objid){
					console.log(objid);
					$(".discusscategoriesbox li").removeClass("active");
					$(obj).addClass("active");
					
					getlist(objid);//
				}
				
				
				
				function getlist(objid){
					console.log(objid);
					localStorage.setItem("objid",objid);
					console.log(localStorage.getItem("objid"));
					if(localStorage.getItem("objid")!=null&&localStorage.getItem("objid")!=""){
						ajaxTest(1);
					}
					
				}
				// 最新资讯跳转详情
				function newinformations(obj){
					var $thisid  = $(obj).attr("id");
					 localStorage.setItem('discussdetailID',$thisid);
					window.location.href =  "discuss-details.html";
					window.event.returnValue=false;
				}
				
				
				
				
				function ajaxTest(num){
					var params003 = JSON.stringify({
											"categoryId": localStorage.getItem("objid"),
											 "start": num,   //分页开始页  必填
											  "limit":10 //当前页共显示多少条  必填
											});
					// ajax('POST', 'pc/discuss/list', params003).then(res => {
						console.log(params003);
			$.ajax({
			        url:'http://www.youquhua.com:9055/pc/discuss/list',
			        type:'POST',
					xhrFields: {
									withCredentials: true
								},
					data:JSON.stringify({
											"categoryId": localStorage.getItem("objid"),
											 "start": num,   //分页开始页  必填
											  "limit":10 //当前页共显示多少条  必填
											}),
			        dataType:'json',
			        contentType: "application/json; charset=UTF-8", 
			        timeout:600000,
			        cache:false,
					async:false,
			       	success: function(res){	
						if (res.rs == 1) {
							var newlist = res.data.list;
							var total = res.data.total;
							var table = document.body.querySelector('.showdiscussList-ul');
							
							$(table).html("");
							if (newlist.length > 0) {
					
								for (var i = 0; i < newlist.length; i++) {
									var html = "";
                                    //html += '<a href="discuss-details.html?' + newlist[i].diDiscussId  + '">';
									html += '<a href="../dd/new' + newlist[i].diDiscussId  + '.html">';
									html += '<li>';
									html += '<div class="row">';
									html += '<div class="new_con_imgs col-md-3">';
									html += '<img src=' + newlist[i].imgUrl + ' alt="" />';
									html += '</div>';
									html += '<div class="new_con_con col-md-9">';
									html += '<h2 class="title">' + newlist[i].title + '</h2>';
									html += '<div class="">';
									html += '<div class="decs diDiscussId_' + newlist[i].diDiscussId + '">' + newlist[i].content + ' </div>';
									html += "<button data-falg='false'  class=\"detailsbtn\" type=\"button\">【详情】</button>";
									html += '</div>';
									html += '<div class="datetime">' + newlist[i].createTime + '</div>';
									html += '</div>';
									html += '</div>';
									html += '</li>';
                                    html += '</a>';

									$(table).append(html);

								}
					
								$("#page").css("display","block");
									//分页
									$("#page").paging({
										pageNo: num,
										totalPage: total,
										totalSize: "",
										callback: function(num) {
											ajaxTest(num);
											localStorage.setItem("num",num);
										}
									})
								
							} else {
								if(total<1){
									$("#page").css("display","none");
								}
								$(table).html("暂无数据");
							}
					
						} else {
							console.log("首页展示话题列表接口请求失败，请稍后再试");
						}
					}
					
					
				})
		}
				
				
							// 跳转我的模块
							function gomyhelp(){
								/*
								**从缓存中调取用户信息
								*/
								var userinfo = localStorage.getItem("userInfo");
								// var cookieuserinfo = getCookie("userInfo");
								console.log("userinfo"+userinfo);
								if(userinfo!=null&&userinfo!=""){
									window.location.href = "../my/help.html";	
									window.event.returnValue=false;  
								}else{
									$.DialogByZ.Alert({Title: "系统提示", Content:' 您未登录，请前去登录',BtnL:"确定",FunL:closeAndToLogin})
									// alert("您未登录，请前去登录");
									
								}
								
							}
							function close(){
								$.DialogByZ.Close();
							}
							
							function closeAndToLogin() {
								$.DialogByZ.Close();
								window.location.href = "../my/login.html";
								window.event.returnValue=false;
							}