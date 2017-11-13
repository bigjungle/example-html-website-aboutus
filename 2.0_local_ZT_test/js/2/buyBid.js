$(function() {
	var user_id = sessionStorage.getItem("user_id");
	var mobile = sessionStorage.getItem("mobile");
	var juid = sessionStorage.getItem("juid");
	var projectType = sessionStorage.getItem("projectType");
	var pagAmount = sessionStorage.getItem("pagAmount");
	var Accountbalance = parseFloat(sessionStorage.getItem("available_amount_"));
	var borrowId = sessionStorage.getItem("borrowId");
	var timeArr = ["", "天", "周", "个月", "年"];
	var Rate;
	var Rate1;
	var profitPlan;
	var periodLength;
	var periodUnit;
	var data = searchUserStatus();
	if(data.code == "success") {

		if(projectType == "2") {
			$(".headerSelect span").eq(2).addClass("higLine");
			DetailBaseSB();
			$(".sbMessage").show();
		} else {
			$(".headerSelect span").eq(1).addClass("higLine");
			DetailBaseJHB();
			getCouponList();
			$(".jhbMessage").show();
			$(".xzkq").show();
			//$(".kqlb").show();
		}

		var pagAmount = sessionStorage.getItem("pagAmount");
		$(".yfje").html(formatNum(pagAmount) + "元");
		$(".yebz").hide();
		available();

	} else {
		layer.msg(data.appmsg);
		window.location.href = returnUrlHL;
	}

	function available() {
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
					if(parseFloat(pagAmount) < parseFloat(data.model.availableAmount)) {
						$(".yebz").hide();
					} else {
						$(".yebz").show();
					}

				}
			}
		});

	}

	function DetailBaseSB() {
		var borrowNo = sessionStorage.getItem("borrowNo");
		$.ajax({
			type: "post",
			url: queryDetails,
			async: true,
			data: {
				borrowNo: borrowNo,
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("标的信息")
				console.log(data);
				if(data.code == "success") {
					var info = data.model;
					//基础信息
					Rate = info.annualizedRate;
					Rate1 = info.annualizedRate;
					profitPlan = info.profitPlan;
					periodLength = info.periodLength;
					periodUnit = info.periodUnit;
					var pagAmount = sessionStorage.getItem("pagAmount");
					var ctc = '<div class="bsDiv" style="margin-top: 0.2rem;">' +
						'	<span>计划名称</span>' +
						'	<span>' + info.borrowName + '</span>' +
						'</div>' +
						'<div class="bsDiv">' +
						'	<span>历史年化收益率</span>' +
						'	<span>' + info.annualizedRate + '%</span>' +
						'</div>' +
						'<div class="bsDiv">' +
						'	<span>出借截止期</span>' +
						'	<span>' + info.endDate.split(" ")[0]  + '</span>' +
						'</div>' +
						'<div class="bsDiv">' +
						'	<span>出借期限</span>' +
						'	<span>' + info.periodLength + timeArr[info.periodUnit] + '</span>' +
						'</div>' +
						'<div class="bsDiv">' +
						'	<span>加入金额</span>' +
						'	<span style="color: #000000;">' + pagAmount + '元</span>' +
						'</div>';

					$(".sbMessage").append(ctc);
					earning();

				} else {

					layer.msg(data.msg);
				}

			}
		});
	}

	function DetailBaseJHB() {

		var borrowNo = sessionStorage.getItem("borrowNo");
		$.ajax({
			type: "post",
			url: queryDetails,
			async: true,
			data: {
				borrowNo: borrowNo
			},
			success: function(data) {
				data = jsonchange(data);
				//console.log(data);
				if(data.code == "success") {
					var info = data.model;

					//基础信息
					var period_length_;
					if(info.period_length_ == 104) {
						period_length_ = "52+52";
					} else {
						period_length_ = info.period_length_;
					}
					profitPlan = info.profitPlan;
					periodLength = info.periodLength;
					periodUnit = info.periodUnit;
					var rate;
					var rateType = sessionStorage.getItem("rateType");
					if(rateType == 1) {
						rate = '' + (info.annualizedRate + info.appendRate).toFixed(2) + '';
						Rate = info.annualizedRate + info.appendRate;
						Rate1 = info.annualizedRate + info.appendRate;
					} else {
						rate = '' + info.annualizedRate.toFixed(2) + '';
						Rate = info.annualizedRate;
						Rate1 = info.annualizedRate;
					}
					sessionStorage.setItem("bidName", info.borrowName);
					var pagAmount = sessionStorage.getItem("pagAmount");
					var ctc = '<div class="bsDiv" style="margin-top: 0.2rem;">' +
						'	<span>计划名称</span>' +
						'	<span>' + info.borrowName + '</span>' +
						'</div>' +
						'<div class="bsDiv">' +
						'	<span>历史年化收益率</span>' +
						'	<span>' + rate + '%</span>' +
						'</div>' +
						'<div class="bsDiv">' +
						'	<span>退出日期</span>' +
						'	<span>' + info.endDate.split(" ")[0]  + '</span>' +
						'</div>' +
						'<div class="bsDiv">' +
						'	<span>出借期限</span>' +
						'	<span>' + info.periodLength + timeArr[info.periodUnit] + '</span>' +
						'</div>' +
						'<div class="bsDiv">' +
						'	<span>加入金额</span>' +
						'	<span style="color: #000000;">' + pagAmount + '元</span>' +
						'</div>';

					$(".jhbMessage").append(ctc);
					earning();

				} else {
					layer.msg(data.msg);
				}
			}
		});

	}

	/*卡券*/
	function getCouponList() {
		var productNo = sessionStorage.getItem("productNo");
		var periodUnit = sessionStorage.getItem("periodUnit");
		var periodLength = sessionStorage.getItem("periodLength");
		var mobile = sessionStorage.getItem("mobile");
		$.ajax({
			type: "post",
			url: investCouponUrl,
			async: false,
			data: {
				phoneNum: mobile,
				client: client,
				platform: platform,
				page: "1",
				limit: "100",
				investAmount: pagAmount,
				periodLength: periodLength,
				periodUnit: periodUnit,
				type: "",
				productNo: productNo

			},
			success: function(data) {
				data = jsonchange(data);
				console.log("卡券");
				console.log(data);
				if(data.code == "success") {
					$(".myCardVoucherList").html("");
					var info = data.model.dataList;
					var len = info.length;
					if(len > 0) {
						for(var i = 0; i < len; i++) {
							if(info[i].type != "3") {
								var type = info[i].coupon_type; //1.加息券 2.返现券 3.提现券
								var className;
								if(info[i].canUse == "1") {
									className = "";
								} else {
									className = "KQgray";
								}
								var timeArr = info[i].startDate.split(" ")[0].split("-");
								var Time;
								var timeArr1 = info[i].endDate.split(" ")[0].split("-");
								Time = '<p> <i></i>' + timeArr[0] + '年' + timeArr[1] + '月' + timeArr[2] + '日-' + timeArr1[0] + '年' + timeArr1[1] + '月' + timeArr1[2] + '日</p>';
								var Type;
								if(info[i].type == "1") {
									Type = '%';
								} else {
									Type = '元';
								}
								var coupArr = ["", "加息券", "返现券", "提现券"];
								var ctc = '<div class="KQhig am-animation-fade ' + className + '">' +
									'	<p class="cardName">' + info[i].effect + Type + coupArr[info[i].type] + '</p>' +
									'	<div class="cardIntrcation">' +
									'		<p> <i></i> ' + info[i].deliveryRuleDetail + '</p>' +
									'		<p> <i></i>' + info[i].deliveryRangeProduct + '</p>' +
									Time +
									'	</div>' +
									'	<input type="radio" name="myCardVoucher" id="myCardVoucher" value="' + info[i].receiveId + '" />' +
									'	<i class="thisType" style="display: none;">' + info[i].type + '</i>' +
									'	<i class="thiseffect" style="display: none;">' + info[i].effect + '</i>' +
									'</div>';
								$(".myCardVoucherList").append(ctc);
							}

						}
					} else {
						var zwcp = '<p style="width: 6.96rem;" class="zwsj">暂无符合条件的优惠券</p>';
						$(".myCardVoucherList").append(zwcp);

						$(".zwsj").on("click", function() {
							$(".myCardVoucherList").slideUp(300);
						});
					}
				} else {
					var zwcp = '<p style="width: 6.96rem;" class="zwsj">暂无符合条件的优惠券</p>';
					$(".myCardVoucherList").append(zwcp);
					$(".zwsj").on("click", function() {
						$(".myCardVoucherList").slideUp(300);
					});
				}
			}
		});
	}

	var owner_id = "";
	var ThisType = "";
	var effect = 0;
	$(".myCardVoucherList .KQhig").on("click", function() {
		var ThisType = $(this).find(".thisType").html();
		var effect = parseFloat($(this).find(".thiseffect").html());
		//已选择
		if($(this).hasClass("KQhigCheck")) {
			$(this).removeClass("KQhigCheck");
			$(this).find("input").attr("data-am-ucheck");
			owner_id = "";
			console.log(owner_id);
			$(".bankInput").val("");
			Rate = Rate1
			earning();
		} else {
			//未选择
			$(".KQhig").removeClass("KQhigCheck");
			$(this).addClass("KQhigCheck");
			owner_id = $(this).find("input").val();
			console.log(owner_id);
			$(".bankInput").val($(this).find(".cardName").html());
			$(".myCardVoucherList").slideUp(300);
			if(ThisType == 1) {
				Rate = Rate1 + effect;
				earning();
			} else {
				Rate = Rate1;
				earning();
			}

		}

	});

	$(".bankIputKeyBtn").on("click", function() {
		$(".myCardVoucherList").slideDown(300);
	});

	/*收益计算*/
	var expectedRevenue;

	function earning() {
		var payAmount = sessionStorage.getItem("pagAmount");
		$.ajax({
			type: "post",
			url: ExpectedRevenueUrl,
			async: true,
			data: {
				amount: payAmount,
				rate: Rate,
				periodLength: periodLength,
				periodUnit: periodUnit,
				profitPlan: profitPlan
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("计算收益");
				console.log(data.model);
				expectedRevenue = data.model;
				$(".yjsy").html(data.model + "元");
			}
		});
	}

	function buyBid() {
		var payAmount = sessionStorage.getItem("pagAmount");
		var borrowNo = sessionStorage.getItem("borrowNo");
		var data;
		if(owner_id == "") {
			data = {
				borrowNo: borrowNo,
				payAmount: payAmount,
				expectedRevenue: expectedRevenue,
				retUrl: returnUrl + "html/3/bidRecordSB.html",
				platform: platform,
				client: client,
				phoneNum: mobile,
			};
		} else {
			data = {
				borrowNo: borrowNo,
				payAmount: payAmount,
				expectedRevenue: expectedRevenue,
				retUrl: returnUrl + "html/3/bidRecordSB.html",
				platform: platform,
				client: client,
				phoneNum: mobile,
				receiveCouponNo: owner_id
			};
		}
		$.ajax({
			type: "post",
			url: buyBidUrl,
			async: true,
			data: data,
			success: function(data) {
				data = jsonchange(data);
				console.log("购买");
				console.log(data);
				if(data.code == "success") {
					var projectType = sessionStorage.getItem("projectType");
					if(projectType == "3") {
						/*计划标*/
						window.location.href = "buyResults.html?buyType=1";

					} else {
						/*散标*/
						$('#subForm').attr('action', data.model.ServiceUrl);
						var msgParamDto = data.model.InMap;
						$(".linkToBank").show();
						$.each(msgParamDto, function(key, value) {
							if(key == "BorrowerDetails") {
								var ctc = '<textarea rows="1" cols="500" style="display: none" name="BorrowerDetails">' + value + '</textarea>'
							} else {
								var ctc = '  <input type="hidden" name="' + key + '"  class="hidden"   value="' + value + '" /> ';
							}
							$("#subForm").append(ctc);
						});
						setTimeout(function() {
							$("#subForm").submit();
						}, 1500);

					}
				} else {
					$(".buyWrongTips").html(data.msg);
					$(".bsDiv1").button('reset');
				}
			}
		});
	}

	$(".bsDiv1").on("click", function() {

		$(".TipsM").html("");

		var $btn = $(this)
		$btn.button('loading');
		buyBid();
		//		

	});
})