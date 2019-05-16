$(document).ready(function() {
				if($(window).width()>768&&$("#conR").height()>$("#navL").height()){
					$("#navL").height($("#conR").height());
				}else{
					$(".myRecordBox").css("background","transparent");
				}



				var userinfo = JSON.parse(localStorage.getItem("userInfo"));

				if(userinfo == null || userinfo == ""){
					$.DialogByZ.Alert({Title: "系统提示", Content: "您未登录，请前去登录",BtnL:"确定",FunL:closeAndToLogin})
					return;
				}
				console.log(userinfo);
				var avatar = userinfo.avatar;
				var nickName = userinfo.nickName;
				if(avatar!=null){
					$("#avatar").attr("src",avatar);
				}
				//带入默认昵称
				$("#nickName").html(nickName);
				//修改头像
				var preview = document.querySelector('#avatar');
				var eleFile = document.querySelector('#avatarfile');
				eleFile.addEventListener('change', function() {
						var file = this.files[0];                
						// 确认选择的文件是图片                
						if(file.type.indexOf("image") == 0) {
							var reader = new FileReader();
							reader.readAsDataURL(file);                    
							reader.onload = function(e) {
								// 图片base64化
								var newUrl = this.result;
								preview.src= newUrl;
								
								
// 							  let params = JSON.stringify({
// 								 "myfile" :e.target.result ,
// 							   })
							   var formData = new FormData();
                              formData.append("myfile", file);

							 ajaxFile('POST', 'pc/content/upload', formData).then(res => {
										if(res.rs===1) {
											  var url  = res.data;
											   var userinfo = JSON.parse(localStorage.getItem("userInfo"));
											   userinfo.avatar = url;
												 //放入前端session共享
											   localStorage.setItem('userInfo',JSON.stringify(userinfo));//将当前登录人信息存到localstorage中
												//放入cookie
												setCookie("userinfo",JSON.stringify(userinfo),1);
										}else {
										  //alert(res.info);
											$.DialogByZ.Alert({Title: "系统提示", Content: res.info,BtnL:"确定",FunL:close})
										}
									})  
							
							};
						}
            });

				
			});
			

					
//修改昵称
function modifynickName(){
	$("#nickName").css("display","none");
	$("#phone").css("display","block");
	console.log("22")
}

function setnick(){
	$("#nickName").css("display","block");
	$("#phone").css("display","none");
	$("#nickName").html($("#phone").val());
	$("#phone").val("");
	console.log($("#nickName").html());
	var params = JSON.stringify({
                "newNick" : $("#nickName").html(),
            })
	 ajax('POST', 'pc/content/setnick', params).then(res => {
                if(res.rs === 1 ) {
					var userinfo = JSON.parse(localStorage.getItem("userInfo"));
					userinfo.nickName = $("#nickName").html();
                    //放入前端session共享
                    localStorage.setItem('userInfo',JSON.stringify(userinfo));//将当前登录人信息存到localstorage中
                	//放入cookie
                	setCookie("userinfo",JSON.stringify(userinfo),1);
                }else {
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
							function close(){
								$.DialogByZ.Close();
							}
							
							function closeAndToLogin() {
								$.DialogByZ.Close();
								window.location.href = "login.html";
								window.event.returnValue=false;
							} 	