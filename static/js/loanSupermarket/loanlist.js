//定义一个全局变量
 				var querylabelss = [];
 				var querytypess = [];
 				$(document).ready(function() {


				var str =location.href;
				var num=str.indexOf("?");
				str=str.substr(num+1);

					// 获取贷款列表大分类标签

//  					var params_getclassify = "";
//  					ajax('GET', 'pc/loan/getclassify', params_getclassify).then(res => {
	$.ajax({
	        url:'https://www.youquhua.com/pc/loan/getclassify',
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

 							console.log("4.6.获取贷款列表大分类标签" + res.data.list);
 							console.log("4.6.获取贷款列表大分类标签" + JSON.stringify(res));
 							var newlist = res.data.list;
 							var table = document.body.querySelector('.getclassifybox');
							$(table).html("");
 							for (var i = 0; i < newlist.length; i++) {
 								var html = "";
 								html += '<button onclick="getbigclass(\'' + newlist[i].code + '\');" type="button">';
 								html += '<img src="../static/images/loanlist_btn0' + (i + 1) + '.png" alt="配图"/>';
 								html += '<span class="text"> <span class="icons"><img src="' + newlist[i].content + '" alt="配图" ></span> ' +
 									newlist[i].name + '</span>';
 								html += '</button>';
 								$(table).append(html);
 								if (i == 0) {
 									var codes = newlist[i].code;
 									if(!isNaN(parseInt(str))){
										getbigclass(str);
									}else{
										getbigclass(codes);
									}
 								}
 							}

 						} else {
 							console.log("4.6.获取贷款列表大分类标签请求失败，请稍后再试");
 						}
 					}
 				})



 					// 获取贷款列表页子分类标签

//  					var params_getquerylabels = "";
//  					ajax('GET', 'pc/loan/getquerylabels', params_getquerylabels).then(res => {
	$.ajax({
	        url:'https://www.youquhua.com/pc/loan/getquerylabels',
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
 							console.log("获取贷款列表页子分类标签" + res.data.list);
 							var newlist = res.data.list;
 							var table = document.body.querySelector('.getquerylabelsBox');
							$(table).html("");
 							for (var i = 0; i < newlist.length; i++) {
 								var html = "";
 								html += '<div class="col-md-2">';
 								html += '<div style="display:flex">';
 								html += '<input  onchange="getsmallclass(this,\'' + newlist[i].code +
 									'\');" type="checkbox" name="cate_menu_checks" id=""/>';
 								html += '<span class="text">' + newlist[i].name + '</span>';
 								html += '</div> ';
 								html += '</div> ';
 								$(table).append(html);
 							}

 						} else {
 							console.log("获取贷款列表页子分类标签请求失败，请稍后再试");
 						}
 					}

 				})
});
 				//点击不限，清空小分类
 				function buxian() {
 					querylabelss = [];
 					$(".getquerylabelsBox input[type=checkbox]").prop("checked", false);
 					querytypess[0] = localStorage.getItem('code');
 					getproducts2(querytypess, querylabelss);
 				}

 				//选择大分类
 				function getbigclass(code) {
 					//置空原先的数据
 					$('.getproducts2Box').html("");
 					querytypess[0] = code;

 					//把大标签放到缓存
 					localStorage.setItem('code', code);

 					getproducts2(querytypess, querylabelss);
 				}

 				//选择小标签
 				function getsmallclass(obj, code) {
 					//置空原先的数据
 					$('.getproducts2Box').html("");
 					//dabiaoqian
 					if ($(obj).prop("checked")) {
 						//添加到数组
 						querylabelss.push(code);
 					} else {
 						//数组中移除
 						//						querylabelss.remove(code);
 						querylabelss.splice($.inArray(code, querylabelss), 1);
 					}
 					console.log(querylabelss);

 					querytypess[0] = localStorage.getItem('code');
 					getproducts2(querytypess, querylabelss);
 				}


 				function getproducts2(querytype, querylabels) {

 					// 获取贷款产品列表
//  					var params_getproducts2 = JSON.stringify({
//  						"querytype": querytype, // 大分类菜单的code
//  						"querylabels": querylabels // 查询标签的的code
//  					});

 					console.log("querytype" + querytype);
 					console.log("querylabels" + querylabels);
//  					ajax('POST', 'pc/loan/getproducts2', params_getproducts2).then(res => {
		$.ajax({
	        url:'https://www.youquhua.com/pc/loan/getproducts2',
	        type:'POST',
			xhrFields: {
							withCredentials: true
						},
			data:JSON.stringify({
 						"querytype": querytype, // 大分类菜单的code
 						"querylabels": querylabels // 查询标签的的code
 					}),
	        dataType:'json',
	        contentType: "application/json; charset=UTF-8", 
	        timeout:600000,
	        cache:false,
			async:false,
	       	success: function(res){	
 						console.log(res)
 						if (res.rs == 1) {
 							var newlist = res.data.list;
 							var table = document.body.querySelector('.getproducts2Box');
							$(table).html("");
 							if (newlist.length == 0) {
 								$(table).html('<tr><td colspan="6">暂无数据</td></tr>');
 							} else {
 								for (var i = 0; i < newlist.length; i++) {
 									var html = "";
 									html += '<tr>';
 									html += '<td>';
                                    //html += '<a href="loanlist-details.html?' + newlist[i].lpLoanproductId  + '">';
									html += '<a href="https://www.youquhua.com/dk/loan' + newlist[i].lpLoanproductId  + '.html">';
 									html += '<div class="appinfo">';
 									html += '<img src="' + newlist[i].iconUrl + '" alt="配图"  onclick="getproductDetails(' + newlist[i].lpLoanproductId +');" />';
 									html += '<span class="appdetails">' + newlist[i].title + '</span>';
 									html += '</div>';
                                    html += '</a>';
 									html += '</td>';
 									html += '<td>';
 									html += '<span class="Amount  yellColor">' + newlist[i].amountRange1 + '-' + newlist[i].amountRange2 +
 										'元</span>';
 									html += '</td>';
 									html += '<td>';
 									html += '<p class="Amountdecs">' + newlist[i].description + '</p>';
 									html += '</td>';
 									if (newlist[i].rateRange1 != newlist[i].rateRange2) {
 										html += '<td class="proportion">' + newlist[i].rateRange1 + '-' + newlist[i].rateRange2 + '每' + newlist[i]
 											.rateUnit + '</td>';
 									} else {
 										html += '<td class="proportion">' + newlist[i].rateRange1 + '每' + newlist[i].rateUnit + '</td>';
 									}
 									html += '<td class="number">' + newlist[i].apylytimes + '</td>';
 									html += '<td>';
                                    //html += '<a href="loanlist-details.html?' + newlist[i].lpLoanproductId  + '">';
									html += '<a href="https://www.youquhua.com/dk/loan' + newlist[i].lpLoanproductId  + '.html">';
 									html += '<button  class="checkDetailbutn" type="button">查看详情</button>';
                                    html += '</a>';
 									html += '</td>';
 									html += '</tr>';
 									$(table).append(html);
 								}
 							}
 							

 						} else {
 							console.log("获取贷款产品列表请求失败，请稍后再试");
 						}
						}
 					})
 				}

 				//跳转到贷款产品详情
 				function getproductDetails(lpLoanproductId) {
 					console.log("lpLoanproductId_" + lpLoanproductId); //
 					window.location.href = "loan"+ lpLoanproductId+ ".html";
					window.event.returnValue=false;

 				}

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