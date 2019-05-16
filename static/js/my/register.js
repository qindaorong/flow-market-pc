			$(document).ready(function() {
				var validCode = true; //是否能发送验证码

				//点击获取验证码
				$('.getvercodebtn').click(function() {
					var phone = $('#phone').val(); //输入框中的值
					var reg = /^1[345678][0-9]{9}$/; //验证规则
					if(phone == '') {
						alert('请填写手机号!');
						//this.$toast({message:'请填写手机号!', duration: 1000});
						return;
					}
					if(!reg.test(phone)) {
						alert('请填写正确的手机号!');
						//this.$toast({message:'请填写正确的手机号!', duration: 1000});
						return;
					}
					var time = 60;
					var $code = $(this);
					if(validCode) {
						validCode = false;
						var t = setInterval(function() {
							time--;
							$code.val(time + "秒");
							if(time == 0) {
								clearInterval(t);
								$code.val("获取验证码");
								validCode = true;
							}
						}, 1000)
					}
					var params = JSON.stringify({
						"mobilePhone": phone
					});
					ajax('POST', 'pc/user/getvcode', params).then(res => {
						if(res.rs != 1) {
							// this.$toast({message:'获取验证码错误!', duration: 1000});
							alert('验证码获取失败，请重新获取!')
						} else {
							//this.$toast({message:'验证码已发送，请注意查收!', duration: 1000});
						//	alert('验证码已发送');
						}
					})
				})

				//点击注册按钮进行注册
				$(".loginbtn").click(function() {
					
					
					
					var phone = $('#phone').val(); //输入框中的值
					var vCode = $('#vCode').val();
					var vpassword = $('#InputPassword').val();
					var InputRepassword = $('#InputRepassword').val();
					
					
					if(!$("#cate_menu_checks").prop('checked')){
						alert('请阅读条款!');
						return;
					}
					//参数校验
					if(phone == "") {
						alert('请填写手机号!');
						return;
					}
					if(vCode == "") {
						alert('请填写验证码!');
						return;
					}
					if(vpassword.value!=InputRepassword.value){
                       oError.innerHTML="密码不一致";
                    return;
                    }
					
					 
					var params = JSON.stringify({
						"mobilePhone": phone,
						"password": vpassword,
						"vCode": vCode
					})
					
					ajax('POST', 'pc/user/register', params).then(res => {
						console.log(res);
						if(res.rs === 1) {
							var user = res.data.user;
							console.log("user-------" + user);
							//放入前端session共享
							localStorage.setItem('userInfo', JSON.stringify(user)); //将当前登录人信息存到localstorage中
								//放入cookie
                  			setCookie("userinfo",JSON.stringify(user),1);
							localStorage.setItem('userphonenum', phone); //将当前登录人手机号名存到localstorage中
							localStorage.setItem('userpassword', vpassword); //将当前登录人密码存到localstorage中
							window.location.href = 'normalLogin.html'; //注册成功跳转到登录
						} else  if(res.rs === 2){
							alert(res.info);
							localStorage.setItem('userphonenum', phone); //将当前登录人手机号名存到localstorage中
							localStorage.setItem('userpassword', vpassword); //将当前登录人密码存到localstorage中
							window.location.href = 'normalLogin.html'; //注册成功跳转到登录
						}else{
							alert(res.info);
						}
					})

				})
			});
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