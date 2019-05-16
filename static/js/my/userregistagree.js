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