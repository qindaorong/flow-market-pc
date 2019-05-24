			$(document).ready(function() {
				/**
				 * 首页分类贷款产品列表
				 * 
				 */
// 				var params = '';
// 				ajax('GET', 'pc/loan/productlist', params).then(res => {
		$.ajax({
		        url:'http://www.youquhua.com:8055/pc/loan/productlist',
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
					if (res.rs != 1) {
						console.log("首页分类贷款产品列表失败")
					} else {
						var table = document.body.querySelector('.category');
						//categoryId=1
						$(table).html("");
						console.log(res.data.productsVO);
						for (var i = 0; i < res.data.productsVO.length; i++) {
							var list = res.data.productsVO[i].list;
							var categoryTitle = res.data.productsVO[i].categoryTitle;
							var categoryId = res.data.productsVO[i].categoryId;

							var titlebox_uls_html = "";

							if (list.length > 0) {
								titlebox_uls_html += '<div class="index-title nrow">';
								titlebox_uls_html += '<h2>';
								titlebox_uls_html += '<span class="line"></span>';
								titlebox_uls_html += '<span class="text">' + categoryTitle + '</span>';
								titlebox_uls_html += '</h2>';
								titlebox_uls_html += '<div class="more">';
								titlebox_uls_html += '<span class="btnspan" onclick="golist(' + categoryId + ')">查看更多</span>';
								titlebox_uls_html += '<img  onclick="golist(' + categoryId + ')" class="morebtnimg" src="static/images/morebtn.png" alt="产品图" />';
								titlebox_uls_html += '</div>';
								titlebox_uls_html += '</div>';
								titlebox_uls_html += '<div class="xinkouzi categoryId_' + res.data.productsVO[i].categoryId + '">';
								titlebox_uls_html += '<ul class="row">';


									for (var j = 0; j < list.length; j++) {
										var li = document.createElement('li');
										titlebox_uls_html += '<li class="col-md-4">';
                                        //titlebox_uls_html += '<a href="loanSupermarket/loanlist-details.html?' + list[j].lpLoanproductId  + '">';
										titlebox_uls_html += '<a href="http://www.youquhua.com/dk/loan' + list[j].lpLoanproductId  + '.html">';
											titlebox_uls_html += '<div class="boxes">';
											titlebox_uls_html += '<div class="boxeslist nrow">';
											titlebox_uls_html += '<img src="' + list[j].iconUrl + '" alt="图标" />';
											titlebox_uls_html += '<div class="appinfo">';
											titlebox_uls_html += '<h1 class="appname">' + list[j].title + '</h1>';
											titlebox_uls_html += '<p class="appdesc">额度范围： <span class="yellowcolor">' + list[j].amountRange1 + '-' +
												list[j].amountRange2 + '</span></p>';
												if(list[j].periodRange1==list[j].periodRange2){
													titlebox_uls_html += '<p class="appdesc">借款期限：<span class="yellowcolor">' + list[j].periodRange1 + list[j].periodUnit + '内</span></p>';
												}else{
													titlebox_uls_html += '<p class="appdesc">借款期限：<span class="yellowcolor">' + list[j].periodRange1 + '-' +
														list[j].periodRange2 + '' + list[j].periodUnit + '</span></p>';
												}

											titlebox_uls_html += '</div>';
											titlebox_uls_html += '</div>';
											titlebox_uls_html += '<p class="decs">' + list[j].tagline + '</p>';
											titlebox_uls_html += '</div>';
                                        titlebox_uls_html += '</a>';
										titlebox_uls_html += '</li>';
									}
								
							} else {
								// titlebox_uls_html += '<li class="col-md-12 textcenter">暂无数据</div>';
								console.log("没有数据")
							}
							titlebox_uls_html += '</ul>';
							titlebox_uls_html += '</div>';
							$(table).append(titlebox_uls_html);
						}



					}
				}
			})




				//newinformationsBox最新资讯
// 				var params002 = "";
// 				ajax('GET', 'pc/discuss/newinformations', params002).then(res => {
	$.ajax({
	        url:'http://www.youquhua.com:8055/pc/discuss/newinformations',
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
                                //html += '<a href="Discussion/discuss-details.html?' + newlist[i].id  + '">';
								html += '<a href="http://www.youquhua.com/dd/new' + newlist[i].id  + '.html">';
								html += '<li id="'+newlist[i].id+'" ><span class="circle"></span> ' + newlist[i].title + '</li> ';
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



				//首页展示话题列表
// 				var params003 = "";
// 				ajax('GET', 'pc/discuss/showdiscussList', params003).then(res => {
	$.ajax({
	        url:'http://www.youquhua.com:8055/pc/discuss/showdiscussList',
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
					console.log("首页展示话题列表" + JSON.stringify(res));
					if (res.rs == 1) {
						var newlist = res.data.newlist;
						var table = document.body.querySelector('.showdiscussList-ul');
						$(table).html("");
						if (newlist.length > 0) {

							for (var i = 0; i < newlist.length; i++) {
								var html = "";
								html += '<li>';
                                //html += '<a href="Discussion/discuss-details.html?' + newlist[i].id  + '">';
								html += '<a href="http://www.youquhua.com/dd/new' + newlist[i].id  + '.html">';
								html += '<div class="row">';
								html += '<div class="new_con_imgs col-md-3">';
								html += '<img src=' + newlist[i].imgUrl + ' alt="帖子配图" />';
								html += '</div>';
								html += '<div class="new_con_con col-md-9">';
								html += "<h2 class='title'>" + newlist[i].title + "</h2>";
								html += '<div class="">';
								html += '<div class="decs showdiscussList_decs_' + newlist[i].id + '">' + newlist[i].content + ' </div>';
								html += "<button data-falg='false'  class=\"detailsbtn\" type=\"button\">【详情】</button>";
								html += '</div>';
								html += '<div class="datetime">' + newlist[i].createTime + '</div>';
								html += '</div>';
								html += '</div>';
                                html += '</a>';
								html += '</li>';
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

				 //$(".new_con .new_con_con .decs").html(  $(".new_con .new_con_con .decs").substring(html,0,60));


				// 4.5.首页最新口子列表(讨论区最新产品公用)
// 				var params004 = "";
// 				ajax('GET', 'pc/loan/newproducts', params004).then(res => {
	$.ajax({
	        url:'http://www.youquhua.com:8055/pc/loan/newproducts',
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
					console.log("首页最新口子列表(讨论区最新产品公用)" + JSON.stringify(res));
					if (res.rs == 1) {
						var newlist = res.data.list;
						var table = document.body.querySelector('.newproductsBox');
						$(table).html("");
						if (newlist.length > 0) {
							for (var i = 0; i < newlist.length; i++) {
								var html = "";
								html += '<li>';
                                //html += '<a href="loanSupermarket/loanlist-details.html?' + newlist[i].lpLoanproductId + '">';
								html += '<a href="http://www.youquhua.com/dk/loan' + newlist[i].lpLoanproductId + '.html">';
								html += '<div class="newMouth_list">';
								html += '<div class="newMouth_list_details nrow">';
								html += '<img src="' + newlist[i].iconUrl + '" alt="新口子图片" />';
								html += '<div class="appinfo">';
								html += '<h1 class="appname">' + newlist[i].title + '</h1>';
								html += '<p class="appdesc">额度范围： <span class="yellowcolor">' + newlist[i].amountRange1 + '-' + newlist[i].amountRange2 +
									'</span></p>';
							if( newlist[i].periodRange1==newlist[i].periodRange2){
								html += '<p class="appdesc">借款期限：<span class="yellowcolor">' + newlist[i].periodRange1 + newlist[i].periodUnit + '内</span></p>';
							}else{
								html += '<p class="appdesc">借款期限：<span class="yellowcolor">' + newlist[i].periodRange1 + '-' + newlist[i].periodRange2 +
									'' + newlist[i].periodUnit + '</span></p>';
							}	
								
								html += '</div>';
								html += '</div>';
								var tagline =  newlist[i].tagline.replace(/\|/g, '，');
								html += '<p class="newMouth_list_ul_decs">' +tagline+ '</p>';
								html += '</div>';
                                html += '</a>';
								html += '</li>';
								$(table).append(html);
							}

						} else {
							$(table).css("display","none");
						}

					} else {
						console.log("4.5.首页最新口子列表(讨论区最新产品公用)接口请求失败，请稍后再试");
					}
				}


			})


				//友情链接
				// 4.12.[PC端新增首页底部友情链接接口]获取首页底部友情链接
// 				var params_getinterlink = "";
// 				ajax('GET', 'pc/loan/getinterlink', params_getinterlink).then(res => {
		$.ajax({
	        url:'http://www.youquhua.com:8055/pc/loan/getinterlink',
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
					console.log("友情链接接口" + JSON.stringify(res));
					if (res.rs == 1) {
						var newlist = res.data.list;
						var table = document.body.querySelector('.getinterlinkbox');
						if (newlist.length > 0) {
							for (var i = 0; i < newlist.length; i++) {
								var html = "";
								html += '<li id="'+newlist[i].code+'"><a target="_blank" href="'+newlist[i].content+'">'+newlist[i].name+'</a></li>';
								$(table).append(html);
							}

						} else {
							$(table).html("暂无数据");
						}

					} else {
						console.log("友情链接接口接口请求失败，请稍后再试");
					}
				}


			})


	});



			//首页展示话题列表点击详情展示全部
			function viewall(obj, objid) {
				var indx = objid.split("_")[1];
				localStorage.setItem('discussdetailID',indx);
				window.location.href =  "Discussion/discuss-details.html";
				window.event.returnValue=false;

			}
			//首页跳转到贷款产品详情
			// function getproductDetails(lpLoanproductId){
			// 	console.log("lpLoanproductId_"+lpLoanproductId);//
			// 	window.location.href = "loanSupermarket/loanlist-details.html?"+lpLoanproductId;
			// 	window.event.returnValue=false;
			//
			// }
			
			//查看更多跳转贷款超市
			function golist(categoryId){
				window.location.href = "loanList.html?"+categoryId;
				window.event.returnValue=false;
			}
			
			
			// 最新资讯跳转详情
			function newinformations(obj){
				var $thisid  = $(obj).attr("id");
				 localStorage.setItem('discussdetailID',$thisid);
				window.location.href =  "Discussion/discuss-details.html";
				window.event.returnValue=false;
			}
			
			// 跳转我的
		function gomyhelp(){
						/*
						**从缓存中调取用户信息
						*/
						var userinfo = localStorage.getItem("userInfo");
						console.log("userinfo"+userinfo);
						if(userinfo!=null&&userinfo!=""){
							window.location.href = "my/help.html";	
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
						window.location.href = "my/login.html";
						window.event.returnValue=false;
					} 	