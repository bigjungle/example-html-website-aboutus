$(function() {
	$(".headerSelect div").eq(0).addClass("accountDivBtn");
	var mobile = sessionStorage.getItem("mobile");
	var user_id = sessionStorage.getItem("user_id");
	var juid = sessionStorage.getItem('juid');
	var orgCustNo = "";
	var limitMoney;
	var data = searchUserStatus();
	if(data.code == "success") {
		if(data.model.userStatus.openAccountStatus == "1") {

		} else {
			myAccountMes();
			useraccount();
			getCouponList();
		}
	} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	}

	$(".bankIputKeyBtn").on("click", function() {
		$(".myCardVoucherList").slideDown(300);
	});
	/*卡券*/
	function getCouponList() {
		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
			type: "post",
			url: withDrawCouponUrl,
			async: false,
			data: {
				phoneNum: mobile,
				platform: platform,
				client: client,
				page: "1",
				limit: "100",
			},
			success: function(data) {
				data = jsonchange(data);
				//console.log("卡券");
				//console.log(data);
				if(data.code == "success") {
					$(".myCardVoucherList").html("");
					var info = data.model.dataList;
					var len = info.length;
					if(len > 0) {
						for(var i = 0; i < len; i++) {
							var type = info[i].coupon_type; //1.加息券 2.返现券 3.提现券
							var className;
							if(info[i].canUse == "1") {
								className = "";
							} else {
								className = "KQgray"
							};
							var Type;
							if(info[i].type == "1") {
								Type = '%';
							} else {
								Type = '元';
							}
							var coupArr = ["", "加息券", "返现券", "提现券"];
							var ctc = '<div class="KQhig am-animation-fade">' +
								'	<p class="cardName">' + info[i].effect + Type + coupArr[info[i].type] + '</p>' +
								'	<div class="cardIntrcation">' +
								'		<p> <i></i> ' + info[i].deliveryRuleDetail + '</p>' +
								'	</div>' +
								'	<input type="radio" name="myCardVoucher" id="myCardVoucher" value="' + info[i].receiveId + '" />' +
								'	<i class="thisType" style="display: none;">' + info[i].effect + '</i>' +
								'</div>';
							$(".myCardVoucherList").append(ctc);
						}
					} else {
						var zwsj = '<p style="width: 7.4rem;" class="zwsj">暂无提现免息券</p>';
						$(".myCardVoucherList").append(zwsj);
					}
				} else if(data.code == "P-1011" || data.code == "user_not_login") {
					layer.msg('登录超时，请重新登陆');exitLogin();
					setTimeout(function() {
						window.location.href = "../../html/1LoginRegister/login.html";
					}, 1500);

				} else {
					layer.msg(data.msg);
				}
			}
		});
	}

	var owner_id = "";
	var ThisType = "";
	var effect = 0;
	$(".myCardVoucherList .KQhig").on("click", function() {
		//已选择
		effect = parseFloat($(this).find(".thisType").html());
		if($(this).hasClass("KQhigCheck")) {
			$(this).removeClass("KQhigCheck");
			$(this).find("input").attr("data-am-ucheck");
			owner_id = "";
			//console.log(owner_id);
			feeMoney(cash_chl_);
			$(".bankInput").val("");

		} else {
			//未选择
			$(".KQhig").removeClass("KQhigCheck");
			$(this).addClass("KQhigCheck");
			owner_id = $(this).find("input").val();
			//console.log(owner_id);
			feeMoney(cash_chl_);
			$(".bankInput").val($(this).find(".cardName").html());
			$(".myCardVoucherList").slideUp(300);
		}
	});

	/*银行卡信息*/
	function myAccountMes() {

		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
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
					orgCustNo = info.ThirdUserId;
					sessionStorage.setItem("user_cus_id_", info.ThirdUserId);
					sessionStorage.setItem("bankCode", info.BankCode);
					$(".TXzhye").html(formatNum(info.AvailableAmount));
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
						'<div class="withdrawalTipsDiv">' +
						'	<p class="Withdrawaltips">预计到账时间<i>当天到账</i>(该时间为平台预估时间，具体以实际到账时间为准)</p>' +
						'</div>';

					$(".bankCard").append(ctc);

				} else if(data.code == "P-1011" || data.code == "user_not_login") {
					layer.msg('登录超时，请重新登陆');exitLogin();
					setTimeout(function() {
						window.location.href = "../../html/1LoginRegister/login.html";
					}, 1500);

				} else {
					layer.msg(data.msg);
				}

			}
		});

	}
	/*账户余额*/
	var KTXje;
	var TXye;

	function useraccount() {
		$(".KTXje").html("努力加载中...");
		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
			type: "post",
			url: useraccountUrl,
			async: true,
			data: {
				phoneNum: mobile,
				client: client,
				platform: platform
			},
			success: function(data) {
				data = jsonchange(data);
				//console.log("账户中心余额");
				//console.log(data);
				if(data.code == "success") {
					$(".KTXje").html(formatNum(data.model.canWithdrawAmount));
					KTXje = parseFloat(data.model.canWithdrawAmount);
					TXye = parseFloat(data.model.availableAmount);
				} else if(data.code == "P-1011" || data.code == "user_not_login") {
					layer.msg('登录超时，请重新登陆');exitLogin();
					setTimeout(function() {
						window.location.href = "../../html/1LoginRegister/login.html";
					}, 1500);

				} else {
					layer.msg(data.msg);
				}

			}
		});

	}

	$(".bankIputSendCode").on("click", function() {
		$(".WithdrawalInput").val(parseFloat($(".KTXje").html().replace(",", "")));
		if(cash_chl_ == undefined) {} else {
			feeMoney(cash_chl_);
		};
	});
	$(".WithdrawalInput").on("blur", function() {
		////console.log(cash_chl_);
		if(cash_chl_ == undefined) {} else {
			feeMoney(cash_chl_);
		};
	});
	var cash_chl_ = $('input:radio[name="Withdrawals"]:checked').val();
	$(".checkRadio>label").on("click", function() {
		cash_chl_ = $(this).find("input").val();
		//console.log(cash_chl_);
		if(cash_chl_ == undefined) {} else {
			if(cash_chl_ == "IMMEDIATE") {
				$(".Withdrawaltips").html("");
				var ctc = '预计到账时间<i>当天到账</i>(该时间为平台预估时间，具体以实际到账时间为准)';
				$(".Withdrawaltips").append(ctc);
				feeMoney(cash_chl_);
				//				$(".bankIputKeyBtn").addClass("disabled");
				$(".KQhig").removeClass("KQhigCheck");
				owner_id = "";
				$(".KQhig").addClass("disabled");
				$(".bankInput").val("");
				$(".myCardVoucherList").slideUp(300);
				$(".bankInput").val("提现券只适用于普通提现");
			} else {
				//				$(".bankIputKeyBtn").removeClass("disabled");
				$(".Withdrawaltips").html("");
				var ctc = '预计到账时间<i>T+1工作日,节假日顺延</i>(该时间为平台预估时间，具体以实际到账时间为准)';
				$(".Withdrawaltips").append(ctc);
				feeMoney(cash_chl_);
				$(".KQhig").removeClass("disabled");
				$(".bankInput").val("请选择提现免息券");
			}
			cash_chl_ = $(this).find("input").val();
		}
	});
	var fee;
	var method_;

	function feeMoney(cash_chl_) {
		var cash_chl_ = cash_chl_;
		var amount_;
		if($(".WithdrawalInput").val() != "") {
			amount_ = $(".WithdrawalInput").val();
		} else {
			amount_ = 0;

		}
		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
			type: "post",
			url: userCashFeeUrl,
			async: true,
			data: {
				cashChl: cash_chl_,
				transAmt: amount_,
				platform:platform,
				client:client
			},
			success: function(data) {
				data = jsonchange(data);
				//				//console.log("提现手续费");
				//				//console.log(data);
				if(data.code == "success") {
					fee = data.model.fee;
					$(".fee").html(formatNum(data.model.fee) + "元");

					if($(".WithdrawalInput").val() != "") {
						if($(".WithdrawalInput").val() <= 3) {
							$(".sjdz").html("0.00");
						} else {
							$(".sjdz").html(formatNum((parseFloat($(".WithdrawalInput").val()) - data.model.feee).toFixed(2)));
						}

					} else {
						$(".sjdz").html("0.00");
					}

					if(owner_id == "" || cash_chl_ == "IMMEDIATE") {
						fee = data.model.fee;
						$(".fee").html(formatNum(data.model.fee) + "元");
						if($(".WithdrawalInput").val() != "") {
							if($(".WithdrawalInput").val() <= 3) {
								$(".sjdz").html("0.00");
							} else {
								$(".sjdz").html(formatNum((parseFloat($(".WithdrawalInput").val()) - data.model.fee).toFixed(2)));
							}
						} else {
							$(".sjdz").html("0.00");
						}
					} else {

						if(effect <= parseFloat(fee)) {
							fee = data.model.fee;
							$(".fee").html(formatNum(fee - effect) + "元");
							if($(".WithdrawalInput").val() != "") {
								$(".sjdz").html(formatNum(formatNum(parseFloat($(".WithdrawalInput").val()) + effect - fee)));
							} else {
								$(".sjdz").html("0.00");
							}

						} else {
							fee = data.model.fee;
							$(".fee").html("0.00元");
							if($(".WithdrawalInput").val() != "") {
								$(".sjdz").html(formatNum(parseFloat($(".WithdrawalInput").val())));
							} else {
								$(".sjdz").html("0.00");
							}

						}

					}

				} else if(data.code == "P-1011" || data.code == "user_not_login") {
					layer.msg('登录超时，请重新登陆');exitLogin();
					setTimeout(function() {
						window.location.href = "../../html/1LoginRegister/login.html";
					}, 1500);

				} else {
					$(".TipsMTX").html(data.msg);
				}
			}
		});
	};

	function toCash() {
		var data;
		if(owner_id != "") {
			data = {
				usrCustId: orgCustNo,
				transAmt: $(".WithdrawalInput").val(),
				cashChl: cash_chl_,
				fee: fee,
				retUrl: returnUrl + "html/3/loading.html?TXtype=1",
				platform: platform,
				client: client,
				version: version,
				receiveId: owner_id
			};
		} else {
			data = {
				usrCustId: orgCustNo,
				transAmt: $(".WithdrawalInput").val(),
				cashChl: cash_chl_,
				fee: fee,
				retUrl: returnUrl + "html/3/loading.html?TXtype=1",
				platform: platform,
				client: client,
				version: version
			};
		}
		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
			type: "post",
			url: toCashUrl,
			async: true,
			data: data,
			success: function(data) {
				data = jsonchange(data);
				//console.log(data);
				if(data.code == "success") {
					$('#subForm').attr('action', data.model.ServiceUrl);
					var msgParamDto = data.model.InMap;
					sessionStorage.setItem('order_no_', msgParamDto.OrdId);
					$(".linkToBank").show();
					$.each(msgParamDto, function(key, value) {
						if(key == "ReqExt") {
							var ctc = '<textarea rows="1" cols="500" style="display: none" name="ReqExt">' + value + '</textarea>'
						} else {
							var ctc = '  <input type="hidden" name="' + key + '"  class="hidden"   value="' + value + '" /> ';
						}
						$("#subForm").append(ctc);
					});
					setTimeout(function() {
						$("#subForm").submit();
					}, 1500);
				} else if(data.code == "P-1011" || data.code == "user_not_login") {
					layer.msg('登录超时，请重新登陆');exitLogin();
					setTimeout(function() {
						window.location.href = "../../html/1LoginRegister/login.html";
					}, 1500);

				} else {
					$(".wrongTipsR").html(data.msg);
					$(".RechargeBtn").button('reset');
				}
			}
		});
	};

	function TXcheck() {
		var arr = [];
		var TXMoney = $(".WithdrawalInput").val();
		var checkNull = inputIsNull(TXMoney);
		if(checkNull != "200") {
			$(".wrongTipsR").html("提现金额不能为空");
			return arr;
		};
		if(TXMoney <= 0) {
			$(".wrongTipsR").html("提现金额不能为0");
			return arr;
		};
		////console.log(typeof(KTXje));
		if(TXMoney > KTXje) {
			$(".wrongTipsR").html("可提现余额不足");
			return arr;
		};
		if(TXMoney < 100) {
			$(".wrongTipsR").html("提现金额不能小于100元");
			return arr;
		};
		////console.log(typeof(TXye));

		////console.log(typeof(TXMoney));
		if(TXMoney > TXye) {
			$(".wrongTipsR").html("提现金额不能大于可用余额");
			return arr;
		};

		if(cash_chl_ == undefined) {
			$(".wrongTipsR").html("请选择提现方式");
			return arr;
		}

		arr[0] = TXMoney;
		arr[1] = cash_chl_;
		return arr;
	};

	$(".RechargeBtn").on("click", function() {
		$(".wrongTipsR").html("");
		if(TXcheck() != "") {
			var $btn = $(this)
			$btn.button('loading');
			toCash();
		}

	});
})