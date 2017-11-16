$(function() {
	$(" input[type='text']").val("");
	$(" input[type='password']").val("");
	sessionStorage.setItem("loginStatus", 0);
	//获取token值
	var token;
	var user_id;
	var mobile;
	var juid;
	var sendMobile = "";
	var account_platform_no = "";
	var picCodeId;

	function GetToken() {
		$.ajax({
			type: "post",
			url: GetTokenLink,
			async: false,
			success: function(data) {
				data = jsonchange(data);
				console.log(data);
				if(data.code == "success") {
					token = data.model.token;
				} else {
					console.log(data.msg);
				}

			}
		});
		return token;
	};

	var Token = GetToken();
	//初始加载图片验证码
	function getImagePic() {
		var timestamp = Date.parse(new Date());
		$(".picCode").attr("src", GetImageCodeUrl + "?token=" + Token + "&timestamp=" + timestamp);
	};

	getImagePic();
	//点击切换验证码
	$(".picCode").on("click", function() {
		getImagePic();
		$(".register_piccode").val("");

	});

	//手机号码输入框快速清除
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
	clearInput($(".loginPhoneInput"), $(".logincloseImg"));
	clearInput($("#register_number"), $(".registerCloseImg"));

	//登陆/注册输入表单及对应背景切换
	function formShow(form1, form2, tab1, tab2, url) {
		tab1.on("click", function() {
			tab1.addClass("active");
			tab2.removeClass("active");
			getImagePic();
			form1.show();
			form2.hide();
			$(".login_body").css({
				"background": "url(" + url + ") no-repeat center center",
			});
		})
	};
	formShow($("#login_form"), $("#register_form"), $(".tab_login"), $(".tab_register"), '../../img/1LoginRegister/bck_login.png');
	formShow($("#register_form"), $("#login_form"), $(".tab_register"), $(".tab_login"), '../../img/1LoginRegister/bck_register.png');
	//头部过来
	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串   
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	var obj1 = GetRequest();
	if(obj1.fromHeader == 1) {
		$(".tab_register").addClass("active");
		$(".tab_login").removeClass("active");
		$("#register_form").show();
		$("#login_form").hide();
		$(".login_body").css({
			"background": "url(../../img/1LoginRegister/bck_register.png) no-repeat center center",
		});
	} else {
		$(".tab_login").addClass("active");
		$(".tab_register").removeClass("active");
		$("#register_form").hide();
		$("#login_form").show();
		$(".login_body").css({
			"background": "url(../../img/1LoginRegister/bck_login.png) no-repeat center center",
		});
		$("body").keydown(function() {
			if(event.keyCode == "13") {
				LOgin();
			}
		});

	}

	//忘记密码跳转
	$(".forgetLink").on("click", function() {
		window.location.href = "forgetPassword.html";
	})
	//密码输入框切换密码显示状态
	function swichEye(inputName, closeName, url1, url2) {
		//点击眼睛  两种状态切换（眼睛睁开：输入框为明文状态  ；眼睛闭合：输入框为密文状态）
		$(".logineyeImg").click(function() {
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
	swichEye($("#register_password"), $(".logineyeImg"), '../../img/1LoginRegister/icon_password_show.png', '../../img/1LoginRegister/icon_password_hide.png');

	//邀请码输入框切换下拉
	function toggleInvitcode(btn, inp) {
		btn.on("click", function() {
			inp.toggleClass("hide")
		})
	};
	toggleInvitcode($(".invitcode"), $(".reg_invitcode"));

	//注册协议同意与否
	function regDealToggle(deal, btn, url1, url2) {
		deal.on("click", function() {
			btn.toggleClass("disabled");
			if(deal.attr("src") == url1) {
				deal.attr("src", url2)
			} else {
				deal.attr("src", url1)
			}
		})
	};
	regDealToggle($("#register_form .deal img"), $("#register_form footer"), "../../img/1LoginRegister/icon_gou_cheng.png", "../../img/1LoginRegister/icon_gou_hui.png");
	//登录表单用户输入前端数据格式验证与提示
	function login() {
		//所有输入框 光标移除
		var arr = [];
		$(".logineError").html("");
		var phoneNumber = $(".loginPhoneInput").val().replace(/\s/g, ""); //手机号码的值(中间空格处理)
		var passwordNumber = $(".loginPasswordInput").val().trim(); //密码的值(去掉首尾空格)
		//手机号码为空判断
		var checkNull = inputIsNull(phoneNumber);
		if(checkNull != "200") {
			$(".logineError").html(tips[0]);
			return arr;
		};
		//手机号码规则判断
		var checkFlag = checkPhone(phoneNumber);
		if(checkFlag != "200") {
			$(".logineError").html(tips[0]);
			return arr;
		};
		//密码码为空判断
		var checkNull = inputIsNull(passwordNumber);
		if(checkNull != "200") {
			$(".logineError").html(tips[0]);
			return arr;
		};
		//		密码规则判断  涉及后台次数限制不做拦截
		var checkFlag = checkLoginPassword(passwordNumber);
		if(checkFlag != "200") {
			$(".logineError").html(tips[0]);
			return arr;
		};
		arr[0] = phoneNumber;
		arr[1] = passwordNumber;
		return arr;
	}

	$(".NextBtnsf").on("click", function() {
		//console.log("00");
		if(checkNameIDcard() != "") {
			$(".NextBtnsf").addClass("unClick");
			$(".TipsM").html("");
			isActivate();

			//			window.location.href = "BankCard.html";
			//			sessionStorage.setItem("userName", $(".nameInput").val())
			//			sessionStorage.setItem("IDcard", $(".IDInput").val())
		};
	});

	function LOgin() {
		$(".registerError").html("");
		$(".logineError").html("");
		if(login() != "") {
			$(".loginButton").addClass("UnClickBtn");
			$(".loginButton").html("正在登录");
			$.ajax({
				type: "post",
				url: Login,
				async: true,
				data: {
					phoneNum: $(".loginPhoneInput").val().replace(/\s/g, ""),
					passWord: $(".loginPasswordInput").val(),
					client: client,
					platform:platform,
					token: Token
				},
				success: function(data) {
					data = jsonchange(data);
					console.log(data);
					if(data.code == "success") {
						layer.msg("登录成功");
						sessionStorage.clear();

						user_id = data.model.userCode;
						mobile = data.model.mobile;
						openAccountStatus = data.model.openAccountStatus;

						sessionStorage.setItem("user_id", data.model.userCode);
						sessionStorage.setItem("mobile", data.model.mobile);
						sessionStorage.setItem("loginStatus", "1");
						sessionStorage.setItem("openAccountStatus", data.model.openAccountStatus);
						window.location.href = "../../index.html";
					} else {
						$(".logineError").html(data.msg);
						$(".loginButton").removeClass("UnClickBtn");
						$(".loginButton").html("登录");
					}

				}
			});
		};
	}
	//登录按钮请求登录接口
	$(".loginButton").on("click", function() {
		LOgin();
	});

	//注册表单用户输入前端数据格式验证与提示
	function register() {
		//所有输入框 光标移除
		var arr = [];
		$(".registerError").html("");
		var regNumber = $(".register_number").val().replace(/\s/g, ""); //手机号码的值(中间空格处理)
		var picCode = $(".register_piccode").val().replace(/\s/g, "");
		var smsCode = $(".register_smscode").val().replace(/\s/g, "");
		var regPassword = $(".register_password").val().trim(); //密码的值(去掉首尾空格)
		var regInvitcode = $(".register_invitcode").val().replace(/\s/g, ""); //密码的值(去掉首尾空格)
		//手机号码为空判断
		var checkNull = inputIsNull(regNumber);
		if(checkNull != "200") {
			$(".registerError").html(tips[1]);
			return arr;
		};
		//手机号码规则判断
		var checkFlag = checkPhone(regNumber);
		if(checkFlag != "200") {
			$(".registerError").html(tips[1]);
			return arr;
		};
		//图片验证码
		var checkNull = inputIsNull(picCode);
		if(checkNull != "200") {
			$(".registerError").html("图形验证码不能为空");
			return arr;
		};
		var checkFlag = checkImgCodeNumber(picCode);
		if(checkFlag != "200") {
			$(".registerError").html(tips[2]);
			return arr;
		};
		//短信验证码
		var checkNull = inputIsNull(smsCode);
		if(checkNull != "200") {
			$(".registerError").html("短信验证码不能为空");
			return arr;
		};
		var checkFlag = checkCodeNumber(smsCode);
		if(checkFlag != "200") {
			$(".registerError").html(tips[3]);
			return arr;
		};

		//密码码为空判断
		var checkNull = inputIsNull(regPassword);
		if(checkNull != "200") {
			$(".registerError").html("密码不能为空");
			return arr;
		};
		//密码规则判断  涉及后台次数限制不做拦截
		var checkFlag = checkLoginPassword(regPassword);
		if(checkFlag != "200") {
			$(".registerError").html(tips[4]);
			return arr;
		};

		arr[0] = regNumber;
		arr[1] = picCode;
		arr[2] = smsCode;
		arr[3] = regPassword;
		return arr;
	}
	//注册按钮请求注册接口
	$(".registerButton").on("click", function() {
		$(".registerError").html("");
		if(register() != "") {
			$(".registerButton").addClass("UnClickBtn");
			$(".registerButton").html("正在注册中...");
			$(".registerError").html("");
			$.ajax({
				type: "post",
				url: Register,
				async: true,
				data: {
					phoneNum: $(".register_number").val().replace(/\s/g, ""),
					passWord: $(".register_password").val(),
					SmsCode: $(".register_smscode").val(),
					imageCode: $(".register_piccode").val(),
					platform: platform,
					version: version,
					client: client,
					token: Token
				},
				success: function(data) {
					data = jsonchange(data);
					console.log(data);
					if(data.code == "success") {
						layer.msg("注册成功");
						$(".registerButton").html("注册");
						$(".registerButton").removeClass("UnClickBtn");
						setTimeout(function() {
							window.location.href = "../../html/1LoginRegister/login.html?fromHeader=0";
						}, 1500);
					} else {
						$(".registerError").html(data.msg);
						$(".registerButton").removeClass("UnClickBtn");
						$(".registerButton").html("注册");
					}
				}
			});
		}
	})
	//验证码发送请求成功后开始倒计时
	var countDown = CountdownNumber; //验证码时间
	function settime() {
		if(countDown == 0) {
			$(".get_smscode").removeClass("UnClick");
			$(".get_smscode").html("重新获取");
			countDown = CountdownNumber;
			return;
		} else {
			$(".get_smscode").addClass("UnClick");
			$(".get_smscode").html(countDown + "s");
			countDown--;
		};
		setTimeout(function() {
			settime();
		}, 1000)

	}
	//发送注册验证码前用户输入前端数据格式验证与提示
	function sendcode() {
		var arr = [];
		$(".registerError").html("");
		var regNumber = $(".register_number").val().replace(/\s/g, ""); //手机号码的值(中间空格处理)
		var picCode = $(".register_piccode").val().replace(/\s/g, "");
		//手机号码为空判断
		var checkNull = inputIsNull(regNumber);
		if(checkNull != "200") {
			$(".registerError").html(tips[1]);
			return arr;
		};
		//手机号码规则判断
		var checkFlag = checkPhone(regNumber);
		if(checkFlag != "200") {
			$(".registerError").html(tips[1]);
			return arr;
		};
		//图片验证码
		var checkNull = inputIsNull(picCode);
		if(checkNull != "200") {
			$(".registerError").html(tips[2]);
			return arr;
		};
		var checkFlag = checkImgCodeNumber(picCode);
		if(checkFlag != "200") {
			$(".registerError").html(tips[2]);
			return arr;
		};
	}

	function SendMssCode() {
		$.ajax({
			type: "post",
			url: sendCodeMessageUrl,
			async: true,
			data: {
				phoneNum: $(".register_number").val().replace(/\s/g, ""),
				token: Token,
				operationType: "register",/*操作类型:register(注册),forget(忘记密码)	*/
				imageCode: $(".register_piccode").val(),
				platform:platform,
				smsTemplateCode: "100",
			},
			success: function(data) {
				data = jsonchange(data);
				console.log(data);
				if(data.code == "success") {
					layer.msg('发送成功');
					settime();
				} else {
					getImagePic();
					$(".register_piccode").val("");
					$(".registerError").html(data.msg);
					$(".get_smscode").removeClass("UnClick");
					$(".get_smscode").html("获取验证码");
				}
			}
		});
	}

	//发送验证码按钮请求后台接口
	$(".get_smscode").on("click", function() {
		$(".registerError").html("");
		$(".get_smscode").addClass("UnClick");
		if(sendcode() != "") {
			SendMssCode();
			$(".get_smscode").html("正在发送");
		} else {
			$(".get_smscode").removeClass("UnClick");
			$(".get_smscode").html("获取验证码");
		}
	})

})