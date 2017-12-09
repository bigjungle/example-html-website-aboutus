$(function() {
	$(".headerSelect div").eq(0).addClass("accountDivBtn");
	$(".asLeft p>a").eq(0).css({
		'color': "#ff8000"
	});

	$(".am-close-spin").on("click", function() {
		$(".alertBg").hide(200);
	});
	$(".closeP").on("click", function() {
		$(".alertBg").hide(200);
	});
	$(".toActivity").on("click", function() {
		toBosAcctActivate();
	});

	var user_id = sessionStorage.getItem("user_id");
	var mobile = sessionStorage.getItem("mobile");
	var juid = sessionStorage.getItem("juid");
	var tender_plan_mark_ = sessionStorage.getItem("tender_plan_mark_");
	/*卡券*/
	function getInitCouponList(pageNum, status) {
		$(".couponsNumUse").html("加载中");
		var mobile = sessionStorage.getItem("mobile");
		var status = status;
		var pageNum = pageNum;
		$.ajax({
			type: "post",
			url: accountCouponUrl,
			async: true,
			data: {
				phoneNum: mobile,
				client: client,
				platform: platform,
				page: pageNum,
				limit: "6",
				status: status,
				/*卡券状态：1 - 未使用(已领取），2 - 已使用， 3 - 已过期*/
			},
			success: function(data) {
				data = jsonchange(data);
				//console.log("卡券");
				//console.log(data);
				if(data.code == "success") {
					$(".couponsNumUse").html("");
					$(".couponsNumUse").html(data.model.notUsedCount);
				}
			}
		});
	}
	/*账户余额*/
	function useraccount() {
		$(".kyye").html("努力加载中...");
		$(".zcze").html("努力加载中...");
		$(".ljsy").html("努力加载中...");
		$(".ktxje").html("努力加载中...");
		$.ajax({
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
					$(".kyye").html(formatNum(data.model.availableAmount));
					$(".zcze").html(formatNum(data.model.amountTotal));
					$(".ljsy").html(formatNum(data.model.profitAll));
					$(".ktxje").html(formatNum(data.model.canWithdrawAmount));
					$(".arDetailList").html("");
					var ctc = '<div class="ardlDiv1">' +
						'<p>' +
						'	<i class="i1"></i> 资产' +
						'</p>' +
						'<p>' +
						'	持有资产' +
						'</p>' +
						'<p>' +
						'	预计收益' +
						'</p>' +
						'</div>' +
						'<div class="ardlDiv2">' +
						'	<p>' +
						'		<i class="i2"></i> 计划标市场' +
						'	</p>' +
						'	<p>' +
						'		' + formatNum(data.model.appointmentBorrowAmount) + '元' +
						'	</p>' +
						'	<p>' +
						'		' + formatNum(data.model.appointmentBorrowProfit) + '元' +
						'	</p>' +
						'</div>' +
						'<div class="ardlDiv2">' +
						'	<p>' +
						'		<i class="i3"></i> 散标' +
						'	</p>' +
						'	<p>' +
						'		' + formatNum(data.model.borrowAmount) + '元' +
						'	</p>' +
						'	<p>' +
						'		' + formatNum(data.model.borrowProfit) + '元' +
						'	</p>' +
						'</div>';
					$(".arDetailList").append(ctc);

					if(parseFloat(data.model.appointmentBorrowAmount) == 0 && parseFloat(data.model.borrowAmount) == 0) {
						$('.forth.circle').circleProgress({
							startAngle: -Math.PI / 4 * 2,
							value: 100,
							size: 110,
							lineCap: 'round',
							fill: {
								color: 'rgba(0, 0, 0, .1)'
							},
							emptyFill: 'rgba(0, 0, 0, .1)',
						});

					} else if(parseFloat(data.model.appointmentBorrowAmount) == 0 && parseFloat(data.model.borrowAmount) != 0) {
						$('.forth.circle').circleProgress({
							startAngle: -Math.PI / 4 * 2,
							value: 100,
							size: 110,
							lineCap: 'round',
							fill: {
								color: '#419FFF'
							},
							emptyFill: '#419FFF',
						});
					} else if(parseFloat(data.model.appointmentBorrowAmount) != 0 && parseFloat(data.model.borrowAmount) == 0) {
						$('.forth.circle').circleProgress({
							startAngle: -Math.PI / 4 * 2,
							value: 100,
							size: 110,
							lineCap: 'round',
							fill: {
								color: '#FFC800'
							},
							emptyFill: '#FFC800',
						});
					} else {
						var val = parseFloat(data.model.appointmentBorrowAmount) / (parseFloat(data.model.borrowAmount) + parseFloat(data.model.appointmentBorrowAmount));
						if(val>0.95){
							val=0.95;
						}else{
							val=val;
						}
						
						$('.forth.circle').circleProgress({
							startAngle: -Math.PI / 4 * 2,
							value: val,
							size: 110,
							lineCap: 'round',
							fill: {
								color: '#FFC800'
							},
							emptyFill: '#419FFF',
						});

					}

				} else {
					layer.msg(data.msg);
				}

			}
		});

	}

	var data = searchUserStatus();
	if(data.code == "success") {
		$('.forth.circle').circleProgress({
			startAngle: -Math.PI / 4 * 2,
			value: 100,
			size: 110,
			lineCap: 'round',
			fill: {
				color: 'rgba(0, 0, 0, .1)'
			},
			emptyFill: 'rgba(0, 0, 0, .1)',
		});
		$(".ACMuserPhoneNumber").html("");
		$(".ACMuserPhoneNumber").html(PhoneNumber(mobile));
		if(data.model.userStatus.openAccountStatus == "1") {
			/*开户状态 1:未开户 3:已开户 4:待激活（汇付开户，已绑卡，未设置交易密码）*/
		} else {
			/*可用卡券*/
			getInitCouponList(1, 1);
			/*账户余额信息*/
			useraccount();

		}

		var bind_mobile_flag = "-c";
		var bind_bank_card_flag;
		if(data.model.userStatus.openAccountFlag == "1") {
			bind_bank_card_flag = "-c";
		} else {
			bind_bank_card_flag = "";
		};
		var sm_mark;
		if(data.model.userStatus.openAccountFlag == "1") {
			sm_mark = "-c";
		} else {
			sm_mark = "";
		};
		$(".ACMuserImgs").html("");
		var imgFlag = '<img src="../../img/assets/sj' + bind_mobile_flag + '.png" />' +
			'<img src="../../img/assets/bk' + bind_bank_card_flag + '.png" />' +
			'<img src="../../img/assets/sm' + sm_mark + '.png" />';
		$(".ACMuserImgs").append(imgFlag);

	} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	}

	$(".btn1").on("click", function() {

		var data = searchUserStatus();
		if(data.code == "success") {
			if(data.model.userStatus.openAccountStatus == "1") {
				$(".openCG").show();
			} else if(data.model.userStatus.openAccountStatus == "4") {
				$(".accountJH").show();
			} else {
				window.location.href = "recharge.html";
			}

		} else {
			window.location.href = loginUrl;
			layer.msg(data.msg);
		}

	});

	$(".btn2").on("click", function() {
		var data = searchUserStatus();
		if(data.code == "success") {
			if(data.model.userStatus.openAccountStatus == "1") {
				$(".openCG").show();
			} else if(data.model.userStatus.openAccountStatus == "4") {
				$(".accountJH").show();
			} else {
				window.location.href = "withdrawal.html";
			}

		} else {
			window.location.href = loginUrl;
			layer.msg(data.msg);
		}
	});
})