$(function() {
	$(".headerSelect div").eq(0).addClass("accountDivBtn");
	$(".asLeft p>a").eq(5).css({
		'color': "#ff8000"
	});
	var data = searchUserStatus();
	if(data.code == "success") {
		if(data.model.userStatus.openAccountStatus == "1") {
			$(".mycardMes").hide();
			$(".noCard").show();
			$(".noCard").on("click", function() {
				window.location.href = "bankCard.html";
			});
			$(".myBankCardI").html("当前绑定0张卡");
		} else {
			myAccountMes();
			$(".myBankCardI").html("当前绑定1张卡");
			$(".mycardMes").show();
			$(".noCard").hide();
		}
	} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	}

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
				//console.log("银行限额");
				//console.log(data);
				if(data.code == "success") {
					var info = data.model;
					sessionStorage.setItem("band_mobile_", info.Mobile);
					sessionStorage.setItem("card_number_", info.BankCardNo);
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
						'		<p>手机号：' + PhoneNumber(info.Mobile) + ' <a href="changeCard.html">解绑卡</a></p>' +
						'	</div>';
					$(".bankCard1").append(ctc);

				}

			}
		});

	}
})