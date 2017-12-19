//var loginCtc='	<a href="test/ZY1.1/html/1LoginRegister/login.html"><span class="higColor">立即登录</span></a>' +
//	'		<span>|</span>' +
//	'	<a href="test/ZY1.1/html/1LoginRegister/login.html"><span>快速注册</span></a>' +
//	'		<span>|</span>' +
//	'		<span>关于我们</span>' +
//	'		<span>|</span>' +
//	'		<span>帮助中心</span>' ;
var loginCtc;
var loginCtc2;
var loginStatus = sessionStorage.getItem("loginStatus");
var mobile = sessionStorage.getItem("mobile");
if(loginStatus == "1") {
	var loginCtc = '<span class="loginSpan">您好！' + PhoneNumber(mobile) + '  O 普通 <i class="exitI">[安全退出]</i></span>' +
		'		<span>|</span>' +
		'		<span>关于我们</span>' +
		'		<span>|</span>' +
		'		<span>帮助中心</span>';
	var loginCtc2 = '<span class="loginSpan">您好！' + PhoneNumber(mobile) + '  O 普通 <i class="exitI">[安全退出]</i></span>' +
		'		<span>|</span>' +
		'		<span>关于我们</span>' +
		'		<span>|</span>' +
		'		<span>帮助中心</span>';
} else {
	var loginCtc = '	<a href="html/1LoginRegister/login.html"><span class="higColor">立即登录</span></a>' +
		'		<span>|</span>' +
		'	<a href="html/1LoginRegister/login.html?fromHeader=1"><span>快速注册</span></a>' +
		'		<span>|</span>' +
		'		<span>关于我们</span>' +
		'		<span>|</span>' +
		'		<span>帮助中心</span>';
	loginCtc2 = '	<a href="../../html/1LoginRegister/login.html"><span class="higColor">立即登录</span></a>' +
		'		<span>|</span>' +
		'	<a href="../../html/1LoginRegister/login.html?fromHeader=1"><span>快速注册</span></a>' +
		'		<span>|</span>' +
		'		<span>关于我们</span>' +
		'		<span>|</span>' +
		'		<span>帮助中心</span>';
}

var header1 = '<div class="headerTop content">' +
	'	<p class="am-fl">客户热线：400-088-0888</p>' +
	'	<p class="am-fr" style="cursor: pointer;">' +
	loginCtc +
	'	</p>' +
	'</div>' +
	'<div class="headerBottom">' +
	'	<div class="headerBottomConten content">' +
	'		<div class="am-fl logoImg">' +
	'				<a href="index.html"><img src="img/assets/logo@1x.png" /></a>' +
	'		</div>' +
	'		<div class="am-fr headerSelect">' +
	'			<a href="index.html"> <span class="higLine">首页</span></a>' +
	'			<a href="html/2/planBid.html"> <span>出借</span></a>' +
	'			<a href="html/2/loan.html"> <span>借款</span></a>' +
	'			<a href="html/4/messageAnnounce.html"> <span>信息披露</span></a>' +
	'			<a href="###"> <div class="accountBtn accountBtn1">我的账户</div></a>' +
	'		</div>' +
	'	</div>' +
	'</div>';
$(".header1").append(header1);
var header2 = '<div class="headerTop content">' +
	'	<p class="am-fl">客户热线：400-088-0888</p>' +
	'	<p class="am-fr" style="cursor: pointer;">' +
	loginCtc2 +
	'	</p>' +
	'</div>' +
	'<div class="headerBottom">' +
	'	<div class="headerBottomConten content">' +
	'		<div class="am-fl logoImg">' +
	'			<a href="../../index.html"> <img src="../../img/assets/logo@1x.png" /></a>' +
	'		</div>' +
	'		<div class="am-fr headerSelect">' +
	'			<a href="../../index.html"> <span>首页</span></a>' +
	'			<a href="../../html/2/planBid.html"> <span>出借</span></a>' +
	'			<a href="../../html/2/loan.html"> <span>借款</span></a>' +
	'			<a href="../../html/4/messageAnnounce.html"> <span>信息披露</span></a>' +
	'			<a href="###"> <div class="accountBtn accountBtn2">我的账户</div></a>' +
	'		</div>' +
	'	</div>' +
	'</div>';
