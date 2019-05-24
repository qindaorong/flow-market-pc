 $(document).ready(function () {
        var domain = 'http://www.youquhua.com:8055/';
        var validCode = true;  //是否能发送验证码

        //点击获取验证码
        $('.getvercodebtn').click(function(){
            var phone = $('#phone').val();//输入框中的值
            var reg = /^1[345678][0-9]{9}$/; //验证规则
            if (phone == '') {
				alert('请填写手机号!');
                //this.$toast({message:'请填写手机号!', duration: 1000});
                return;
            }
            if (!reg.test(phone)) {
				alert('请填写正确的手机号!');
                //this.$toast({message:'请填写正确的手机号!', duration: 1000});
                return;
            }
            var time = 60;
            var $code = $(this);
            if (validCode) {
                validCode = false;
                var t = setInterval(function () {
                    time--;
                    $code.val(time + "秒");
                    if (time == 0) {
                        clearInterval(t);
                        $code.val("获取验证码");
                        validCode = true;
                    }
                }, 1000)
            }
            var params = JSON.stringify({"mobilePhone": phone});
            ajax('POST', 'pc/user/getvcode', params).then(res => {
                if (res.rs != 1) {
				
                    // this.$toast({message:'获取验证码错误!', duration: 1000});
                    alert('验证码获取失败，请重新获取!')
                } else {
                    //this.$toast({message:'验证码已发送，请注意查收!', duration: 1000});
                  //  alert('验证码已发送');
                }
            })
        })

        //点击重置密码按钮
        $(".resetBtn").click(function(){
            var phone = $('#phone').val();//输入框中的值
            var vCode = $('#vCode').val();
            var newPwd = $('#newPwd').val();
            var sureNewPwd = $('#surePwd').val();
            //参数校验
            var reg = /^1[345678][0-9]{9}$/; //验证规则
            if (phone == "") {
                alert("请填写手机号");
                return;
            }
            if(!reg.test(phone)){
                alert("请填写正确的手机号")
                return;
            }
            if (vCode == "") {
                alert("请填写验证码");
                return;
            }
            if (newPwd == "") {
                alert("请输入新密码");
                return;
            }
            if (newPwd.length < 6) {
                alert("新密码不能低于6位");
                return;
            }
            if (newPwd.length >10) {
                alert("新密码不能高于10位");
                return;
            }
            if (sureNewPwd == "") {
                alert("请填写确认密码");
                return;
            }
            if (newPwd != sureNewPwd) {
                alert("两次密码不一致");
                return;
            }
            var params = JSON.stringify({
                "mobilePhone":phone,
                "password":newPwd,
                "vCode":vCode

            })
            ajax('POST', 'pc/user/resetpwd', params).then(res => {
                if(res.rs===1) {
                   window.location.href = "login.html";
				   window.event.returnValue=false;
                }else {
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