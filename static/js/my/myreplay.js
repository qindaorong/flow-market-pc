$(document).ready(function() {
					var userinfo = JSON.parse(localStorage.getItem("userInfo"));

					if (userinfo == null || userinfo == "") {
						$.DialogByZ.Alert({
							Title: "系统提示",
							Content: "您未登录，请前去登录",
							BtnL: "确定",
							FunL: closeAndToLogin
						})
						return;
					}
					//带入默认昵称
					var avatar = userinfo.avatar;
					var nickName = userinfo.nickName;
					if (avatar != null) {
						$("#avatar").attr("src", avatar);
					}
					$("#nickName").html(nickName);
					//修改头像
					var preview = document.querySelector('#avatar');
					var eleFile = document.querySelector('#avatarfile');
					eleFile.addEventListener('change', function() {
						var file = this.files[0];
						// 确认选择的文件是图片
						if (file.type.indexOf("image") == 0) {
							var reader = new FileReader();
							reader.readAsDataURL(file);
							reader.onload = function(e) {
								// 图片base64化
								var newUrl = this.result;
								preview.src = newUrl;
								var formData = new FormData();
								formData.append("myfile", file);

								ajaxFile('POST', 'pc/content/upload', formData).then(res => {
									if (res.rs == 1) {
										var url = res.data;
										var userinfo = JSON.parse(localStorage.getItem("userInfo"));
										userinfo.avatar = url;
										//放入前端session共享
										localStorage.setItem('userInfo', JSON.stringify(userinfo)); //将当前登录人信息存到localstorage中
										//放入cookie
										setCookie("userinfo", JSON.stringify(userinfo), 1);
									} else {
										//alert(res.info);
										$.DialogByZ.Alert({
											Title: "系统提示",
											Content: res.info,
											BtnL: "确定",
											FunL: close
										})
									}
								})

							};
						}
					});


				// 初始化我的回复列表
				getmyreply(1);
				});

				// 获得我的回复

				function getmyreply(num) {
					// 获取我的回复信息
					var params_getmyreplys = JSON.stringify({
						"start": 1,
						"limit": 10,
					});
					ajax('POST', 'pc/discuss/getmyreplys', params_getmyreplys).then(res => {
						if (res.rs == 1) {
							var newlist = res.data.list;
							var totalnum = res.data.total; //页数
							var table = document.body.querySelector('.getmyreplysBox');
							var html = "";
							if (newlist.length > 0){

								for (var i = 0; i < newlist.length; i++) {

									html += '<li>';
									html += '<div class="row">';
									html += '<div class="new_con_imgs col-md-3">';
									html += '<img src="' + newlist[i].imgUrl + '" alt="配图" />';
									html += '</div>';
									html += '<div class="new_con_con col-md-9">';
									html += '<h2 class="title">' + newlist[i].title + '</h2>';
									html += '<div class="myreplaycontent">';
									html += '<span class="decs">' + newlist[i].content + ' </span>';
									html += '</div>';
                                    //html += '<a href="../Discussion/discuss-details.html?' + newlist[i].id  + '">';
									html += '<a href="../dd/new' + newlist[i].id  + '.html">';
									html += "<button data-falg='false' class=\"detailsbtn\" type=\"button\">【详情】</button>";
                                    html += '</a>';
									html += '<div class="datetime">' + newlist[i].createTime + '</div>';
									html += '</div>';
									html += '</div>';
									html += '</li>';

								}
								//分页
								$(table).html(html);
								$("#page").paging({
									pageNo: num,
									totalPage: totalnum,
									totalSize: "",
									callback: function(num) {
										getmyreply(num);
										localStorage.setItem("num",num);
									}
								})


							}
							if ($(window).width() > 768 && $("#conR").height() > $("#navL").height()) {
								$("#navL").height($("#conR").height());
							} else {
								$(".myRecordBox").css("background", "transparent");
							}
						} else if (res.rs == 3) {
							$.DialogByZ.Alert({
								Title: "系统提示",
								Content: res.info,
								BtnL: "确定",
								FunL: closeAndToLogin
							})
						} else {
							$.DialogByZ.Alert({
								Title: "系统提示",
								Content: res.info,
								BtnL: "确定",
								FunL: closeAndToLogin
							})
						}
					})
				}




				//首页展示话题列表点击详情展示全部
				function viewall(obj, objid) {
					var indx = objid.split("_")[1];
					localStorage.setItem('discussdetailID', indx);
					window.location.href = "../Discussion/discuss-details.html";

				}



				//修改昵称
				function modifynickName() {
					$("#nickName").css("display", "none");
					$("#phone").css("display", "block");
				}

				function setnick() {
					$("#nickName").css("display", "block");
					$("#phone").css("display", "none");
					$("#nickName").html($("#phone").val());
					$("#phone").val("");
					console.log($("#nickName").html());
					var params = JSON.stringify({
						"newNick": $("#nickName").html(),
					})
					ajax('POST', 'pc/content/setnick', params).then(res => {
						if (res.rs === 1) {
							var userinfo = JSON.parse(localStorage.getItem("userInfo"));
							userinfo.nickName = $("#nickName").html();
							//放入前端session共享
							localStorage.setItem('userInfo', JSON.stringify(userinfo)); //将当前登录人信息存到localstorage中
							// //放入cookie
							setCookie("userinfo", JSON.stringify(userinfo), 1);
						} else {
							$.DialogByZ.Alert({
								Title: "系统提示",
								Content: res.info,
								BtnL: "确定",
								FunL: closeAndToLogin
							})
						}
					})
				}



	function gomyhelp(){
								/*
								**从缓存中调取用户信息
								*/
								var userinfo = localStorage.getItem("userInfo");
								// var cookieuserinfo = getCookie("userInfo");
								console.log("userinfo"+userinfo);
								if(userinfo!=null&&userinfo!=""){
									window.location.href = "help.html";	
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
								window.location.href = "login.html";
								window.event.returnValue=false;
							} 	