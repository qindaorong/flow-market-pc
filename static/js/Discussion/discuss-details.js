			var userInfo = localStorage.getItem('userInfo'); //浏览器缓存用户
			var commentList = null;
			
			$(document).ready(function() {
                var discussdetailID = window.location.href.split("?")[1];

				var hiddenId = $("#discussdetailID").val();
                if( hiddenId != null && hiddenId != '' && hiddenId  != undefined){

				}else{
					$("#discussdetailID").val(discussdetailID);
				}


				//处理是否可以评论帖子
				$("#noLoginTip").hide();
				$("#commentInput").show();
				$("#commentBtn").show();
                ajax('GET', 'pc/user/getuserinfo', "").then(res => {
                    if(res.rs == 1) {
                        userInfo = res.data.user;

                    }else {
                        userInfo =  null;
                    }
                    if(null == userInfo) {
                        $("#noLoginTip").show();
                        $("#commentInput").hide();
                        $("#commentBtn").hide();
                    }
                    //放入前端session共享
                    localStorage.setItem('userInfo',JSON.stringify(userInfo));//将当前登录人信息存到localstorage中
                    //放入cookie
                    setCookie("userinfo",JSON.stringify(userInfo),1);
                }).catch((res) => {
                    userInfo =  null;
                    if(null == userInfo) {
                        $("#noLoginTip").show();
                        $("#commentInput").hide();
                        $("#commentBtn").hide();
                    }
                    //放入前端session共享
                    localStorage.setItem('userInfo',JSON.stringify(userInfo));//将当前登录人信息存到localstorage中
                    //放入cookie
                    setCookie("userinfo",JSON.stringify(userInfo),1);
                });


				// 5.3.获取讨论区帖子详情

                var discussdetail_params = JSON.stringify({
				    "id" : discussdetailID,
					
				})
				ajax('POST', 'pc/discuss/detail', discussdetail_params).then(res => {
					console.log("讨论区帖子详情"+JSON.stringify(res));
					 if (res.rs == 1) {
   						var detail = res.data.detail;
                         //重置网页标题
                         $('title').html(detail.title + "- 贷款口子 - 有趣花");
                         $("meta[name='description']").attr('content',detail.describes);
   						/*
   						 *帖子详情（头像、昵称、时间、内容、浏览数量、评论数量）
   						 * 
   						 */
   						$("#title").html(detail.title);
   						$("#avatar").attr("src",detail.avatar);
   						$("#name").html(detail.name);
   						$("#createTime").html(forlataTime(detail.createTime));
   						$("#viewNum").html(detail.viewNum);
   						$("#commentNum").html(detail.commentNum);
   						$("#content").html(detail.content);
   						
   						//推荐产品
   						var table = document.body.querySelector('.discussList-ul');
   						
						var productList = res.data.list;

   						if (productList.length>0) {
   							for (var i = 0; i < productList.length; i++) {
								var product = productList[i];
   								var html = "";
   								html += '<li>';
								html += '<div class="nrow Product-Recommend-list-con">';
									html += '<div class="details nrow">';
										html += '<img src="'+product.iconUrl+'" alt="配图"/>';
										html += '<div class="">';
											html += '<h4 class="title">' + product.title + '</h4>';
											html += '<p class="details">额度： <span class="yellColor">'+product.amountRange1+'-'+product.amountRange2+'元</span>';
												html += '<span class="circle"></span>'+product.fasttime+'';
										
										if(product.appliconditionList!=null&&product.appliconditionList!=undefined&&product.appliconditionList!=""){
											html += '<span class="circle"></span>'+product.appliconditionList+' </p>';
										}else{
											html += '</p>';
										}
										html += '</div>';
									html += '</div>';
									html += '<button id="'+product.lpLoanproductId+'" class="buttons" onclick="applynow(this)" type="button">立即申请</button>';
								html += '</div>';
							html += '</li>';
   							$(table).append(html);
   							}
   				
   						} else {
     							$(table).html('<li><div class="nrow Product-Recommend-list-con">暂无可推荐产品</div></li>');
   						}
   						
   						
   						
   						
   					} else {
   						console.log("获取讨论区帖子详情请求失败，请稍后再试");
   					}
				
				
				})
				
				//初始化评论列表
				commnetList(1);

				
			});
			function close(){
				$.DialogByZ.Close();
			}

			function closeAndToLogin() {
				$.DialogByZ.Close();
				window.location.href = "../my/login.html";
				window.event.returnValue=false;
			}
				//评论
			function comment(){
				var content =  $("#commentTxt").val();
				if(content == "" || content == null) {
					$.DialogByZ.Alert({Title: "系统提示", Content: "请填写您的评论内容",BtnL:"确定",FunL:close})
					return;
				}

				var comment_params = JSON.stringify({
					"id": $("#discussdetailID").val(),  // 帖子id
					"commentId": '', //评论id
					"replyId":'', //回复Id 
					"content":content,//
				})
				ajax('POST', 'pc/discuss/comment', comment_params).then(res => {
					console.log("评论" + JSON.stringify(res));
					 if (res.rs == 1) {
						 //把信息清空
						 $("#commentTxt").val("");
						commnetList(localStorage.getItem("num"));
					 }else if(res.rs==3){
						 $.DialogByZ.Alert({Title: "系统提示", Content: "登录信息已失效，前往登录",BtnL:"确定",FunL:closeAndToLogin})
						 $("#noLoginTip").show();
						$("#commentInput").hide();
						$("#commentBtn").hide();
					 }
				})
			}
			
			/**
			 * 展现回复
			 * id: 评论id
			 */
			function showreplay(id) {
				
				//判断是否登录

				userInfo = localStorage.getItem('userInfo'); //浏览器缓存用户
				if(null == userInfo) {
					$.DialogByZ.Alert({Title: "系统提示", Content: '先去登录才可以回复',BtnL:"确定",FunL:close})
				}else{
					$("#replay_" + id).show();
				}
				
			}

			/**
			 * 回复评论
			 * id: 回复id
			 */
			function replay(id) {
				var content =  $("#replay_txt_" + id).val();
				if(content == "" || content == null) {
					//alert("回复内容不能为空!");
					$.DialogByZ.Alert({Title: "系统提示", Content: "回复内容不能为空!",BtnL:"确定",FunL:close})
					return;
				}
				
				var comment_params = JSON.stringify({
						"id":$("#discussdetailID").val() , // 帖子id
						"commentId": id, //评论id
						"replyId":'', //回复Id 
						"content":content,//
				});
				console.log(comment_params);
				ajax('POST', 'pc/discuss/comment', comment_params).then(res => {
					console.log("评论" + JSON.stringify(res));
					 if (res.rs == 1) {
						 //把信息清空
						 $("#replay_txt_" + id).val("");
                         //刷新列表数据
                         commnetList(localStorage.getItem("num"));
//						this.commnetList(localStorage.getItem("num"));
					 }else if(res.rs==3){
						 //alert("登录信息已失效，前往登录。");
						 $.DialogByZ.Alert({Title: "系统提示", Content: "登录信息已失效，前往登录",BtnL:"确定",FunL:closeAndToLogin});
						 $("#noLoginTip").show();
						 $("#commentInput").hide();
						 $("#commentBtn").hide();
					 }
				})
			}
			
				//评论列表5.4.[PC版和H5版接口一致]获取评论列表
				/*	
				 * {
					"start": 1, //分页开始页  必填
					"limit":10,//当前页共显示多少条  必填
					"id":localStorage.getItem('discussdetailID') // 帖子id  在帖子详情页必填  
				}*/
			
			function commnetList(num){
				var commentlist_params = JSON.stringify({
					"start": num, 
					"limit":10,
					"id":$("#discussdetailID").val()
				})
				var commentlistcon = document.body.querySelector('.commentlistcon');
				ajax('POST', 'pc/discuss/commentlist', commentlist_params).then(res => {
					console.log("获取评论列表" + JSON.stringify(res));
					 if (res.rs == 1) {
					 	var datalist = res.data.list;
						var totalnum =res.data.total;
					 	var html = "";
					 	if(datalist.length>0){
					 		for (var i = 0; i < datalist.length; i++) {
								var detail = datalist[i];
							
								html += '<div class="Comment-content Comment-content-reset">';
								   
								    html += (detail.avatar == null||detail.avatar==""||detail.avatar==undefined) ? '<img class="Comment-content-Avatar" src="../static/images/avatars.png"/>' 
									                                   : '<img class="Comment-content-Avatar" src="'+ detail.avatar +'"/>';
									html += '<div class="Comment-content-con">';
										html += '<div class="nrow">';
											html += '<div class="Comment-content-userinfo">';
												html += '<h4>'+ detail.name +'</h4>';
												html += '<p>发表于' + forlataTime(detail.createTime) + '</p>';
											html += '</div>';
											html += '<div class="Comment-content-btns">';
												html += '<button type="button" id="'+detail.diCommentId+'" onclick="showreplay(this.id)"> 回复</button>';
												html += '<button type="button">  举报</button>';
											html += '</div>';
											
										html += '</div>';
										html += '<p class="Comment-content-con-con">' + detail.content + '</p>';
										/*
										 * replyList 
										 */
										if(detail.replyList != undefined && detail.replyList != null && detail.replyList.length > 0) {
											html += '<ul class="Comment-content-con-list">';
											    var replyList = detail.replyList;
												replyList.forEach(r => {
													html += '<li>';
														html += '<div class="nrow usernicknamebox">';
															html += (r.fromUserAvatar == null||r.fromUserAvatar==""||r.fromUserAvatar==undefined) ? '<img class="avatar" src="../static/images/avatars.png"/>' 
															                                                                              : '<img class="avatar" src="' + r.fromUserAvatar + '"/>';
															html += '<span class="usernickname">' + r.fromUserName + '：</span>';
															html += r.content;
														html += '</div>';
														html += '<p class="timedate">'+forlataTime(parseInt(r.createTime))  +'</p>';
													html += '</li>';
												});
											html += '</ul>';
										}
										
										
										html += '<div id="replay_'+detail.diCommentId+'" style="display:none;">';
											html += '<div class="say">';
												html += '<textarea id="replay_txt_' + detail.diCommentId + '" name="" rows="" cols="" placeholder="我也说两句..."></textarea>';
											html += '</div>';
											html += '<div class="huifu">';
												html += '<button  onclick="replay(' + detail.diCommentId  + ')" class="saybtn" type="button">回复</button>';
											html += '</div>';
										html += '</div>';
										
									html += '</div>';
								html += '</div>';
									
								
							}
					 		
							
							
							//分页
									$("#page").paging({
										pageNo: num,
										totalPage: totalnum,
										totalSize: "",
										callback: function(num) {
											commnetList(num);
											localStorage.setItem("num",num)
										}
									})
					 	}else{
					 		//$(commentlistcon).html('<div class="nrow Comment-content">暂无数据</div>');
					 	}
						$(commentlistcon).html(html);
						
						
					
					 }
					
				})
			}

			
			/*
			 * 立即申请
			 */
			function applynow(obj){
				var lpLoanproductId = $(obj).attr("id");
				
				var comment_params = JSON.stringify({
					"lpLoanproductId":$(obj).attr("id") ,
				})
				ajax('POST', 'pc/loan/applyloan', comment_params).then(res => {
					console.log("立即申请" + JSON.stringify(res));
					if (res.rs == 1) {
						$.DialogByZ.Alert({Title: "系统提示", Content: res.info,BtnL:"确定",FunL:close})
					}else{
						$.DialogByZ.Alert({Title: "系统提示", Content: res.info,BtnL:"确定",FunL:close})
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
			



















