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
			var avatar = userinfo.avatar;
			var userName = userinfo.userName;
			var nickName = userinfo.nickName;
			if (avatar != null) {
				$("#avatar").attr("src", avatar);
			}
			//带入默认昵称
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
							if (res.rs === 1) {
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
			// 初始化列表
			getrecord(1);

		});
		// 获取关注列表
		function getrecord(num) {
			// 获取我的关注列表
			var params_getmyconcerns = JSON.stringify({
				"start": num,
				"limit": 10,
			});
			ajax('POST', 'pc/loan/getmyconcerns', params_getmyconcerns).then(res => {
				console.log(res);
				if (res.rs == 1) {
					console.log("获取我的关注列表" + res.data.list);
					var newlist = res.data.list;
					var total = res.data.total;
					if(newlist.length>0){
						var table = document.body.querySelector('.getmyconcernsBox');
						var html = "";
						for (var i = 0; i < newlist.length; i++) {

						
							html += '<li>';
							html += '<div class="nrow Product-Recommend-list-con">';
							html += '<div class="details nrow">';
							html += '<img src="' + newlist[i].iconUrl + '" alt="配图" />';
							html += '<div class="">';
							html += '<h4 class="title">' + newlist[i].title + '</h4>';
							var list = newlist[i].taglineList;
							if(list != null && list.length > 0){
                                html += '<p class="details">';
                                list.forEach(item =>{
                                    html += '<span class="circle"></span> ' + item + ' ';
								});

                                html += '</p>';
							}

							html += '</div>';
							html += '</div>';
							html += '<button id="'+newlist[i].lpLoanproductId+'" onclick="applynow(this)" class="buttons" type="button">立即申请</button>';
							html += "<span onclick=\"deletegetclassify('getclassifyid_" + newlist[i].lpLoanproductId +
								"')\" class=\"delete\"><img src=\"../static/images/delete.png\" alt=\"配图\" /></span>";
							html += '</div>';
							html += '</li>';

						}
						$(table).html(html);
						//分页
						$("#page").paging({
							pageNo: num,
							totalPage: total,
							totalSize: "",
							callback: function(num) {
								getrecord(num);
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
						FunL: close
					})
				}


			})
		}




		//删除我的关注
		function deletegetclassify(objindex) {
			var id = objindex.split("_")[1];
			var params_deleteconcern = JSON.stringify({
				"lpLoanproductId": id
			});
			console.log(params_deleteconcern);
			ajax('POST', 'pc/loan/deleteconcern', params_deleteconcern).then(res => {
				if (res.rs == 1) {
					getrecord(localStorage.getItem("num"));
					$.DialogByZ.Alert({
						Title: "系统提示",
						Content: res.info,
						BtnL: "确定",
						FunL: closeAndReload
					})
				} else if (res.rs == 3) {
					$.DialogByZ.Alert({
						Title: "系统提示",
						Content: res.info,
						BtnL: "确定",
						FunL: close
					})
				} else {
					$.DialogByZ.Alert({
						Title: "系统提示",
						Content: res.info,
						BtnL: "确定",
						FunL: close
					})
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




		//修改昵称
		function modifynickName() {
			$("#nickName").css("display", "none");
			$("#phone").css("display", "block");
			console.log("22")
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
					//放入cookie
					setCookie("userinfo", JSON.stringify(userinfo), 1);
				} else {
					alert(res.info);
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
							function closeAndReload() {
								$.DialogByZ.Close();
								location.reload();
							}
							function close(){
								$.DialogByZ.Close();
							}
							
							function closeAndToLogin() {
								$.DialogByZ.Close();
								window.location.href = "login.html";
								window.event.returnValue=false;
							} 	