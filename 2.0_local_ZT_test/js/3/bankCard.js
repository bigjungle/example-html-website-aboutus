$(function() {
	$(".headerSelect div").eq(0).addClass("accountDivBtn");
	var mobile = sessionStorage.getItem("mobile");
	var user_id = sessionStorage.getItem("user_id");
	var juid = sessionStorage.getItem("juid");
	var bankArr = ["ICBC", "ABC", "CMB", "CCB", "BCCB", "BJRCB", "BOC", "BOCOM", "CMBC", "BOS", "CBHB", "CEB", "CIB", "CITIC", "CZB", "GDB", "HKBEA", "HXB", "HZCB", "NJCB", "PINGAN", "PSBC", "SDB", "SPDB", "SRCB"];
	var bankName = ['工商银行', '农业银行', '招商银行', '建设银行', '北京银行', '北京农村', '中国银行', '交通银行', '民生银行', '上海银行', '渤海银行', '光大银行', '兴业银行', '中信银行', '浙商银行', '广发银行', '东亚银行', '华夏银行', '杭州银行', '南京银行', '平安银行', '邮储银行', '深发银行', '浦发银行', '上海农村'];
	$(".bankLogoForm").html("");
	for(var i = 100; i < 125; i++) {
		switch(i) {
			case 104:
			case 105:
			case 108:
			case 110:
			case 113:
			case 114:
			case 116:
			case 118:
			case 119:
			case 122:
			case 124:
				break;
			default:
				var ctc = '<div class="bankListLogo">' +
					'	<img class="bankListImg" src="../../img/bank/color/' + bankArr[i - 100] + '.png" >' +
					'	<p class="bankName">' + bankName[i - 100] + '</p>' +
					'	<input name="bank_id_" type="radio" value="' + i + '" />';
				$(".bankListDiv").append(ctc)
				break;
		}
	};
	$(".bankIputKeybtn").on("click", function() {
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
		$(".wrongTips3").html("");
		return false;
	});

	var data = searchUserStatus();
	if(data.code == "success") {} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	}

	function OpenAccountMessage() {
		var arr = [];
		var card_number_ = $(".bank_card").val().replace(/\s/g, "");
		var mobile_ = $(".phone").val().replace(/\s/g, "");
		var bank_id_ = bankVal;
		var user_name_ = $(".bkUserName").val().replace(/\s/g, "");
		var id_number_ = $(".ID_card").val().replace(/\s/g, "");
		var checkNull = inputIsNull(user_name_);
		if(checkNull != "200") {
			$(".wrongTips1").html("姓名不能为空");
			return arr;
		};
		var checkNull = checkUserName(user_name_);
		if(checkNull != "200") {
			$(".wrongTips1").html("真实姓名必须是2-10个汉字(含中文字符)");
			return arr;
		};
		var checkNull = inputIsNull(id_number_);
		if(checkNull != "200") {
			$(".wrongTips2").html("身份证号码不能为空");
			return arr;
		};
		var checkNull = checkIdCard(id_number_);
		if(checkNull != "200") {
			$(".wrongTips2").html("请输入正确的身份证号码");
			return arr;
		};
		var checkNull = inputIsNull(bankVal);
		if(checkNull != "200") {
			$(".wrongTips3").html("请选择开户银行");
			return arr;
		};
		var checkNull = inputIsNull(card_number_);
		if(checkNull != "200") {
			$(".wrongTips4").html("银行卡号不能为空");
			return arr;
		};

		var checkNull = checkBankcardNummber(card_number_);
		if(checkNull != "200") {
			$(".wrongTips4").html("请输入正确的银行卡号");
			return arr;
		};

		var checkNull = cheackBankCard(card_number_);
		if(checkNull != "200") {
			$(".wrongTips4").html("请输入正确的银行卡号");
			return arr;
		};

		var checkNull = inputIsNull(mobile_);
		if(checkNull != "200") {
			$(".wrongTips5").html("手机号码不能为空");
			return arr;
		};

		var checkNull = checkPhone(mobile_);
		if(checkNull != "200") {
			$(".wrongTips5").html("请输入正确的手机号码");
			return arr;
		};
		arr[0] = card_number_;
		arr[1] = mobile_;
		arr[2] = bank_id_;
		return arr;
	}
	$('.bankIputSendCode').click(function() {
		$(".wrongTips").html("");
		if(OpenAccountMessage() != "") {
			var $btn = $(this)
			$btn.button('loading');
			OpenAccountSM();
		}
	});

	var SmsSeq;
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

	function OpenAccountSM() {
		$.ajax({
			type: "post",
			url: openSmsUrl,
			async: true,
			data: {
				BusiType: "user_register",
				/*业务类型:user_register(开户),rebind(换绑卡),recharge(充值)*/
				mobile: $(".phone").val().replace(/\s/g, ""),
				bankCardNo: $(".bank_card").val().replace(/\s/g, ""),
				userCode: user_id,
				client: client,
				platform: platform,
				version: version
			},
			success: function(data) {
				data = jsonchange(data);
				console.log(data);
				if(data.code == "success") {
					SmsSeq = data.model.OutMap.SmsSeq;
					settime();
				} else {
					$(".wrongTips6").html(data.msg);
					$('.bankIputSendCode').button('reset');
				}
			}
		});
	}

	function checkSMS() {
		var arr = [];
		var sms_code = $(".inputCode").val();
		//短信验证码
		var checkNull = inputIsNull(sms_code);
		if(checkNull != "200") {
			$(".wrongTips6").html("短信验证码错误");
			return arr;
		};
		var checkFlag = checkCodeNumber(sms_code);
		if(checkFlag != "200") {
			$(".wrongTips6").html("短信验证码错误");
			return arr;
		};
		arr[0] = sms_code;
		return arr;
	}

	function OpenAccount() {

		if(testType == "1") {
			var SmsSeq = "AAAAAAAA"
		} else {
			var SmsSeq = SmsSeq;
		}

		$.ajax({
			type: "post",
			url: openAccountUrl,
			async: true,
			data: {
				userCode: user_id,
				realName: $(".bkUserName").val().replace(/\s/g, ""),
				idno: $(".ID_card").val().replace(/\s/g, ""),
				bankNo: bankVal,
				bankCardNo: $(".bank_card").val().replace(/\s/g, ""),
				smsCode: $(".inputCode").val().replace(/\s/g, ""),
				smsSeq: SmsSeq,
				mobile: $(".phone").val().replace(/\s/g, ""),
				client: client,
				userType: "1",
				platform: platform,
				version: version,
				RetUrl: returnUrl + "html/3/loading.html",
			},
			success: function(data) {
				data = jsonchange(data);
				console.log(data);
				if(data.code == "success") {

					if(data.model.retMessage == "开户成功") {
						layer.msg("激活成功！银行存管已经开通。");
						setTimeout(function() {
							window.location.href = "account.html";
						}, 2000);

					} else {
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
					}

				} else {
					$(".bankNext").button('reset');
					layer.msg(data.msg);
					$(".wrongTips6").html(data.msg);
				}
			}
		});
	}

	$(".bankNext").on("click", function() {
		$(".wrongTips").html("");
		if(checkSMS() != "") {
			var $btn = $(this)
			$btn.button('loading');
			OpenAccount();
		}
	});
})