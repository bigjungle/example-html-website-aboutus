var header =
	'<div class="container nav">' +
	'	<div>' +
	'		<a href="#">' +
	'			<img src="../../img/head&foot/logo.png" />' +
	'		</a>' +
	'	</div>' +
	'	<div class="LoginList ">' +
	'		<span class="login_out">' +
	'		<a href="../1LoginRegister/login.html">登录</a>' +
	'		<a href="../1LoginRegister/login.html?fromHeader=1">注册</a>' +
	'		</span>' +
	'		<span class="login_in">' +
	'			您好，<i class="loginUserMobile"></i> <span class="showH">显示</span>  <i class="exit">，安全退出</i>' +
	'		</span>' +
	'	</div>' +
	'	<div>' +
	'		<ul class="tiltleList">' +
	'			<li class="tiltleList1"> <a  href="../../html/2Homepage/index.html">首页</a></li>' +
	'			<li class="tiltleList2"><a href="../../html/2Homepage/listOne.html">出借</a></li>' +
	'			<li class="tiltleList3"><a href="../../html/2Homepage/loan.html">借款</a></li>' +
	'			<li class="tiltleList4"><a class="zhzx" href="###">账户中心</a></li>' +
	//	'			<li class="tiltleList5"><a href="../../html/4AboutUs/ptjs.html">关于我们</a></li>' +
	'		</ul>' +
	'	</div>' +
	'</div>';
$(".header").append(header);
var footer = '<div class="container" style="padding: 0.25rem 0;height: 0.6rem; overflow: hidden;">' +
	'	<div class="footer_left">' +
	//	'		<img src="../../img/head&foot/footer_logo.png"/>' +
	'		<p>©2016 中赢金融 All rights reserved|上海中赢金融信息服务有限公司|沪ICP13037072号-1</p>' +
	'	</div>' +
	'	<div class="footer_right">' +
	'		<p>客服电话</p>' +
	'		<p>' + severPhone + '</p>' +
	'	</div>' +
	'</div>';
$(".footer").append(footer);
var ctc = '<div class="section AccountLinkSection">' +
	'		<span><a class="ALSspan1" href="../../html/3UserCenter/Account.html">账户总览</a></span>' +
	'		<span><a class="ALSspan4" href="../../html/3UserCenter/AccountSettings.html">账户安全</a></span>' +
	'	</div>';

$(".AccountLink").append(ctc);

$(".QRcodeWord").on("mouseenter", function() {
	$(".QRcode").show(200);
});
$(".QRcodeWord").on("mouseleave", function() {
	$(".QRcode").hide(200);
});

$(".fn_right a").on("mouseenter", function() {
	$(".fn_right a").removeClass("blaceColor");
	$(this).addClass("blaceColor");

});
$(".fn_right a").on("mouseleave", function() {
	$(".fn_right a").removeClass("blaceColor");
});

$(".AccountLink .AccountLinkSection span a").hover(function() {

	if($(this).hasClass("active")) {
		$(this).css("color", "#3788f8");
	} else {
		$(this).css("color", "#3788f8");
	}

}, function() {
	if($(this).hasClass("active")) {
		$(this).css("color", "#3788f8");
	} else {
		$(this).css("color", "#878787");
	}
});

$(".AUsection .AUtitleSelect span").hover(function() {

	if($(this).hasClass("higline")) {
		$(this).css("color", "#3788f8");
	} else {
		$(this).css("color", "#3788f8");
	}

}, function() {
	if($(this).hasClass("higline")) {
		$(this).css("color", "#3788f8");
	} else {
		$(this).css("color", "#878787");
	}
});

$(".tiltleList li a").hover(function() {

	if($(this).hasClass("active")) {
		$(this).css("color", "#3788f8");
	} else {
		$(this).css("color", "#3788f8");
	}

}, function() {
	if($(this).hasClass("active")) {
		$(this).css("color", "#3788f8");
	} else {
		$(this).css("color", "#878787");
	}
});

$(".AUspan1").on("click", function() {
	window.location.href = "../../html/4AboutUs/ptjs.html";
});
$(".AUspan2").on("click", function() {
	window.location.href = "../../html/4AboutUs/ptys.html";
});
$(".AUspan3").on("click", function() {
	window.location.href = "../../html/4AboutUs/jrwm.html";
});
$(".AUspan4").on("click", function() {
	window.location.href = "../../html/4AboutUs/lxwm.html";
});
$(".zhzx").on("click", function() {

	if(loginStatus == 1) {
		window.location.href = "../../html/3UserCenter/Account.html";
	} else {
		window.location.href = "../../html/1LoginRegister/login.html";
	}

});

