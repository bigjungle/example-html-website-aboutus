$(function() {
	$(" input[type='text']").val("");
	$(" input[type='password']").val("");
	var picCodeId;

	function GetToken() {
		$.ajax({
			type: "post",
			url: GetTokenLink,
			async: false,
			success: function(data) {
				data = jsonchange(data);
				//console.log(data);
				if(data.code == "success") {
					token = data.model.token;
				} else {
					//console.log(data.msg);
				}

			}
		});
		return token;
	};

	var Token = GetToken();
	//初始加载图片验证码
	function getImagePic() {
		var timestamp = Date.parse(new Date());
		$(".codePic").attr("src", GetImageCodeUrl + "?token=" + Token + "&timestamp=" + timestamp);
	};

	getImagePic();
	//点击切换验证码
	$(".codePic").on("click", function() {
		getImagePic();
		$(".imgCode").val("");

	});

	function clearInput(inputName, closeImgName) {
		closeImgName.on("click", function() {
			closeImgName.hide();
			inputName.val("");
			inputName.onblur;
		});
		inputName.on("focus", function() {
			closeImgName.show();
		});
		inputName.on("input", function() {
			closeImgName.show();
		});
		inputName.on("blur", function() {
			setTimeout(function() {
				closeImgName.hide();
			}, 300)
		});
	};

	clearInput($(".phoneNumber"), $(".closeImg"));

	function swichEye(inputName, closeName, url1, url2) {
		//点击眼睛  两种状态切换（眼睛睁开：输入框为明文状态  ；眼睛闭合：输入框为密文状态）
		closeName.click(function() {
			$(this).toggleClass("see");
			/*眼睛时睁开状态*/
			if($(this).hasClass("see")) {
				inputName.attr('type', 'text');
				inputName.focus().val(inputName.val()); //光标放在最后一位
				inputName.focus();
				closeName.attr("src", url1);
				//			};
			} else {
				/*眼睛是闭合状态*/
				inputName.attr('type', 'password');
				inputName.focus().val(inputName.val()); //光标放在最后一位
				inputName.focus();
				closeName.attr("src", url2);
			};
		});
	}
	swichEye($(".setPassword"), $(".eyeImg"), '../../img/1LoginRegister/icon_password_show.png', '../../img/1LoginRegister/icon_password_hide.png');

	function forgetPassword() {
		//所有输入框 光标移除
		var arr = [];
		$(".FPtips").html("");
		var phoneNumber = $(".phoneNumber").val().replace(/\s/g, ""); //手机号码的值(中间空格处理)
		var imgCode = $(".imgCode").val().replace(/\s/g, "");
		var PhoneCode = $(".phoneCode").val().replace(/\s/g, "");
		var passwordNumber = $(".setPassword").val().trim(); //密码的值(去掉首尾空格)
		//手机号码为空判断
		var checkNull = inputIsNull(phoneNumber);
		if(checkNull != "200") {
			$(".FPtips").html(tips[1]);
			return arr;
		};
		//手机号码规则判断
		var checkFlag = checkPhone(phoneNumber);
		if(checkFlag != "200") {
			$(".FPtips").html(tips[1]);
			return arr;
		};
		//图片验证码
		var checkNull = inputIsNull(imgCode);
		if(checkNull != "200") {
			$(".FPtips").html("图形验证码不能为空");
			return arr;
		};
		var checkFlag = checkImgCodeNumber(imgCode);
		if(checkFlag != "200") {
			$(".FPtips").html(tips[2]);
			return arr;
		};
		//短信验证码
		var checkNull = inputIsNull(PhoneCode);
		if(checkNull != "200") {
			$(".FPtips").html("短信验证码不能为空");
			return arr;
		};
		var checkFlag = checkCodeNumber(PhoneCode);
		if(checkFlag != "200") {
			$(".FPtips").html(tips[3]);
			return arr;
		};

		//密码码为空判断
		var checkNull = inputIsNull(passwordNumber);
		if(checkNull != "200") {
			$(".FPtips").html("密码不能为空");
			return arr;
		};
		//密码规则判断  涉及后台次数限制不做拦截
		var checkFlag = checkLoginPassword(passwordNumber);
		if(checkFlag != "200") {
			$(".FPtips").html(tips[4]);
			return arr;
		};
		arr[0] = phoneNumber;
		arr[1] = imgCode;
		arr[2] = PhoneCode;
		arr[3] = passwordNumber;
		return arr;
	}

	function sendC() {
		//所有输入框 光标移除
		var arr = [];
		$(".FPtips").html("");
		var phoneNumber = $(".phoneNumber").val().replace(/\s/g, ""); //手机号码的值(中间空格处理)
		var imgCode = $(".imgCode").val().replace(/\s/g, "");
		var PhoneCode = $(".phoneCode").val().replace(/\s/g, "");
		var passwordNumber = $(".setPassword").val().trim(); //密码的值(去掉首尾空格)
		//手机号码为空判断
		var checkNull = inputIsNull(phoneNumber);
		if(checkNull != "200") {
			$(".FPtips").html(tips[1]);
			return arr;
		};
		//手机号码规则判断
		var checkFlag = checkPhone(phoneNumber);
		if(checkFlag != "200") {
			$(".FPtips").html(tips[1]);
			return arr;
		};
		//图片验证码
		var checkNull = inputIsNull(imgCode);
		if(checkNull != "200") {
			$(".FPtips").html(tips[2]);
			return arr;
		};
		var checkFlag = checkImgCodeNumber(imgCode);
		if(checkFlag != "200") {
			$(".FPtips").html(tips[2]);
			return arr;
		};
		arr[0] = phoneNumber;
		arr[1] = imgCode;
		return arr;
	}

	function SuccessLink() {
		$(".SuccessStion").show();
		$(".forgetPasswordSection").hide();
		var i = 3;
		setInterval(function() {
			if(i >= 1) {
				i--;
				$(".time").html(i + "s");
			} else {

				window.location.href = "login.html";
			}
		}, 1000)
	}

	//短信验证码倒计时
	var countDown = CountdownNumber; //验证码时间
	function settime() {
		if(countDown == 0) {
			$(".sendCode").removeClass("UnClick");
			$(".sendCode").html("重新获取");
			countDown = CountdownNumber;
			return;
		} else {
			$(".sendCode").addClass("UnClick");
			$(".sendCode").html(countDown + "s");
			countDown--;
		};
		setTimeout(function() {
			settime();
		}, 1000)

	}

	function SendMssCode() {
		$.ajax({
			type: "post",
			url: sendCodeMessageUrl,
			async: true,
			data: {
				phoneNum: $(".phoneNumber").val().replace(/\s/g, ""),
				imageCode: $(".imgCode").val(),
				operationType: "forget",
				/*操作类型:register(注册),forget(忘记密码)	*/
				smsTemplateCode: "100",
				token: Token,
				platform:sessionStorage.getItem("userform")
			},
			success: function(data) {
				data = jsonchange(data);
				//console.log(data);
				if(data.code == "success") {
					layer.msg('发送成功');
					settime();
				} else {
					getImagePic();
					$(".imgCode").val("");
					$(".FPtips").html(data.msg);
					$(".sendCode").removeClass("UnClick");
				}
			}
		});
	}

	//发送验证码按钮请求后台接口
	$(".sendCode").on("click", function() {
		$(".sendCode").addClass("UnClick");
		$(".FPtips").html("");
		if(sendC() != "") {
			SendMssCode();
		} else {
			$(".sendCode").removeClass("UnClick");
		}
	})

	$(".FPfooter").on("click", function() {
		if(forgetPassword() != "") {
			$(".FPfooter").addClass("UnClick");
			$(".FPtips").html("");
			$.ajax({
				type: "post",
				url: ForgetPassword,
				async: true,
				data: {
					phoneNum: $(".phoneNumber").val().replace(/\s/g, ""),
					SmsCode: $(".phoneCode").val(),
					passWord: $(".setPassword").val(),
					client: client,
					imageCode: $(".imgCode").val(),
					platform: platform,
					token: Token
				},
				success: function(data) {
					data = jsonchange(data);
					//console.log(data);
					if(data.code == "success") {
						$(".forgetPasswordSection").hide();
						$(".SuccessStion").show();
						SuccessLink();
						$(".FPfooter").removeClass("UnClick");
					} else {
						$(".FPtips").html(data.msg);
						$(".FPfooter").removeClass("UnClick");
					}

				}
			});
		}
	})

})