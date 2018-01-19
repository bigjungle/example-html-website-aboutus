$(function() {
	var mobile = sessionStorage.getItem("mobile");
	$(".headerSelect div").eq(0).addClass("accountDivBtn");
	$(".asLeft p>a").eq(4).css({
		'color': "#ff8000"
	});

	$(".tender_plan_mark").on("click", function() {
		checkSign();
		//		autoTender();
	});

	$(".passWordChange").on("click", function() {
		$(".changePassword").show();
	});

	var data = searchUserStatus();
	if(data.code == "success") {
		$(".userPhone").html(PhoneNumber(sessionStorage.getItem("mobile")));

		if(data.model.userStatus.openAccountStatus == "1") {
			/*开户状态 1:未开户 3:已开户 4:待激活（汇付开户，已绑卡，未设置交易密码）*/
			$(".asList11").html("");
			$(".asList2").html("");
			$(".asList3").html("");
			var ctc1 = '<div>' +
				'	<p>存管账户</p>' +
				'	<p>中赢金融与银行合作资金存管</p>' +
				'</div>' +
				'<div>未开通</div>' +
				'<div class="openSHaccount">立即开通</div>';
			$(".asList11").append(ctc1);
			var ctc2 = '<div>' +
				'	<p>实名认证</p>' +
				'	<p>账户更安全投资更放心</p>' +
				'</div>' +
				'<div>未认证</div>' +
				'<div class="openSHaccount">立即认证</div>';
			$(".asList2").append(ctc2);
			var ctc3 = '<div>' +
				'	<p>绑定手机</p>' +
				'	<p>账户更安全投资更放心</p>' +
				'</div>' +
				'<div>已绑定</div>' +
				'<div>' + PhoneNumber(sessionStorage.getItem("mobile")) + '</div>';
			$(".asList3").append(ctc3);

			$(".asButton").on("click", function() {
				$(".openCG").show();
			});

		} else {
			$(".acProgressHig").css({
				width: 1.6 + "rem"
			});
			$(".leveWord").html("中");
			//已开户
			/*待激活*/

			$.ajax({
				type: "post",
				url: userInfoUrl,
				async: false,
				data: {
					phoneNum: sessionStorage.getItem("mobile"),
					client: client,
					platform: platform,
				},
				success: function(data) {
					data = jsonchange(data);
					//console.log("用户信息");
					//console.log(data);
					if(data.code == "success") {
						$(".asList11").html("");
						$(".asList2").html("");
						$(".asList3").html("");
						var ctc1 = '<div>' +
							'	<p>存管账户</p>' +
							'	<p>中赢金融与银行合作资金存管</p>' +
							'</div>' +
							'<div>已开通</div>' +
							'<div>' + data.model.UsrCustId + '</div>';
						$(".asList11").append(ctc1);

						var ctc2 = '<div>' +
							'	<p>实名认证</p>' +
							'	<p>账户更安全投资更放心</p>' +
							'</div>' +
							'<div>已认证</div>' +
							'<div>' +
							'<p style="margin-top: 0.285rem;">' + NameHidden(data.model.UsrCardInfolist[0].UsrName) + '</p>' +
							'<p>' + IDcardNumber(data.model.UsrCardInfolist[0].CertId) + '</p>' +
							'</div>';
						$(".asList2").append(ctc2);

						var ctc3 = '<div>' +
							'	<p>绑定手机</p>' +
							'	<p>账户更安全投资更放心</p>' +
							'</div>' +
							'<div>已绑定</div>' +
							'<div>' + PhoneNumber(sessionStorage.getItem("mobile")) + '</div>';
						$(".asList3").append(ctc3);
					}
				}
			});

			//自动复投
			if(data.model.userStatus.setAutoBuyBidFlag == 0) {
				$(".asList5").html("");
				var ctc5 = '<div>' +
					'	<p>自动投标</p>' +
					'	<p>自动投标队列功能、项目集合的一键投标功能和</p>' +
					'	<p>快捷投标功能都需要开启自动投标授权后才可以使用。</p>' +
					'</div>' +
					'<div>未开启</div>' +
					'<div>' +
					'	<p class="asButton">' +
					'		<span class="asButtonSpan"></span>' +
					'		<span class="asButtonSpan1"></span>' +
					'	</p>' +
					'</div> ';
				$(".asList5").append(ctc5);

				$(".asButton").on("click", function() {

					if(data.model.userStatus.openAccountStatus == "4") {
						$(".accountJH").show();
					} else {
						$(".openTB").show();
					}
				});

			} else {
				$(".acProgressHig").css({
					width: 2.0 + "rem"
				});
				$(".leveWord").html("高");
				$(".asList5").html("");
				var ctc5 = '<div>' +
					'	<p>自动投标</p>' +
					'	<p>自动投标队列功能、项目集合的一键投标功能和</p>' +
					'	<p>快捷投标功能都需要开启自动投标授权后才可以使用。</p>' +
					'</div>' +
					'<div>已开启</div>' +
					'<div>' +
					'	<p class="asButton">' +
					'		<span class="asButtonSpan"></span>' +
					'		<span class="asButtonSpan1"></span>' +
					'	</p>' +
					'</div> ';
				$(".asList5").append(ctc5);
				$(".asButton").addClass("disabled");
				$(".asButtonSpan").css({
					left: "0.3rem",
				});
				$(".asButtonSpan1").css({
					width: "100%"
				});

			}

		}

		var bind_mobile_flag = "-c";
		var bind_bank_card_flag;
		if(data.model.userStatus.openAccountFlag == "1") {
			bind_bank_card_flag = "-c";
		} else {
			bind_bank_card_flag = "";
		}
		var sm_mark;
		if(data.model.userStatus.openAccountFlag == "1") {
			sm_mark = "-c";
		} else {
			sm_mark = "";
		}

		$(".ImgDiv").html("");
		var imgFlag = '<img id="asUserMessageImg" src="../../img/assets/sj' + bind_mobile_flag + '.png" />' +
			'<img id="asUserMessageImg" src="../../img/assets/bk' + bind_bank_card_flag + '.png" />' +
			'<img id="asUserMessageImg" src="../../img/assets/sm' + sm_mark + '.png" />';
		$(".ImgDiv").append(imgFlag);

	} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	};

	$(".am-close-spin").on("click", function() {
		$(".alertBg").fadeOut(200);
	});
	$(".closeP").on("click", function() {
		$(".alertBg").fadeOut(200);
	});
	$(".toActivity").on("click", function() {
		toBosAcctActivate();
	});

	$(".openSHaccount").on("click", function() {
		var data = searchUserStatus();
		if(data.code == "success") {
			if(data.model.userStatus.openAccountStatus == "1") {
				/*未开户*/
				$(".openCG").show();

			} else if(data.model.userStatus.openAccountStatus == "4") {
				/*待激活*/
				$(".accountJH").show();

			} else {

			}

		}

	});

	//密码验证
	function changePassword() {
		var arr = [];
		var newPassword = $(".newPassword11").val().replace(/\s/g, "");
		var secondPassword = $(".newPassword22").val().replace(/\s/g, "");
		var oldPassword = $(".oldPassword").val().replace(/\s/g, "");
		var checkNull = inputIsNull(oldPassword);
		if(checkNull != "200") {
			$(".tips1").html("请输入当前登录密码");
			return arr;
		};
		//新密码
		var checkNull = inputIsNull(newPassword);
		if(checkNull != "200") {
			$(".tips2").html("新密码不能为空");
			return arr;
		};
		//新密码密码规则判断
		var checkFlag = checkLoginPassword(newPassword);
		if(checkFlag != "200") {
			$(".tips2").html("密码格式错误");
			return arr;
		};
		//确认密码
		var checkNull = inputIsNull(secondPassword);
		if(checkNull != "200") {
			$(".tips3").html("确认密码不能为空");
			return arr;
		};
		//新密码密码规则判断
		var checkFlag = checkNewPassword(newPassword, secondPassword);
		if(checkFlag != "200") {
			$(".tips3").html("两次密码输入不一致");
			return arr;
		};

		arr[0] = newPassword;
		arr[1] = secondPassword;
		arr[2] = oldPassword;
		return arr;
	};

	function changeLoginPassword() {
		$.ajax({
			type: "post",
			url: changeLoginPasswordUrl,
			async: true,
			data: {
				phoneNum: mobile,
				oldPassword: $(".oldPassword").val().replace(/\s/g, ""),
				newPassword: $(".newPassword11").val().replace(/\s/g, ""),
				newPasswordConfirm: $(".newPassword22").val().replace(/\s/g, ""),
				platform: platform
			},
			success: function(data) {
				data = jsonchange(data);
				//console.log("修改登录密码");
				//console.log(data);
				if(data.code == "success") {
					sessionStorage.clear();
					window.location.href = loginUrl;
				} else {
					$(".tips3").html(data.msg);
					$(".passWordNext").button('reset');
				}
			}
		});
	}

	$(".passWordNext").on("click", function() {
		$(".tips").html("");
		if(changePassword() != "") {
			var $btn = $(this)
			$btn.button('loading');
			changeLoginPassword();
		}
	});
})