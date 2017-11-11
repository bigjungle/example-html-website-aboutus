$(function() {
	$(".headerSelect div").eq(0).addClass("accountDivBtn");
	var mobile = sessionStorage.getItem("mobile");
	var user_id = sessionStorage.getItem("user_id");

	$(".bkUserName").val(sessionStorage.getItem("user_name_"));
	$(".ID_card").val(sessionStorage.getItem("id_number_"));
	$(".bkUserName").addClass("disabled");
	$(".ID_card").addClass("disabled");

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
	if(data.code == "success") {

	} else {
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
			newCode();
		}
	});

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

	var SmsSeq2;

	function newCode() {
		$.ajax({
			type: "post",
			url: openSmsUrl,
			data: {
				BusiType: "rebind",
				mobile: $(".newPhoneNum").val().replace(/\s/g, ""),
				bankCardNo: $(".newCardNum").val().replace(/\s/g, ""),
				SmsTempType: 'N',
				usrCustId: sessionStorage.getItem("ThirdUserId"),
				client: client,
				platform: platform,
				version: version
			},
			dataType: "json",
			success: function(data) {
				data = jsonchange(data);
				console.log("新手机");
				console.log(data);
				if(data.code == "success") {
					settime();
					SmsSeq2 = data.model.OutMap.SmsSeq;
				} else {
					$(".wrongTips6").html(data.msg);
					$('.bankIputSendCode').button('reset');
				}
			}
		});
	}

	function checkSMS() {
		var arr = [];
		var sms_code = $(".inputCode").val().replace(/\s/g, "");
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
	//调用换绑卡的接口
	function changeCard() {

		if(testType == "1") {
			var smsSeq = "AAAAAAAA";
			var orgSmsCode = "666666";
			var orgSmsSeq = "AAAAAAAA";
		} else {
			var smsSeq = SmsSeq2;
			var orgSmsSeq = sessionStorage.getItem("SmsSeq1");
			var orgSmsCode = sessionStorage.getItem("oldCodeM");
		}

		$.ajax({
			type: "post",
			url: changeCardUrl,
			data: {
				phoneNum: mobile,
				bankId: bankVal,
				openAcctId: $(".newCardNum").val().replace(/\s/g, ""),
				usrMp: $(".newPhoneNum").val().replace(/\s/g, ""),
				smsCode: $(".inputCode").val().replace(/\s/g, ""),
				smsSeq: smsSeq,
				orgSmsCode: orgSmsCode,
				orgSmsSeq: orgSmsSeq,
				client: client,
				platform: platform,
				version: version,
				bgRetUrl: "myCard.html",
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("换绑卡");
				console.log(data);
				if(data.code == "success") {
					layer.msg(data.msg);
					setTimeout(function() {
						window.location.href = "myCard.html";
					}, 2000)
				} else {
					$(".wrongTips6").html(data.msg);
					$('.bankNext').button('reset');
				}
			}
		})
	}

	$(".bankNext").on("click", function() {
		$(".wrongTips").html("");
		if(checkSMS() != "") {
			var $btn = $(this)
			$btn.button('loading');
			changeCard();
		}
	});
})