$(".UserListli1").on("click", function() {
	window.location.href = "../../html/3UserCenter/Account.html";
});
$(".UserListli2").on("click", function() {
	window.location.href = "../../html/3UserCenter/MoneyRecord.html";
});
$(".UserListli3").on("click", function() {
	window.location.href = "../../html/3UserCenter/AssetManagement.html";
});
$(".UserListli4").on("click", function() {
	window.location.href = "../../html/3UserCenter/AccountSettings.html";
});
//	$(".UserListli5").on("click", function() {
//		window.location.href = "../../html/3UserCenter/Account.html";
//	});
//	$(".UserListli6").on("click", function() {
//		window.location.href = "../../html/3UserCenter/MessageCenter.html";
//	});
$(".UserListli7").on("click", function() {
	window.location.href = "../../html/3UserCenter/MessageCenter.html";
});
$(".loginUserMobile").on("click", function() {
	window.location.href = "../../html/3UserCenter/Account.html";
});

function ChangeImg(className, imgUrl1, imgUrl2) {

	className.on("mouseenter", function() {
		className.find("img").attr("src", imgUrl1);
		className.addClass("higword");

	});
	className.on("mouseleave", function() {
		className.find("img").attr("src", imgUrl2);
		className.removeClass("higword");

	});

};

ChangeImg($(".UserListli1"), "../../img/2Homepage/icon_zhsy_c.png", "../../img/2Homepage/icon_zhsy_h.png");
ChangeImg($(".UserListli2"), "../../img/2Homepage/icon_zjmx_c.png", "../../img/2Homepage/icon_zjmx_h.png");
ChangeImg($(".UserListli3"), "../../img/2Homepage/icon_zcgl_c.png", "../../img/2Homepage/icon_zcgl_h.png");
ChangeImg($(".UserListli4"), "../../img/2Homepage/icon_zhgl_c.png", "../../img/2Homepage/icon_zhgl_h.png");
ChangeImg($(".UserListli5"), "../../img/2Homepage/icon_ddgl_c.png", "../../img/2Homepage/icon_ddgl_h.png");
ChangeImg($(".UserListli6"), "../../img/2Homepage/icon_hdgl_c.png", "../../img/2Homepage/icon_hdgl_h.png");
ChangeImg($(".UserListli7"), "../../img/2Homepage/icon_xxzx_c.png", "../../img/2Homepage/icon_xxzx_h.png");

var loginStatus = sessionStorage.getItem("loginStatus");
if(loginStatus == "1") {
	var mobile = sessionStorage.getItem("mobile");
	$(".login_out").hide();
	$(".login_in").show();
	$(".loginUserMobile").html(PhoneNumber(mobile));
} else {
	$(".login_out").show();
	$(".login_in").hide();
	$(".loginUserMobile").html("");
}




var moblie = sessionStorage.getItem("mobile");
var juid = sessionStorage.getItem("juid");
$(".exit").on("click", function() {
	$.ajax({
		type: "get",
		url: outLoginUrl,
		async: true,
		data: {
			juid: juid
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("注销")
			//console.log(data);
			location.reload();
			//			sessionStorage.clear();
			sessionStorage.setItem("loginStatus", 0);
			sessionStorage.removeItem('user_id');
			sessionStorage.removeItem('mobile');
			sessionStorage.removeItem('juid');
			sessionStorage.removeItem('id');
			checkLogin();
		}
	});
});
/*用户信息*/
var UserStatu;

function searchUserStatus() {
	$.ajax({
		type: "post",
		url: accountInfoUrl,
		async: false,
		data: {
			juid: juid
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("用户基本信息")
			//console.log(data);
			UserStatu = data;
			if(data.appcode == "1") {
				if(data.data.accountInfo != undefined) {
					//					cardMessage();
					//console.log(data.data.accountInfo);
					sessionStorage.setItem("user_cus_id_", data.data.accountInfo.user_cus_id_);
					sessionStorage.setItem("id_number_", data.data.accountInfo.id_number_);
					sessionStorage.setItem("user_name_", data.data.accountInfo.user_name_);
					sessionStorage.setItem("is_activate_", data.data.accountInfo.is_activate_);
					sessionStorage.setItem("available_amount_", data.data.accountInfo.available_amount_.toFixed(2));
					if(data.data.accountInfo.today_net_save_amount_ != undefined || data.data.accountInfo.today_net_save_amount_ != null) {
						sessionStorage.setItem("today_net_save_amount_", data.data.accountInfo.today_net_save_amount_);
					} else {
						sessionStorage.setItem("today_net_save_amount_", 0);
					}
				} else {
					sessionStorage.setItem("available_amount_", 0);
				}
			}
		}
	});
	return UserStatu;
};

