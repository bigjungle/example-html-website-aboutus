$(function() {
	$(".cardUseRule").on("click", function() {
		$(".alertBg").show();
	});

	$(".am-close").on("click", function() {
		$(".alertBg").hide();
	});

	$(".headerSelect div").eq(0).addClass("accountDivBtn");

	$(".asLeft p>a").eq(6).css({
		'color': "#ff8000"
	});
	$(".myCardVoucherList0").show();
	var status = "1";
	$('.recordListSelectBtn>span').on("click", function() {
		var index = $('.recordListSelectBtn>span').index($(this));
		$('.recordListSelectBtn>span').removeClass("higLineShort");
		$(this).addClass("higLineShort");
		$('.recordListSelectBtn>span').removeClass("higColor");
		$(this).addClass("higColor");
		switch(index) {
			case 0:
				status = 1;
				getInitCouponList(1, 1);
				setNewPageNum();
				$(".myCardVoucherList0").show();
				$(".myCardVoucherList1").hide();
				$(".myCardVoucherList2").hide();
				break;
			case 1:
				status = 2;
				getInitCouponList(1, 2);
				setNewPageNum();
				$(".myCardVoucherList1").show();
				$(".myCardVoucherList0").hide();
				$(".myCardVoucherList2").hide();
				break;
			case 2:
				status = 3;
				getInitCouponList(1, 3);
				setNewPageNum();
				$(".myCardVoucherList2").show();
				$(".myCardVoucherList1").hide();
				$(".myCardVoucherList0").hide();
				break;
			default:
				break;
		}
	});
	var data = searchUserStatus();
	if(data.code == "success") {
		getInitCouponList(1, 1);
		loadPage();
		setNewPageNum();
	} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	}
	var user_id = sessionStorage.getItem("user_id");
	var totalPageNum;

	function getInitCouponList(pageNum, status) {
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
					$(".myCardVoucherList").html("");
					$(".myBankCardI").html("未使用卡券" + data.model.notUsedCount + "张");
					var info = data.model.couponReceiveList;
					var len = info.length;
					if(len > 0) {
						for(var i = 0; i < len; i++) {
							var sss = info[i].status;
							switch(sss) {
								case 1:
									totalPageNum = Math.ceil(data.model.notUsedCount / 6);
									var Type;
									if(info[i].type == "加息券") {
										Type = '%';
									} else {
										Type = '元';
									}
									var Time;
									if(info[i].type == "提现券") {
										Time = "";
									} else {
										Time = '<p> <i></i>' + info[i].deliveryRangeProduct + '</p>' +
											   '<p> <i></i>' + info[i].startDate + '至' + info[i].endDate + '</p>';
									}
									var ctc0 = '<div class="KQhigCheck am-animation-fade">' +
										'	<p class="cardName">' + info[i].effect + Type + info[i].type + '</p>' +
										'	<div class="cardIntrcation">' +
										'		<p> <i></i> ' + info[i].deliveryRuleDetail + '</p>' +
										Time +
										'	</div>' +
										'</div>';
									$(".myCardVoucherList0").append(ctc0);
									break;
								case 2:
									totalPageNum = Math.ceil(data.model.usedCount / 6);
									var Time;
									if(info[i].type == "提现券") {
										Time = "";
									} else {
										Time = '<p> <i></i>' + info[i].deliveryRangeProduct + '</p>' +
											   '<p> <i></i>' + info[i].startDate + '至' + info[i].endDate + '</p>';
									}
									var Type;
									if(info[i].type == "加息券") {
										Type = '%';
									} else {
										Type = '元';
									}
									var ctc1 = '<div class="KQgray am-animation-fade">' +
										'	<p class="cardName">' + info[i].effect + Type + info[i].type + '<span>已使用</span></p>' +
										'	<div class="cardIntrcation">' +
										'		<p> <i></i> ' + info[i].deliveryRuleDetail + '</p>' +
										Time +
										'	</div>' +
										'</div>';
									$(".myCardVoucherList1").append(ctc1);
									break;
								case 3:
									totalPageNum = Math.ceil(data.model.expiredCount / 6);
									var Time;
									if(info[i].type == "提现券") {
										Time = "";
									} else {
										Time = '<p> <i></i>' + info[i].deliveryRangeProduct + '</p>' +
											   '<p> <i></i>' + info[i].startDate + '至' + info[i].endDate + '</p>';
									}
									var Type;
									if(info[i].type == "加息券") {
										Type = '%';
									} else {
										Type = '元';
									}
									var ctc2 = '<div class="KQgray am-animation-fade">' +
										'	<p class="cardName">' + info[i].effect + Type + info[i].type + '<span>已过期</span></p>' +
										'	<div class="cardIntrcation">' +
										'		<p> <i></i> ' + info[i].deliveryRuleDetail + '</p>' +
										Time +
										'	</div>' +
										'</div>';
									$(".myCardVoucherList2").append(ctc2);
									break;
								default:
									break;
							}

						}
						$(".ListPage").show();
					} else {
						$(".ListPage").hide();
						var zwsj1 = '<p style="width: 6.96rem;" class="zwsj">没有未使用优惠券</p>';
						var zwsj2 = '<p style="width: 6.96rem;" class="zwsj">没有已使用优惠券</p>';
						var zwsj3 = '<p style="width: 6.96rem;" class="zwsj">没有已过期优惠券</p>';
						$(".myCardVoucherList0").append(zwsj1);
						$(".myCardVoucherList1").append(zwsj2);
						$(".myCardVoucherList2").append(zwsj3);
					}

				} else {
					layer.msg(data.msg);
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
					getInitCouponList(page, status);
				}
			});
		}, 800)
	};

	function setNewPageNum() {
		setTimeout(function() {
			$('.pageTest').setLength(totalPageNum);
		}, 1500)
	}
})