$(".header2").append(header2);

var footer = '<div class="footerContent">' +
	'<div>' +
	'	<p>©上海中赢金融信息服务有限公司 All rights reserved</p>' +
	'	<p>沪ICP 13037072号-1</p>' +
	'</div>' +
	'<div>' +
	'	<p>400-088-0888</p>' +
	'	<p>服务时间：09:00~21:00</p>' +
	'</div>' +
	'</div>';

$(".footer").append(footer);

var loading = '<div class="linkToBank">' +
	'<img class="linkImg" src="../../img/1/linkTo1.png" />' +
	'<img class="loadImg" src="../../img/1/loading.png" />' +
	'<p class="linkP">正在前往银行，请稍后...</p>' +
	'</div>';

$("body").append(loading);

function stop() {
	return false;
}
//document.oncontextmenu = stop;

$(".accountBtn1").on("click", function() {

	var data = searchUserStatus();
	if(data.code == "success") {
		window.location.href = "html/3/account.html";
	} else {
		sessionStorage.clear();
		window.location.href = "html/1LoginRegister/login.html";
	}

});
$(".accountBtn2").on("click", function() {

	var data = searchUserStatus();
	if(data.code == "success") {
		window.location.href = "../../html/3/account.html";
	} else {
		window.location.href = "../../html/1LoginRegister/login.html";
	}

});

var accountHtml = '<div class="asLeftDiv">' +
	'		<p>' +
	'			<img src="../../img/assets/wdzh.png" />' +
	'			<span>我的账户</span>' +
	'		</p>' +
	'		<p>' +
	'			<a href="account.html">账户总览</a>' +
	'		</p>' +
	'	</div>' +
	'	<div class="asLeftDiv">' +
	'		<p>' +
	'			<span><img style="height:0.13rem;" src="../../img/assets/wdtz.png"/></span>' +
	'			<span>我的投资</span>' +
	'		</p>' +
	'		<p>' +
	'			<a href="bidRecordJHB.html">计划标</a>' +
	'		</p>' +
	'		<p>' +
	'			<a href="bidRecordSB.html">散标</a>' +
	'		</p>' +
//	'		<p>' +
//	'			<a href="moneyRecord.html">交易记录</a>' +
//	'		</p>' +
	'	</div>' +
	'	<div class="asLeftDiv">' +
	'		<p>' +
	'			<span><img src="../../img/assets/zhgl.png"/></span>' +
	'			<span>账户管理</span>' +
	'		</p>' +
	'		<p class="higColor">' +
	'			<a href="securityCenter.html">安全中心</a>' +
	'		</p>' +
	'		<p><a href="myCard.html">我的银行卡</a></p>' +
	'		<p><a href="myCardVoucher.html">我的卡券</a></p>' +
	'	</div>';
$(".asLeft").append(accountHtml);

