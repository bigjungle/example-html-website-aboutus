$(function() {
	var loginStatus = sessionStorage.getItem("loginStatus");
	var user_id = sessionStorage.getItem("user_id");
	var mobile = sessionStorage.getItem("mobile");
	var juid = sessionStorage.getItem("juid");
	var id = sessionStorage.getItem("id");
	var projectType = sessionStorage.getItem("projectType");
	var UsrCustId = "";
	var sendMobile = "";
	var account_platform_no = "";
	var Accountbalance = 0;
	var maxInvestMoney;
	var min_invest_amount;
	var invest_ascending_amount;
	var product_name = sessionStorage.getItem("product_name");
	var earnRate;
	var timeType;
	var termTime;
	var amountWait;
	var TimeScale;
	$(".headerSelect span").eq(1).addClass("higLine");
	$(".productDetail0").show();

	$('.bidDetialTitle>span').on("click", function() {
		$(".tiltle").html("");
		var index = $('.bidDetialTitle>span').index($(this));
		$('.bidDetialTitle>span').removeClass("higLine");
		$(this).addClass("higLine");
		switch(index) {
			case 0:
				$(".productDetail0").show();
				$(".productDetail1").hide();
				break;
			case 1:
				$(".productDetail1").show();
				$(".productDetail0").hide();
				break;
			default:
				break;
		}
	});

	function regDealToggle(deal, btn) {
		deal.on("click", function() {
			btn.toggleClass("disabled");
			if(btn.hasClass("disabled")) {
				deal.attr("checked", false);
			} else {
				deal.attr("checked", true);
			}
		})
	};
	regDealToggle($(".checkInput"), $(".bmrP4"));
	if(loginStatus == "1") {
		$(".bmrP11").hide();
		$(".bmrP12").show();
	} else {
		$(".bmrP12").hide();
		$(".bmrP11").show();
	};
	DetailBase();

	function DetailBase() {
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
				console.log("散标详情");
				console.log(data);

				if(data.code == "success") {
					var timeArr = ["", "天", "周", "个月", "年"];
					var info = data.model;
					sessionStorage.setItem("productNo", info.productNo);
					$(".secondTitle").html(info.borrowName);
					TimeScale = info.period_ * 7 / 365 * info.apr_;
					maxInvestMoney = info.investMaxAmount;

					var invest_amount_total_;
					var per;
					min_invest_amount = info.investMinAmount;
					invest_ascending_amount = info.investAscendingAmount;
					$(".DIInput").attr("placeholder", "请输入购买金额");
					if((parseFloat(info.contractAmount) - info.amountWait) == 0) {
						invest_amount_total_ = 0;
						var per = 0;
					} else {
						var per = ((parseFloat(info.contractAmount) - info.amountWait) / (parseFloat(info.contractAmount)) * 100).toFixed(2);
					}

					if(per < 1 && per > 0) {
						per = 1;
					} else if(per > 99 && per < 100) {
						per = 99;
					} else if(per = 0) {
						per = 0;
					} else {
						per = ((parseFloat(info.contractAmount) - info.amountWait) / (parseFloat(info.contractAmount)) * 100).toFixed(2);
					}

					var periodLength;
					if(info.periodLength == 104) {
						periodLength = "52+52";
					} else {
						periodLength = info.periodLength;
					}
					var rateType = sessionStorage.getItem("rateType");
					var rate;
					if(rateType == 1) {
						if(info.appendRate == "0") {
							rate = '<span>' + info.annualizedRate.toFixed(2) + '<i>%</i></span>';
						} else {
							rate = '<span>' + (info.annualizedRate).toFixed(2) + '%<i>+' + (info.appendRate).toFixed(2) + '%</i></span>';
						}

					} else {
						rate = '<span>' + info.annualizedRate.toFixed(2) + '<i>%</i></span>';
					}

					amountWait = info.amountWait;

					/*标题*/
					var title = '<span> ' + sessionStorage.getItem("bidNam") + info.borrowName + '</span><span>短期项目 资金灵活</span>';
					$(".planBidTiltle1").append(title);

					/*账户余额*/
					if(loginStatus == "1") {
						var Accountbalan = '账户余额<i >正在加载中</i>元<i class="rechareBtn">充值</i>';
						$(".bmrP12").append(Accountbalan);
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
									$(".bmrP12").html("");
									var Accountbalan = '账户余额<i >' + formatNum(data.model.availableAmount) + '</i>元<i class="rechareBtn">充值</i>';
									$(".bmrP12").append(Accountbalan);
									Accountbalance = data.model.availableAmount;
									$(".rechareBtn").on("click", function() {
										var data = searchUserStatus();
										if(data.code == "success") {
											if(data.model.userStatus.openAccountStatus == "1") {
												//									layer.msg("请先开通存管账户");
												$(".openCG").show();
											} else if(data.model.userStatus.openAccountStatus == "4") {
												//激活
												//									layer.msg("请先完成存管账户激活");
												$(".accountJH").show();

											} else {
												//									layer.msg("请先完成存管账户激活");
												window.location.href = "../../html/3/recharge.html";
											}

										} else {
											window.location.href = returnUrlHL;
											layer.msg(data.msg);
										}

									});
								} else {
									//									layer.msg(data.msg);
									loginStatus = "0";
									sessionStorage.setItem("loginStatus", "0");
									$(".bmrP12").hide();
									$(".bmrP11").show();
								}
							}
						});

					}
					/*加入限制*/
					var joinlimit = '<span>加入上限：' + formatNum(info.investMaxAmount) + '元</span><span> 剩余金额：' + formatNum(info.amountWait) + '元 </span>';
					$(".addAmount").html(formatNum(parseFloat(info.contractAmount) - info.amountWait));
					$(".bmrP3").append(joinlimit);
					/*散标详情*/
					if(window.location.search == "") {
						var tiltle = '您所在的位置：<span>首页</span>> <span>计划标</span>> <span><span>' + sessionStorage.getItem("bidNam") + '</span>> <span>' + info.borrowName + '</span>';
					} else {
						var tiltle = '您所在的位置：<span>首页</span>> <span>计划标</span>> <span>><span>' + info.borrowName + '</span>';
					}

					$(".tiltle").append(tiltle);
					sessionStorage.setItem("periodUnit", info.periodUnit);
					sessionStorage.setItem("periodLength", info.periodLength);
					var bidTopLeft = '<div class="bidMesageLeft">' +
						'<p class="bmlP1">' +
						rate +
						'	<span>' + periodLength + '<i>' + timeArr[info.periodUnit] + '</i></span>' +
						'	<span>' + formatNum(info.contractAmount) + '<i>元</i> </span>' +
						'</p>' +
						'<p class="bmlP2">' +
						'	<span>历史年化收益</span>' +
						'	<span>出借期限</span>' +
						'	<span>计划金额</span>' +
						'</p>' +
						'<div class="bmlP3">' +
						'	<p>投资进度</p>' +
						'	<p>' +
						'		<span class="detialHigProgress"></span>' +
						'		<span class="detialLowProgress"></span>' +
						'	</p>' +
						'	<p class="per">' + per + '%</p>' +
						'</div>' +
						'<p class="bmlP4">' +
						'	<span>退出日期：' + info.endDate.split(" ")[0] + '</span>' +
						'	<span>温馨提示 ：出借有风险，选择需谨慎。</span>' +
						'</p>' +
						'</div>	';
					$(".biddetailTopLeft").append(bidTopLeft);
					ProgessAnimate("per", "detialHigProgress", 3.4);
					if(info.status <= 4) {
						$(".bidMesageRight1").show();
						$(".bidMesageRight2").hide();
					} else {
						$(".bidMesageRight1").hide();
						$(".bidMesageRight2").show();
					};
					/*基础详情*/
					var rate1;
					if(rateType == 1) {
						if(info.appendRate == "0") {
							rate1 = '<span>' + info.annualizedRate.toFixed(2) + '<i></i></span>';
						} else {
							rate1 = '<span>' + (info.annualizedRate).toFixed(2) + '%<i>+' + (info.appendRate).toFixed(2) + '</i></span>';
						}
					} else {
						rate1 = '' + info.annualizedRate.toFixed(2) + '';
					}
					sessionStorage.setItem("bidName", info.borrowName);
					var detail = '<div class="pdDiv">' +
						'	<p>项目名称</p>' +
						'	<p>' + info.borrowName + '</p>' +
						'</div>' +
						'<div class="pdDiv">' +
						'	<p>出借范围</p>' +
						'	<p>加入' + info.borrowName + '的资金仅出借本平台资产安全保障系统严格审核并提供多重权益保障措施的优质借款项目</p>' +
						'</div>' +
						'<div class="pdDiv">' +
						'	<p>历史平均年化收益</p>' +
						'	<p>' + rate1 + '%</p>' +
						'</div>' +
						'<div class="pdDiv">' +
						'	<p>出借期限</p>' +
						'	<p>' + info.periodLength + timeArr[info.periodUnit] + '</p>' +
						'</div>' +
						'<div class="pdDiv">' +
						'	<p>退出日期</p>' +
						'	<p>' + info.endDate.split(" ")[0] + '</p>' +
						'</div>' +
						'<div class="pdDiv">' +
						'	<p>加入方式</p>' +
						'	<p>加入金额' + formatNum(info.investMinAmount) + '元起，且以' + formatNum(info.investAscendingAmount) + '元的位数递增</p>' +
						'</div>' +
						'<div class="pdDiv">' +
						'	<p>开始日期</p>' +
						'	<p>' + (info.startDate) + '</p>' +
						'</div>' +
						'<div class="pdDiv">' +
						'	<p>单笔额度上限</p>' +
						'	<p>' + formatNum(info.investMaxAmount) + '元</p>' +
						'</div>' +
						'<div class="pdDiv">' +
						'	<p>到期赎回方式</p>' +
						'	<p>出借期限届满时，' + info.borrowName + '将您所持有的出借项目自动发起转让，赎回时间以转让实际完成时间为准</p>' +
						'</div>' +
						'<div class="pdDiv2">' +
						'	<p>费用</p>' +
						'	<div class="">' +
						'		<p>加入费用 ：0.0%</p>' +
						'		<p>退出费用：0.0%</p>' +
						'		<p>提前赎回费率：加入金额的' + info.redeemFeeRate.toFixed(1) + '%，参见<a href="bidplancontract.html">《出借协议》</a></p>' +
						'	</div>' +
						'</div>' +
						'<div class="pdDiv">' +
						'	<p>相关协议</p>' +
						'	<p>参考<a href="bidplancontract.html">《出借协议》</a></p>' +
						'</div>' +
						'<p class="PDtips">*本网站作为信息发布平台，未以任何明示或暗示的方式对出借人提供任何担保或承诺保本保息。本网站提供的各种信息及资料仅供参考，出借人应根据其自身出借偏好及风险承受能力独立判断并作出决策。出借人据此进行交易的，产生的责任与风险由出借人自行承担，本网站不承担任何责任。 *出借有风险，任何保障措施均有其局限性：（1）合作机构有可能因各种原因丧失还款意愿或因财务状况严重恶化等原因丧失还款能力；（2）风险准备金的提取比例是有限的，其余额可能低于逾期项目金额进而导致无法足额代偿；（3）战争、自然灾害、骚乱、罢工、政策变更等不可抗力亦可能严重影响资金安全。' +
						'</p>';
					$(".productDetail").append(detail);

				} else {
					layer.msg(data.msg);
				}
			}
		});
	}

	var totalPageNum;
	/*计划标出借记录*/
	function InvestmentRecord(num) {
		var zwsj = '<p style="width:9.6rem;" class="zwsj">正在加载中...</p>';
		$(".recordListBid").append(zwsj);
		var borrowNo = sessionStorage.getItem("borrowNo");
		var num = num;
		$.ajax({
			type: "post",
			url: queryInvestListUrl,
			async: true,
			data: {
				/*"VJR-1000000029068377"*/
				borrowNo: borrowNo,
				pageIndex: num,
				platform: platform
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("散标出借记录");
				console.log(data);
				if(data.code == "success") {
					$(".recordListBid").html("");
					var info = data.model.list;
					totalPageNum = Math.ceil(data.model.allCount / 10);
					$(".peopleNum").html(data.model.allCount);

					//console.log(totalPageNum1);
					var len = info.length;
					if(len > 0) {
						for(var i = 0; i < len; i++) {
							if(info[i].client == "1") {
								formImg = '<img src="../../img/assets/pc.png"/>';

							} else {
								formImg = '<img src="../../img/assets/mobile.png"/>';
							}
							var ctc = '<div class="bdtDiv">' +
								'	<span>' + ((num - 1) * 10 + i + 1) + '</span>' +
								'	<span>' + NameHidden(info[i].realname) + '</span>' +
								'	<span>' + formatNum(info[i].investAmount) + '</span>' +
								'	<span>' + formImg + '</span>' +
								'	<span>' + info[i].orderDate + '</span>' +
								'</div>';
							$(".recordListBid").append(ctc);
							$(".ListPage").show();
						}
					} else {
						var zwsj = '<p style="width:9.6rem;" class="zwsj">暂无出借记录</p>';
						$(".recordListBid").append(zwsj);
						$(".ListPage").hide();
					}
				} else {
					layer.msg(data.msg);
				}
			}
		});
	};

	InvestmentRecord(1);
	loadPage();

	function loadPage() {
		setTimeout(function() {
			$('.pageTest').page({
				leng: totalPageNum, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					//					console.log(page);
					InvestmentRecord(page);
				}
			});
		}, 2000)
	};

	function purchase() {
		var arr = [];
		//inputBlur(); //所有输入框光标移除
		var PInputAmount = $(".DIInput").val();
		//			var invitateNumber = $(".PinviteInput").val().replace(/\s/g, "");
		//购买金额为空判断
		var checkNull = inputIsNull(PInputAmount);
		if(checkNull != "200") {
			$(".bidwrongTips").html("购买金额不能为空");
			return arr;
		};
		//最小金额
		//		alert(min_invest_amount)
		var checkFlag = checkmaxMoney(PInputAmount, min_invest_amount);
		if(checkFlag != "200") {
			$(".bidwrongTips").html("购买金额不能小于最低金额");
			return arr;
		};
		//购买金额规则判断
		var checkFlag = checkInputAmount(PInputAmount, invest_ascending_amount);
		if(checkFlag != "200") {
			$(".bidwrongTips").html("购买金额应为" + invest_ascending_amount + "的整数倍");
			return arr;
		};
		//单笔上线
		var checkFlag = checkmaxMoney(maxInvestMoney, PInputAmount);
		if(checkFlag != "200") {
			$(".bidwrongTips").html("购买金额大于单笔上限");
			return arr;
		};

		//最大购买金额判断
		//		alert(amountWait);
		var checkFlag = checkmaxMoney(amountWait, PInputAmount);
		if(checkFlag != "200") {
			$(".bidwrongTips").html("购买金额大于可投额度");
			return arr;
		};
		//剩余额度
		var checkFlag = checkmaxMoney(parseFloat(Accountbalance), PInputAmount);
		if(checkFlag != "200") {
			$(".bidwrongTips").html("账户余额不足");
			return arr;
		};
		arr[0] = PInputAmount;
		//			arr[1] = invitateNumber;

		return arr;
	}

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
		//checkSign();
		checkSign();
	});

	$(".DIjoin").on("click", function() {
		$(".bidwrongTips").html("");
		var data = searchUserStatus();
		if(data.code == "success") {
			if(data.model.userStatus.openAccountStatus == "1") {
				//				layer.msg("请先开通存管账户");
				$(".openCG").show();
			} else if(data.model.userStatus.openAccountStatus == "4") {

				//激活
				//						layer.msg("请先完成存管账户激活");
				$(".accountJH").show();

			} else {
				var tender_plan_mark_ = sessionStorage.getItem("tender_plan_mark_");
				if(tender_plan_mark_ == 0) {
					//							layer.msg("请先开通自动投标授权");
					$(".openTB").show();
				} else {
					if(purchase() != "") {
						var pagAmount = parseFloat($(".DIInput").val());
						window.location.href = "bugBid.html";
						sessionStorage.setItem("pagAmount", pagAmount);
						sessionStorage.setItem("pagAmount", parseFloat($(".DIInput").val()));
					}
				}
			}

		} else {
			window.location.href = returnUrlHL;
			layer.msg(data.msg);
		}

	});

})