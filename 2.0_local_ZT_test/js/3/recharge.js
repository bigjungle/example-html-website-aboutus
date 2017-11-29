$(function() {
	$(".headerSelect div").eq(0).addClass("accountDivBtn");

	$(".recharge0").show();

	var bankArr = ["ICBC", "ABC", "CMB", "CCB", "BCCB", "BJRCB", "BOC", "BOCOM", "CMBC", "BOS", "CBHB", "CEB", "CIB", "CITIC", "CZB", "GDB", "HKBEA", "HXB", "HZCB", "NJCB", "PINGAN", "PSBC", "SDB", "SPDB", "SRCB"];
	var bankName = ['工商银行', '农业银行', '招商银行', '建设银行', '北京银行', '北京农村', '中国银行', '交通银行', '民生银行', '上海银行', '渤海银行', '光大银行', '兴业银行', '中信银行', '浙商银行', '广发银行', '东亚银行', '华夏银行', '杭州银行', '南京银行', '平安银行', '邮储银行', '深发银行', '浦发银行', '上海农村'];
	$(".bankLogoForm").html("");
	for(var i = 100; i < 125; i++) {
		var ctc = '<div class="bankListLogo">' +
			'	<img class="bankListImg" src="../../img/bank/color/' + bankArr[i - 100] + '.png" >' +
			'	<p class="bankName">' + bankName[i - 100] + '</p>' +
			'	<input name="bank_id_" type="radio" value="' + i + '" />';
		$(".bankListDiv").append(ctc)
	}
	$(".bankIputKeyBtn").on("click", function() {
		$(".bankList").slideDown(300);
	});

	var bankVal = "";
	$(".bankListDiv .bankListLogo").on("click", function() {
		$(".bankList").slideUp();
		$(".bankListDiv .bankListLogo ").removeClass("grayBg");
		$(this).addClass("grayBg");
		bankVal = $(this).find("input").val();
		var bankName = $(this).find(".bankName").html();
		$(".bankInput").val(bankName);
		return false;
	});

	$(".rechargeSelctBtn>p").on("click", function() {

		var index = $('.rechargeSelctBtn>p').index($(this));
		$('.rechargeSelctBtn>p').removeClass("higLineShort");
		$(this).addClass("higLineShort");

		switch(index) {
			case 0:
				$(".recharge0").show();
				$(".recharge1").hide();
				break;
			case 1:
				$(".recharge1").show();
				$(".recharge0").hide();
				break;
			default:
				break;
		}
	});

	$(".CZzhye i").html("");
	$(".mobile").html("");
	var data = searchUserStatus();
	if(data.code == "success") {
		if(data.model.userStatus.openAccountStatus == "1") {

		} else {
			myAccountMes();
		}
	} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	}
	/*银行卡信息*/
	var limitMoney;

	function myAccountMes() {
		$.ajax({
			type: "post",
			url: bankRchargeLimitUrl,
			async: false,
			data: {
				phoneNum: mobile,
				client: client,
				platform: platform,
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("银行限额");
				console.log(data);
				if(data.code == "success") {
					var info = data.model;
					sessionStorage.setItem("user_cus_id_", info.ThirdUserId);
					sessionStorage.setItem("bankCode", info.BankCode);
					limitMoney = info.SingleTransQuota;
					$(".mobile").html(PhoneNumber(info.Mobile));
					mobileFrom = info.Mobile;
					$(".CZzhye i").html(formatNum(info.AvailableAmount));
					var ctc = '<div>' +
						'	<div class="bankCardLogo">' +
						'		<img src="../../img/bank/color/' + info.BankCode + '.png" />' +
						'		<div>' +
						'			<p>' + info.BankName + '</p>' +
						'			<p>储蓄卡</p>' +
						'		</div>' +
						'	</div>' +
						'	<div class="bankCardNum">' +
						'		<p>' + BankNumber(info.BankCardNo) + '</p>' +
						'		<p>快捷支付</p>' +
						'	</div>' +
						'</div>' +
						'<div>' +
						'	单笔限额' + parseInt(info.SingleTransQuota / 10000) + '万元，每日限额' + parseInt(info.CardDailyTransQuota / 10000) + '万元。' +
						'</div>	';

					$(".bankCard").append(ctc);
				}

			}
		});

	}
	/*快捷充值发送短信*/
	var sms_seq_;
	//短信验证码倒计时
	var countDown = 60; //验证码时间
	function settime(type) {
		var type = type;
		if(countDown == 0) {
			$(".bankIputSendCode").button('reset');
			$(".bankIputSendCode").html("重新获取");
			countDown = CountdownNumber;
			return;
		} else {
			$(".bankIputSendCode").button('loading');
			$(".bankIputSendCode").html(countDown + "s");
			countDown--;
		};
		var timer = setTimeout(function() {
			settime();
		}, 1000);
	}
	/*快捷充值发送短信*/
	function checkSMS() {
		var arr = [];
		var rechargeMoney = $(".RechargeInput").val().replace(/\s/g, "");
		var checkNull = inputIsNull(rechargeMoney);
		if(checkNull != "200") {
			$(".wrongTipsR").html("充值金额不能为空");
			return arr;
		};
		if(rechargeMoney <= 0) {
			$(".wrongTipsR").html("充值金额不能为0");
			return arr;
		};
		if(rechargeMoney < 100) {
			$(".wrongTipsR").html("充值金额不能小于100元");
			return arr;
		};
		if(rechargeMoney > parseInt(limitMoney)) {
			$(".wrongTipsR").html("充值金额大于单次限额");
			return arr;
		};
		arr[0] = rechargeMoney;
		return arr;
	}
	/*快捷充值发送短信*/
	$('.bankIputSendCode').on("click", function() {
		$(".wrongTipsR").html("");
		if(checkSMS() != "") {
			var $btn = $(this)
			$btn.button('loading');
			rechargeSendM();
		}

	})

	/*快捷充值发送短信*/
	var SmsSeq;

	function rechargeSendM() {
		$.ajax({
			type: "post",
			url: openSmsUrl,
			async: true,
			data: {
				BusiType: 'recharge',
				mobile: mobileFrom,
				userCode: sessionStorage.getItem("user_id"),
				client: client,
				platform: platform,
				version: version,
				usrCustId: sessionStorage.getItem("user_cus_id_")
			},
			success: function(data) {
				data = jsonchange(data);
				console.log(data);
				if(data.code == "success") {
					SmsSeq = data.model.OutMap.SmsSeq;
					settime();
				} else {
					$(".wrongTipsR").html(data.msg);
					$(".bankIputSendCode").button('reset');
				}
			}
		});
	}
	/*快捷充值*/
	function KJcheckInput() {
		var arr = [];
		var rechargeMoney = $(".RechargeInput").val().replace(/\s/g, "");
		var sms_code = $(".rechargeCode").val().replace(/\s/g, "");
		var checkNull = inputIsNull(rechargeMoney);
		if(checkNull != "200") {
			$(".wrongTipsR").html("充值金额不能为空");
			return arr;
		};
		if(rechargeMoney <= 0) {
			$(".wrongTipsR").html("充值金额不能为0");
			return arr;
		};
		if(rechargeMoney < 100) {
			$(".wrongTipsR").html("充值金额不能小于100元");
			return arr;
		};
		if(rechargeMoney > parseInt(limitMoney)) {
			$(".wrongTipsR").html("充值金额大于单次限额");
			return arr;
		};
		//短信验证码
		var checkNull = inputIsNull(sms_code);
		if(checkNull != "200") {
			$(".wrongTipsR").html("短信验证码错误");
			return arr;
		};
		var checkFlag = checkCodeNumber(sms_code);
		if(checkFlag != "200") {
			$(".wrongTipsR").html("短信验证码错误");
			return arr;
		};
		arr[0] = rechargeMoney;
		arr[1] = sms_code;
		return arr;
	}
	/*快捷充值*/
	function KJrecharge() {

		if(testType == "1") {
			SmsSeq = "AAAAAAAA"
		} else {
			SmsSeq = SmsSeq;
		}

		$.ajax({
			type: "post",
			url: rechargeUrl,
			async: true,
			data: {
				phoneNum: sessionStorage.getItem("mobile"),
				client: client,
				platform: platform,
				version: version,
				gateBusiId: 'QP',
				rechargeAmt: $(".RechargeInput").val().replace(/\s/g, ""),
				bankSmsCode: $(".rechargeCode").val().replace(/\s/g, ""),
				bankSmsSeq: SmsSeq
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("快捷充值");
				console.log(data);
				if(data.code == "success") {
					$(".KJCZbtn").button('reset');
					sessionStorage.setItem("tipsWord", "本次充值金额" + formatNum($(".RechargeInput").val().replace(/\s/g, "")) + "元");
					window.location.href = "rechargeResults.html?rechargeType=1";
				} else {
					$(".KJCZbtn").button('reset');
					sessionStorage.setItem("tipsWord", data.msg);
					window.location.href = "rechargeResults.html?rechargeType=3";
				}

				//				 else if(data.appcode == "3") {
				//					$(".KJCZbtn").button('reset');
				//					sessionStorage.setItem("tipsWord", "本次充值金额预计到账" + $(".RechargeInput").val().replace(/\s/g, "") + "元");
				//					window.location.href = "rechargeResults.html?rechargeType=2";
				//				} 

			}
		});
	}

	/*快捷充值*/
	$(".KJCZbtn").on("click", function() {
		$(".wrongTipsR").html("");
		if(KJcheckInput() != "") {
			var $btn = $(this)
			$btn.button('loading');

			KJrecharge();
		}
	});
	/*网银充值*/
	function WYcheckInput() {
		var arr = [];
		var rechargeMoney = $(".WithdrawalInput").val().replace(/\s/g, "");
		var bank_id = bankVal;
		var checkNull = inputIsNull(rechargeMoney);
		if(checkNull != "200") {
			$(".wrongTipsRW").html("充值金额不能为空");
			return arr;
		};
		if(rechargeMoney < 100) {
			$(".wrongTipsRW").html("充值金额不能小于100");
			return arr;
		};
		if(bank_id == "") {
			$(".wrongTipsRW").html("请选择开户行");
			return arr;
		};
		arr[0] = rechargeMoney;
		arr[1] = bank_id;
		return arr;

	}
	/*网银充值*/
	function WYrecharge() {
		$.ajax({
			type: "post",
			url: rechargeUrl,
			async: true,
			data: {
				phoneNum: sessionStorage.getItem("mobile"),
				client: client,
				platform: platform,
				version: version,
				bankCode: bankArr[bankVal - 100],
				bankNo: bankVal,
				rechargeAmt: $(".WithdrawalInput").val(),
				gateBusiId: "B2C",
				thirdUserId: sessionStorage.getItem("user_cus_id_"),
				pageRetUrl: returnUrl + "html/3/account.html",
			},
			success: function(data) {
				data = jsonchange(data);
				console.log(data);
				if(data.code == "success") {
					$('#subForm').attr('action', data.model.ServiceUrl);
					var msgParamDto = data.model.InMap;
					$.each(msgParamDto, function(key, value) {
						var ctc = '  <input type="hidden" name="' + key + '"  class="hidden"   value="' + value + '" /> ';
						$("#subForm").append(ctc)
					});
					$("#subForm").submit();
				} else {
					$(".wrongTipsRW").html(data.msg);

					$(".WYCZbtn").button('reset');
				}
			}
		});
	}

	/*网银充值*/
	$(".WYCZbtn").on("click", function() {
		$(".wrongTipsRW").html("");
		if(WYcheckInput() != "") {
			var $btn = $(this)
			$btn.button('loading');
			WYrecharge();

		}
	})
})