/*银行限额查询*/
var RchargeLimit;

function bankRchargeLimit(OpenBankId) {
	var OpenBankId = OpenBankId;
	$.ajax({
		type: "post",
		url: bankRchargeLimitUrl,
		async: false,
		data: {
			OpenBankId: OpenBankId,
			GateBusiId: "QP",
			juid: juid
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("银行限额");
			//console.log(data);
			RchargeLimit = data.data;
			if(data.appcode == "1") {
				sessionStorage.setItem("SingleTransQuota", data.data.SingleTransQuota);
				sessionStorage.setItem("CardDailyTransQuota", data.data.CardDailyTransQuota);
			}

		}
	});
	return RchargeLimit;
}

/*银行卡信息*/
function cardMessage() {
	$.ajax({
		type: "post",
		url: bankCardMessageUrl,
		async: false,
		data: {
			juid: juid
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("银行卡信息");
			//console.log(data);
			if(data.appcode == "1") {
				var info = data.data;
				sessionStorage.setItem("card_number_", info.card_number_);
				sessionStorage.setItem("band_mobile_", info.mobile_);
				sessionStorage.setItem("bank_name_", info.bank_name_);
				sessionStorage.setItem("user_name_", info.user_name_);
				sessionStorage.setItem("bank_code_", info.bank_code_);
			}
		}
	})
};

/*自动复投*/
function autoTender() {
	$.ajax({
		type: "post",
		url: autoTenderUrl,
		async: true,
		data: {
			juid: juid,
			page_type_: "",
			ret_url_: returnUrl + "/html/3UserCenter/loading.html?ftType=1"
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("自动投标");
			//console.log(data);
			if(data.appcode == 1) {
				$('#subForm').attr('action', data.msgParamDto.huifu_url);
				var msgParamDto = data.msgParamDto;
				$(".linkToBank").show();
				$.each(msgParamDto, function(key, value) {
					var ctc = '  <input type="hidden" name="' + key + '"  class="hidden"   value="' + value + '" /> ';
					$("#subForm").append(ctc);
				});
				setTimeout(function() {
					$("#subForm").submit();
				}, 1500);
			} else {
				layer.msg(data.appmsg);
			}
		}
	});
}

/*激活*/

function toBosAcctActivate() {
	$.ajax({
		type: "post",
		url: toBosAcctActivateUrl,
		async: true,
		data: {
			juid: juid,
			mer_id_: mer_id_,
			ret_url_: returnUrl + "/html/3UserCenter/loading.html?jhType=1",
			page_type_: ""
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("自动投标");
			//console.log(data);
			if(data.appcode == 1) {
				$('#subForm').attr('action', data.huifu_url);
				var msgParamDto = data.msgParamDto;
				$(".linkToBank").show();
				$.each(msgParamDto, function(key, value) {
					var ctc = '  <input type="hidden" name="' + key + '"  class="hidden"   value="' + value + '" /> ';
					$("#subForm").append(ctc);
				});
				setTimeout(function() {
					$("#subForm").submit();
				}, 1500);
			} else {
				layer.msg(data.appmsg);
			}

		}
	});
}

/*自动复投状态*/
var tender_plan_mark_;

function autoTenderStatus() {
	$.ajax({
		type: "post",
		url: autoTenderStatusUrl,
		async: true,
		data: {
			juid: juid
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("自动复投状态");
			//console.log(data);
			if(data.appcode == "1") {
				if(data.data.appcode == "1") {
					sessionStorage.setItem("tender_plan_mark_", 1);
					tender_plan_mark_ = 1;
				} else {
					//					layer.msg(data.data.appmsg);
					sessionStorage.setItem("tender_plan_mark_", 0);
					tender_plan_mark_ = 0;
				}
			} else {
				//				layer.msg(data.appmsg);
				sessionStorage.setItem("tender_plan_mark_", 0);
				tender_plan_mark_ = 0;
			}
		}
	});
}

if(loginStatus == "1") {
	searchUserStatus();
	autoTenderStatus();
}