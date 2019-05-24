		$(document).ready(function () {
					var lpLoanproductId = window.location.href.split("?")[1]; 
					console.log(lpLoanproductId);

					if(lpLoanproductId == "" || lpLoanproductId == undefined){
						return;
					}

					$("#lpLoanproductId").val(lpLoanproductId);

					// 获取贷款产品详情
					var params = JSON.stringify({
						"lpLoanproductId":lpLoanproductId
					})
					console.log(params);
					// ajax('POST', 'pc/loan/getproduct', params).then(res => {
				$.ajax({
				        url:'http://www.youquhua.com:9055/pc/loan/getproduct',
				        type:'POST',
						xhrFields: {
										withCredentials: true
									},
						data:JSON.stringify({
								"lpLoanproductId":lpLoanproductId
							}),
				        dataType:'json',
				        contentType: "application/json; charset=UTF-8", 
				        timeout:600000,
				        cache:false,
						async:false,
				       	success: function(res){		
						console.log("获取贷款产品详情"+JSON.stringify(res));
						if (res.rs != 1) {
							console.log("获取贷款产品详情"+res.info)
						} else {
							console.log(JSON.stringify(res.data.detail));
							var details = res.data.detail;
							//重置网页标题
                            $('title').html(details.title + "_申请贷款入口 - 有趣花");
                            $("meta[name='description']").attr('content',details.feature);
							//产品名称
							$("#producttitle").html(details.title);
							$("#apylytimes").html(details.apylytimes);
							
							$("#taglineList").html(details.taglineList);
							$("#amountRange1").html(details.amountRange1);
							$("#amountRange2").html(details.amountRange2);
							if(details.rateRange1==details.rateRange2){
								$("#rateRange1").html(details.rateRange1);
								$("#rateRange2").css("display","none");
							}else{
								$("#rateRange1").html(details.rateRange1);
								$("#rateRange2").html("-"+details.rateRange2);
							}
							
							$("#rateUnit").html(details.rateUnit + "%");
							
							
							$("#fasttime").html(details.fasttime);
							$("#iconUrl").attr("src",details.iconUrl);
							
							// 资质要求
							var appliconditionhtml = "";
							for(var i =0;i<details.appliconditionList.length;i++){
								appliconditionhtml+= parseInt(i+1)+"、"+details.appliconditionList[i]+"；";
							}
							
							$("#applicondition").html(appliconditionhtml);
							
							$("#featurebox").html(details.feature);
							$("#descriptionbox").html(details.description);
							$(".targeturlbox").attr("src",details.qrCode);
							
							// console.log("二维码地址是"+res.data.detail.qrCode);
							
							
							//同类产品
							var newlist =res.data.list;
							var table = document.body.querySelector('.lpLoanproduct-recommend');
							if(newlist.length==0){
								$(table).html('<li>暂无数据</li>');
							}else{
								for (var i = 0; i<newlist.length; i++) {
									console.log(newlist);
									var html = "";
									html+='<li>';
                                    //html += '<a href="loanlist-details.html?' + newlist[i].lpLoanproductId  + '">';
									html += '<a href="http://www.edgvip.cn/dk/loan' + newlist[i].lpLoanproductId  + '.html">';
										html+='<div  class="newMouth_list">';
											html+='<div class="newMouth_list_details nrow">';
												html+='<img src="'+newlist[i].iconUrl+'" alt="配图" />';
												html+='<div class="appinfo">';
													html+='<h1 class="appname">'+newlist[i].title+'</h1>';
													if(newlist[i].rateRange1 != newlist[i].rateRange2) {
                                                        html+='<p class="appdesc">费用： <span class="yellowcolor">'+newlist[i].rateRange1+'-'+newlist[i].rateRange2 + newlist[i].rateUnit +'</span></p>';
													}else {
                                                        html+='<p class="appdesc">费用： <span class="yellowcolor">'+newlist[i].rateRange1 + newlist[i].rateUnit +'</span></p>';
													}

													html+='<p class="appdesc">额度范围：<span class="yellowcolor">'+newlist[i].amountRange1+'-'+newlist[i].amountRange2+'</span></p>';
												html+='</div>';
											html+='</div>';
										html+='</div>';
                                    html += '</a>';
									html+='</li>';
									$(table).append(html);
								}
								
							}
							
							
							
							//相关阅读
							var discussListlist =res.data.discussList;
							var discussListtable = document.body.querySelector('.discussListbox');
							if(discussListlist.length==0){
								$(discussListtable).html('<li>暂无数据</li>');
							}else{
								for (var i = 0; i<discussListlist.length; i++) {
									console.log(discussListlist);
									var html = "";
                                    html += '<a href="../dd/new' + discussListlist[i].id  + '.html">';
									html+="<li>";
										html+='<div class="nrow">';
											html+='<h6 class="RelatedRead-list-info">';
												html+='<span></span>';
												html+=discussListlist[i].title;
											html+='</h6>';
											html+='<h6 class="RelatedRead-list-btn nrow">';
												html+='<img src="../static/images/eye.png" alt="配图"/>';
												html+='<span class="NUM">'+discussListlist[i].viewNum+'</span>';
											html+='</h6>';
										html+='</div>';
									html+='</li>';
                                    html += '</a>';
									$(discussListtable).append(html);
								}
								
							}
							
						}
					}
				})
					
			});

		function alerts(){
			$.DialogByZ.Close();
		}
		/**
		 * 立即申请
		 */
		function applyloan() {
			var lpLoanproductId = $("#lpLoanproductId").val();
// 			var params = JSON.stringify({
// 				"lpLoanproductId":lpLoanproductId
// 			})
			// ajax('POST', 'pc/loan/applyloan', params).then(res => {
		$.ajax({
		        url:'http://www.youquhua.com:9055/pc/loan/applyloan',
		        type:'POST',
				xhrFields: {
								withCredentials: true
							},
				data:JSON.stringify({
						"lpLoanproductId":lpLoanproductId
					}),
		        dataType:'json',
		        contentType: "application/json; charset=UTF-8", 
		        timeout:600000,
		        cache:false,
				async:false,
		       	success: function(res){			
               if(res.rs == 1) {
				   $.DialogByZ.Alert({Title: "系统提示", Content: "请用手机扫码",BtnL:"确定",FunL:alerts})
			   }else {
				   $.DialogByZ.Alert({Title: "系统提示", Content: res.info,BtnL:"确定",FunL:alerts})
			   }
			  }
		});
		}
				
				
				//【推荐产品】跳转到贷款产品详情
			function getproductDetails(lpLoanproductId){
				console.log("lpLoanproductId_"+lpLoanproductId);//
				window.location.href = "loanlist-details.html?"+lpLoanproductId;
			}
			
				
				//【推荐阅读】跳转到帖子详情
		function viewall(obj, objid) {
					var indx = objid.split("_")[1];
				 localStorage.setItem('discussdetailID',indx);
				window.location.href =  "../Discussion/discuss-details.html";
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