var moblie = sessionStorage.getItem("mobile");
var juid = sessionStorage.getItem("juid");
$(".exitI").on("click", function() {
	$.ajax({
		type: "post",
		url: outLoginUrl,
		async: true,
		data: {
			phoneNum: moblie,
			client:client,
		},
		success: function(data) {
			data = jsonchange(data);
			////console.log("注销")
			////console.log(data);
			location.reload();
			//			sessionStorage.clear();
			sessionStorage.setItem("loginStatus", 0);
			sessionStorage.removeItem('user_id');
			sessionStorage.removeItem('mobile');
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
		url: UserStatusUrl,
		async: false,
		data: {
			phoneNum: mobile,
			client: client
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("用户状态")
			//console.log(data);
			UserStatu = data;
			if(data.code == "success") {
				sessionStorage.setItem("openAccountStatus", data.model.userStatus.openAccountStatus);
			} else {
				loginStatus = "0";
				sessionStorage.setItem("loginStatus", "0");
				window.location.reload;
			}
		}
	});
	return UserStatu;
};

/*用户信息*/

var userInfos;

function userInfo() {
	$.ajax({
		type: "post",
		url: userInfoUrl,
		async: true,
		data: {
			phoneNum: mobile,
			client: client,
			platform: platform,
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("用户信息");
			//console.log(data);
			if(data.code == "success") {
				userInfos = data.model;
				sessionStorage.setItem("user_name_", data.model.UsrCardInfolist[0].UsrName);
				sessionStorage.setItem("id_number_", data.model.UsrCardInfolist[0].CertId);
				sessionStorage.setItem("UsrCustId", data.model.UsrCustId);
			}
		}
	});

	return userInfos;
};

/*银行卡信息*/
function cardMessage() {
	$.ajax({
		type: "post",
		url: cardInfoUrl,
		async: false,
		data: {
			phoneNum: mobile,
			client: client,
			platform: platform,
		},
		success: function(data) {
			data = jsonchange(data);
			////console.log("银行卡信息");
			////console.log(data);
			if(data.code == "success") {
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
			phoneNum: mobile,
			client: client,
			platform: platform,
			openFlag: "1",
			retUrl: returnUrl + "html/3/loading.html?ftType=1",
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("自动投标");
			//console.log(data);
			if(data.code == "success") {
				$('#subForm').attr('action', data.model.ServiceUrl);
				var msgParamDto = data.model.InMap;
				$(".linkToBank").show();
				$.each(msgParamDto, function(key, value) {
					var ctc = '  <input type="hidden" name="' + key + '"  class="hidden"   value="' + value + '" /> ';
					$("#subForm").append(ctc);
				});
				setTimeout(function() {
					$("#subForm").submit();
				}, 1500);
			} else {
				layer.msg(data.msg);
			}
		}
	});
}

/*激活*/

function toBosAcctActivate() {
	var UsrCustId = sessionStorage.getItem("UsrCustId");
	var user_id = sessionStorage.getItem("user_id");
	$.ajax({
		type: "post",
		url: toBosAcctActivateUrl,
		async: true,
		data: {
			userCode: user_id,
			thirdUserId: UsrCustId,
			retUrl: returnUrl + "html/3/loading.html?jhType=1",
			client: client,
			platform: platform,
			version: version
		},
		success: function(data) {
			data = jsonchange(data);
			////console.log("自动投标");
			////console.log(data);
			if(data.code == "success") {
				$('#subForm').attr('action', data.model.ServiceUrl);
				var msgParamDto = data.model.InMap;
				$(".linkToBank").show();
				$.each(msgParamDto, function(key, value) {
					var ctc = '  <input type="hidden" name="' + key + '"  class="hidden"   value="' + value + '" /> ';
					$("#subForm").append(ctc);
				});
				setTimeout(function() {
					$("#subForm").submit();
				}, 1500);
			} else {
				layer.msg(data.msg);
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
			phoneNum: mobile,
			client: client,
			platform: platform,
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("自动复投状态");
			//console.log(data);
			if(data.code == "success") {
				sessionStorage.setItem("tender_plan_mark_", 1);
				tender_plan_mark_ = 1;
			} else {
				sessionStorage.setItem("tender_plan_mark_", 0);
				tender_plan_mark_ = 0;
			}
		}
	});
}

/*判断用户是否激活*/

function isActivity() {
	$.ajax({
		type: "post",
		url: isBosAcctActivateUrl,
		async: true,
		data: {

		},
		success: function(data) {
			data = jsonchange(data);
		}
	});
}

if(loginStatus == "1") {
	searchUserStatus();
	autoTenderStatus();
	userInfo();
}

function ProgessAnimate(className1, className2, length) {
	var bluePLength = parseInt($("." + className1).html());
	var length = length;
	$("." + className2).animate({
		width: bluePLength * length / 100 + "rem"
	}, 1000)
};

//去签约
function Sign() {
	$.ajax({
		type: "post",
		url: DZQYUrl,
		async: true,
		data: {
			phoneNum: mobile,
			client: client,
			platform: platform,
			busiType: "4",
			retUrl: returnUrl + "html/3/account.html"
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("签约");
			//console.log(data);
			if(data.code == "success") {
				layer.msg("为了您的资金安全，请签约自动授权委托书");
				setTimeout(function() {
					window.location.href = data.model.Link;
				}, 2000)

			} else {
				layer.msg(data.msg);
			}
		}
	});
}

//去签约
function Sign1() {
	var user_id = sessionStorage.getItem("user_id");
	$.ajax({
		type: "get",
		url: DZQYUrl,
		async: true,
		data: {
			invest_user_id_: user_id,
			back_url_: returnUrl + "html/3/account.html"
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("签约");
			//console.log(data);
			if(data.appcode == "1") {
				window.location.href = data.data.link;
			}
		}
	});
}

//签约查询 

function checkSign() {
	var user_id = sessionStorage.getItem("user_id");
	$.ajax({
		type: "post",
		url: QYCCUrl,
		async: true,
		data: {
			phoneNum: mobile,
			client: client,
			platform: platform,
			busiType: "4"
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("签约查询");
			//console.log(data);
			if(data.code == "success") {
				if(data.model == "3") {
					autoTender();
				} else {
					Sign();
				}
			} else {
				//				Sign();
				layer.msg(data.msg);
			}
		}
	});
}
//checkSign();
//老用户签约查询 

function checkSign1() {
	var user_id = sessionStorage.getItem("user_id");
	$.ajax({
		type: "get",
		url: QYCCUrl,
		async: true,
		data: {
			invest_user_id_: user_id
		},
		success: function(data) {
			data = jsonchange(data);
			//console.log("签约查询");
			//console.log(data);
			if(data.code == "success") {
				autoTender();
			} else {
				Sign1();
			}
		}
	});
}

/*电子合同*/
var downLoadUrl;

function downLoad(applyNo) {
	var applyNo = applyNo;
	$.ajax({
		type: "post",
		url: XZHTUrl,
		async: false,
		data: {
			phoneNum: mobile,
			client: client,
			platform: platform,
			applyNo: applyNo
		},
		success: function(data) {
			//console.log("电子合同");
			//console.log(data);
			if(data.code == "success") {
				downLoadUrl = data.model;
			}
		}
	});

	return downLoadUrl;
}

/*老合同*/
function oldAgreement(investOrderNo) {
	var investOrderNo = investOrderNo;
	$.ajax({
		type: "post",
		url: YLHTUrl,
		async: true,
		data: {
			phoneNum: mobile,
			client: client,
			platform: platform,
			investOrderNo: investOrderNo,
			cashNo: "",
			debtNo: ""
		},
		success: function(data) {
			//console.log("老合同");
			//console.log(data);
			if(data.code == "success") {
				window.open("about:blank").document.write(data.model);
			} else {
				layer.msg(data.msg);
			}
		}

	});
}

/*老合同*/
function oldAgreement1(investOrderNo,debtNo,cashNo) {
	var debtNo = debtNo;
	var cashNo = cashNo;
	var investOrderNo=investOrderNo;
	$.ajax({
		type: "post",
		url: YLHTUrl,
		async: true,
		data: {
			phoneNum: mobile,
			client: client,
			platform: platform,
			cashNo:	cashNo,
			debtNo: debtNo,
			investOrderNo:investOrderNo
		},
		success: function(data) {
			//console.log("老合同");
			//console.log(data);
			if(data.code == "success") {
				window.open("about:blank").document.write(data.model);
			} else {
				layer.msg(data.msg);
			}
		}

	});
}

/*老合同*/
//function oldAgreement(debt_id_) {
//	var user_id = sessionStorage.getItem("user_id");
//	var debt_id_ = debt_id_;
//	$.ajax({
//		type: "get",
//		url: oldHT,
//		async: true,
//		data: {
//			debt_id_: debt_id_,
//			transfer_id_: "",
//			invest_user_id_: user_id,
//			type_: "8",
//			transfer_type_: "1"
//		},
//		success: function(data) {
//			//console.log("老合同");
//			//console.log(data);
//			window.open("about:blank").document.write(data.data.info);
//		}
//
//	});
//}