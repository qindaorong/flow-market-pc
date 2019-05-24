function moduleLoad(url) {
				    $.get(url, function (result) {
				        var html = $(result);
				        var __templates = html;
				        $("[slot]").each(function () {
				            var id = $(this).attr('slot');
				            var body = $(__templates).find('#' + id).html();
				            $(this).html(body);
				        });
				    });
				}

var domain = 'http://www.youquhua.com:8055/';
				function ajax(method, url, param) {
				
					return new Promise(function(resolve, reject) {
						$.ajax({
				                method: method,
				                url: domain + url,
								
				                data: param,
				                dataType: 'json',
				                contentType: 'application/json',
								xhrFields: {
						           withCredentials: true
						       },
						       crossDomain: true,
				                success: function (data) {
				                    resolve(data);
				                },
				                error: function (error) {
				                    reject(error)
				                }
				            });
					})
				};
						
			function ajaxFile(method, url, param) {
							
								return new Promise(function(resolve, reject) {
									$.ajax({
											method: method,
											url: domain + url,
											data: param,
											xhrFields: {
									           withCredentials: true
									        },
									       crossDomain: true,
										   async: false,  
				                            cache: false,
											   // 告诉jQuery不要去处理发送的数据
											processData : false,
											// 告诉jQuery不要去设置Content-Type请求头
											contentType : false,
											success: function (data) {
												resolve(data);
											},
											error: function (error) {
												reject(error)
											}
										});
								})
							};

//设置cookie
 function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + escape(cvalue) + "; " + expires;
}
   
   //读Cookie
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return "";
}
function forlataTime (time) {

                  //参数time为从后台取到的毫秒数

                    dataTime = new Date(time);

                    var y = dataTime.getFullYear();    //显示年
                    var m = dataTime.getMonth() + 1;    //显示月
                        m = m < 10 ? ('0' + m) : m;   
                    var d = dataTime.getDate();     //显示日
                        d = d < 10 ? ('0' + d) : d;  
                    var h = dataTime.getHours();    //显示小时
                    var minute = dataTime.getMinutes();     //显示分钟
                     minute = minute < 10 ? ('0' + minute) : minute;  
                    return y + '-' + m + '-' + d+"  "+h+':'+minute;     //返回最终时间y-m-d h-m
                };

/**
 * 获取后台session用户信息
 */
function getSessionUser() {
//     ajax('GET', 'pc/user/getuserinfo', "").then(res => {
//         var userinfo = null;
//         if(res.rs == 1) {
//         	userinfo = res.data.user;
// 		}
//         //放入前端session共享
//         localStorage.setItem('userInfo',JSON.stringify(userinfo));//将当前登录人信息存到localstorage中
//         //放入cookie
//         setCookie("userinfo",JSON.stringify(userinfo),1);
// 	})
 }

$(document).ready(function(){
    //循环执行，每隔3分钟钟执行一次 1000
    var t1=window.setInterval(getSessionUser, 10000 * 3);
});