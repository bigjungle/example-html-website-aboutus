$(function() {
	$(".headerSelect div").eq(0).addClass("accountDivBtn");
	$(".asLeft p>a").eq(1).css({
		'color': "#ff8000"
	});
	var mobile = sessionStorage.getItem("mobile");
	//		$('.pageTest').page({
	//			leng: 5, //分页总数
	//			activeClass: 'activP', //active 类样式定义
	//			clickBack: function(page) {
	//				console.log(page);
	//			}
	//		});

	var Type = 1;
	$('.recordListSelectBtn>span').on("click", function() {
		var index = $('.recordListSelectBtn>span').index($(this));
		$('.recordListSelectBtn>span').removeClass("higLineShort");
		$(this).addClass("higLineShort");
		switch(index) {
			case 0:
				Type = 1;
				ManagementList(1, 1);
				setNewPageNum();
				$(".buyPlanBid0").show();
				$(".buyPlanBid1").hide();
				$(".buyPlanBid2").hide();
				break;
			case 1:
				Type = 2;
				ManagementList(1, 2);
				setNewPageNum();
				$(".buyPlanBid0").hide();
				$(".buyPlanBid1").show();
				$(".buyPlanBid2").hide();
				break;
			case 2:
				Type = 3;
				ManagementList(1, 3);
				setNewPageNum();
				$(".buyPlanBid0").hide();
				$(".buyPlanBid1").hide();
				$(".buyPlanBid2").show();
				break;
			default:
				break;
		};
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
	$(".tender_plan_mark").on("click", function() {
		checkSign();
	});
	$(".asButton").on("click", function() {
		var data = searchUserStatus();
		if(data.code == "success") {

			if(data.model.userStatus.openAccountStatus == "1") {
				$(".openCG").show();
			} else if(data.model.userStatus.openAccountStatus == "4") {
				$(".accountJH").show();
			} else {
				if(data.model.userStatus.setAutoBuyBidFlag == 0) {
					$(".openTB").show();
				} else {
					$(".asButton").addClass("disabled");
					$(".asButtonSpan").css({
						left: "0.3rem",
					});
					$(".asButtonSpan1").css({
						width: "100%"
					});
				}

			}

		} else {
			window.location.href = loginUrl;
			layer.msg(data.msg);
		}
	});

	//预约标
	var data = searchUserStatus();
	if(data.code == "success") {
		$(".buyPlanBid0").show();
		ManagementList(1, 1);
		loadPage();
		setNewPageNum();
		if(data.model.userStatus.openAccountStatus == "3") {
			if(data.model.userStatus.setAutoBuyBidFlag == 0) {

			} else {
				$(".asButton").addClass("disabled");
				$(".asButtonSpan").css({
					left: "0.3rem",
				});
				$(".asButtonSpan1").css({
					width: "100%"
				});
			}

		}
		$(".cjje").html("正在加载...");
		$(".yqsy").html("正在加载...");
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
				console.log("账户中心余额");
				console.log(data);
				if(data.code == "success") {
					$(".cjje").html(formatNum(data.model.appointmentBorrowAmount));
					$(".yqsy").html(formatNum(data.model.appointmentBorrowProfit));
				}
			}
		});

	} else {
		window.location.href = loginUrl;
		layer.msg(data.appmsg);
	}

	var totalPageNum;

	function ManagementList(num, type) {
		var num = num;
		var type = type;
		$.ajax({
			type: "post",
			url: productManageUrl,
			async: true,
			data: {
				phoneNum: mobile,
				platform: platform,
				client: client,
				borrowType: "2",
				type: type,
				pageIndex: num
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("预约标购买列表");
				console.log(data);

				if(data.code == "success") {
					var info = data.model.dataList;
					var len = info.length;
					totalPageNum = Math.ceil(data.model.total / 10);

					switch(type) {
						case 1:
							$(".planBid0").html("");
							if(len > 0) {
								for(var i = 0; i < len; i++) {
									//							var remain_days_;
									//							if(info[i].remain_days_ <= 0) {
									//								remain_days_ = 0;
									//							} else {
									//								remain_days_ = info[i].remain_days_;
									//							}
									var profitPlanArr = ["", "等额本息", "等额本金", "按期付息", "到期还本", "一次性还款"];
									var ctc = '<p class="rlspan2">' +
										'	<span>' + info[i].borrowName + '</span>' +
										'	<span>' + info[i].annualizedRate + '%</span>' +
										'	<span style="color:#ff8000">' + formatNum(info[i].investAmount) + '</span>' +
										'	<span>' + info[i].investDate + '</span>' +
										'	<span>' + profitPlanArr[info[i].profitPlan] + '</span>' +
										'	<span /*onclick="linkNextHtml(\'' + info[i].cashNo + '\',\'' + info[i].orderNo + '\')" style="color: #0F376E;"*/>合同生成中</span>' +
										'</p>';
									$(".planBid0").append(ctc);
									$(".ListPage").show();
								};
							} else {
								var zwsj = '<p class="zwsj">暂无数据</p>';
								$(".planBid0").append(zwsj);
								$(".ListPage").hide();
							}
							break;
						case 2:
							$(".planBid1").html("");
							if(len > 0) {
								for(var i = 0; i < len; i++) {
									//							var remain_days_;
									//							if(info[i].remain_days_ <= 0) {
									//								remain_days_ = 0;
									//							} else {
									//								remain_days_ = info[i].remain_days_;
									//							}
									var profitPlanArr = ["", "等额本息", "等额本金", "按期付息", "到期还本", "一次性还款"];
									var ctc = '<p class="rlspan2">' +
										'	<span>' + info[i].borrowName + '</span>' +
										'	<span>' + info[i].annualizedRate + '%</span>' +
										'	<span style="color:#ff8000">' + formatNum(info[i].repayTotal) + '</span>' +
										'	<span>' + formatNum(info[i].profitActual) + '</span>' +
										'	<span>' + info[i].endDate + '</span>' +
										'	<span onclick="linkNextHtml(\'' + info[i].cashNo + '\',\'' + info[i].orderNo + '\')" style="color: #0F376E;">调阅</span>' +
										'</p>';
									$(".planBid1").append(ctc);
									$(".ListPage").show();
								};
							} else {
								var zwsj = '<p class="zwsj">暂无数据</p>';
								$(".planBid1").append(zwsj);
								$(".ListPage").hide();
							}
							break;
						case 3:
							$(".planBid2").html("");
							if(len > 0) {
								for(var i = 0; i < len; i++) {
									//							var remain_days_;
									//							if(info[i].remain_days_ <= 0) {
									//								remain_days_ = 0;
									//							} else {
									//								remain_days_ = info[i].remain_days_;
									//							}
									var profitPlanArr = ["", "等额本息", "等额本金", "按期付息", "到期还本", "一次性还款"];
									var ctc = '<p class="rlspan2">' +
										'	<span>' + info[i].borrowName + '</span>' +
										'	<span>' + info[i].annualizedRate + '%</span>' +
										'	<span style="color:#ff8000">' + formatNum(info[i].repayTotal) + '</span>' +
										'	<span>' + formatNum(info[i].profitActual) + '</span>' +
										'	<span onclick="linkNextHtml(\'' + info[i].cashNo + '\',\'' + info[i].orderNo + '\')" style="color: #0F376E;">调阅</span>' +
										'</p>';
									$(".planBid2").append(ctc);
									$(".ListPage").show();
								};
							} else {
								var zwsj = '<p class="zwsj">暂无数据</p>';
								$(".planBid2").append(zwsj);
								$(".ListPage").hide();
							}
							break;
						default:
							break;
					};

				} else if(data.code == "user_not_login") {
					window.location.href = loginUrl;
				} else {
					layer.msg(data.msg)
				}
			}
		});
	}

	function loadPage() {
		setTimeout(function() {
			$(".pageTest").html("");
			//console.log(totalPageNum);
			$('.pageTest').page({
				leng: totalPageNum, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					//console.log(page);
					ManagementList(page, Type);
				}
			});
		}, 1000)
	};

	function setNewPageNum() {
		setTimeout(function() {
			$('.pageTest').setLength(totalPageNum);
		}, 1500)
	}

})

function linkNextHtml(cashNo, orderNo) {
	var cashNo = cashNo;
	var orderNo = orderNo;
	//console.log(fund_id_);
	sessionStorage.setItem("cashNo", cashNo);
	sessionStorage.setItem("JHBorderNo", orderNo);
	window.location.href = "lend.html";
}