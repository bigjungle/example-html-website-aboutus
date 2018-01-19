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
	var bankId;

	function myAccountMes() {
		$.ajax({
			type: "post",
			url: bankRchargeLimitUrl,
			async: false,
			data: {
				phoneNum: mobile,
				client: client,
				platform: sessionStorage.getItem("userform"),
			},
			success: function(data) {
				data = jsonchange(data);
				//console.log("银行限额");
				//console.log(data);
				if(data.code == "success") {
					var info = data.model;
					ThirdUserId = info.ThirdUserId;
					bankId = info.BankNo;
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

	function oldCode() {
		var myCardNum = sessionStorage.getItem("card_number_");
		var mobile = sessionStorage.getItem("mobile");
		//		var 
		$.ajax({
			type: "post",
			url: changeCardUrl,
			data: {
				phoneNum: mobile,
				bankId: bankId,
				openAcctId: "",
				usrMp: "",
				smsCode: "",
				smsSeq: "",
				orgSmsCode: "",
				orgSmsSeq: "",
				client: client,
				platform: platform,
				version: version,
				retUrl: returnUrl + "html/3/myCard.html",
				bgRetUrl: ""
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("老手机")
				console.log(data);
				if(data.code == "success") {
					$('#subForm').attr('action', data.model.ServiceUrl);
					var msgParamDto = data.model.InMap;
					$(".linkToBank").show();
					$.each(msgParamDto, function(key, value) {
						var ctc = '  <input type="hidden" name="' + key + '"  class="hidden"   value="' + value + '" /> ';
						$("#subForm").append(ctc)
					});
					setTimeout(function() {
						$("#subForm").submit();
					}, 1500)
				} else {
					$(".wrongTips").html(data.msg);
					$(".changeNext").button('reset');
				}
			}
		});
	};

	$(".changeNext").on("click", function() {
		$(".wrongTips").html("");
		var $btn = $(this);
		$btn.button('loading');
		oldCode();
	});
})