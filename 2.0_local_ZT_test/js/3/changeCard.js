$(function() {
	$(".headerSelect div").eq(0).addClass("accountDivBtn");
	$(".asLeft p>a").eq(4).css({
		'color': "#ff8000"
	});

	var data = searchUserStatus();
	if(data.code == "success") {

		myAccountMes();

	} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	}

	var ThirdUserId;

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
					ThirdUserId = info.ThirdUserId;
					sessionStorage.setItem("ThirdUserId", info.ThirdUserId)
					var ctc = '	<div>' +
						'		<div class="bankCardLogo1">' +
						'			<img src="../../img/bank/color/' + info.BankCode + '.png" />' +
						'			<div>' +
						'				<p>' + info.BankName + '</p>' +
						'				<p>储蓄卡</p>' +
						'			</div>' +
						'		</div>' +
						'		<div class="bankCardNum1">' +
						'		<p>' + BankNumber(info.BankCardNo) + '</p>' +
						'		<p>快捷支付</p>' +
						'		</div>' +
						'	</div>' +
						'	<div class="cardUserMes">' +
						'		<p>持卡人姓名：' + NameHidden(sessionStorage.getItem("user_name_")) + '</p>' +
						'		<p>手机号：' + PhoneNumber(sessionStorage.getItem("band_mobile_")) + '</p>' +
						'	</div>';

					$(".bankMobile").html(PhoneNumber(sessionStorage.getItem("band_mobile_")));

					$(".bankCard1").append(ctc);

				}

			}
		});

	}

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

	function checkSMS() {
		var arr = [];
		var sms_code = $(".oldCodeM").val();
		//短信验证码
		var checkNull = inputIsNull(sms_code);
		if(checkNull != "200") {
			$(".wrongTips").html("短信验证码错误");
			return arr;
		};
		var checkFlag = checkCodeNumber(sms_code);
		if(checkFlag != "200") {
			$(".wrongTips").html("短信验证码错误");
			return arr;
		};
		arr[0] = sms_code;
		return arr;

	}
	//解绑卡短信
	var SmsSeq1;

	function oldCode() {
		var myCardNum = sessionStorage.getItem("card_number_");
		var band_mobile_ = sessionStorage.getItem("band_mobile_");
		$.ajax({
			type: "post",
			url: openSmsUrl,
			data: {
				BusiType: "rebind",
				mobile: band_mobile_,
				bankCardNo: myCardNum,
				SmsTempType: "O",
				usrCustId: ThirdUserId,
				client: client,
				platform: platform,
				version: version
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("老手机")
				console.log(data);
				if(data.code == "success") {
					settime();
					SmsSeq1 = data.model.OutMap.SmsSeq;
					sessionStorage.setItem("SmsSeq1", data.model.OutMap.SmsSeq);
					$(".changeNext").button('reset');
				} else {
					$(".wrongTips").html(data.msg);
					$(".bankIputSendCode").button('reset');
				}
			}
		});
	};
	$('.bankIputSendCode').click(function() {
		var $btn = $(this);
		$btn.button('loading');
		oldCode();
	});
	$(".changeNext").button('loading');
	$(".changeNext").on("click", function() {
		$(".wrongTips").html("");
		if(checkSMS() != "") {
			sessionStorage.setItem("oldCodeM", $(".oldCodeM").val());
			var $btn = $(this);
			$btn.button('loading');
			window.location.href = "changeCardNext.html";
		}
	});
})