$(function() {
	$(".headerSelect span").eq(1).addClass("higLine");
	$(".bd0").show();

	$('.bidDetialTitle>span').on("click", function() {
		$(".tiltle").html("");
		var index = $('.bidDetialTitle>span').index($(this));
		$('.bidDetialTitle>span').removeClass("higLine");
		$(this).addClass("higLine");
		switch(index) {
			case 0:
				$(".bd0").show();
				$(".bd1").hide();
				$(".bd2").hide();
				break;
			case 1:
				$(".bd1").show();
				$(".bd0").hide();
				$(".bd2").hide();
				$(".recordListBid").html("");
				InvestmentRecord(1);
				loadPage();
				break;
			case 2:
				$(".bd2").show();
				$(".bd0").hide();
				$(".bd1").hide();
				//				detailReturnPlan(0, 10);
				loadPage1();
				break;
			default:
				break;
		}
	});

	var loginStatus = sessionStorage.getItem("loginStatus");
	var user_id = sessionStorage.getItem("user_id");
	var mobile = sessionStorage.getItem("mobile");
	var projectType = sessionStorage.getItem("projectType");
	var Accountbalance = 0;
	var maxInvestMoney;
	var min_invest_amount;
	var product_name = sessionStorage.getItem("product_name");
	var earnRate;
	var timeType;
	var termTime;
	var amountWait;
	var TimeScale;

	if(loginStatus == "1") {
		$(".bmrP11").hide();
		$(".bmrP12").show();
	} else {
		$(".bmrP12").hide();
		$(".bmrP11").show();
	};

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

	DetailBase();
	/*散标信息查询*/
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
					$(".secondTitle").html(info.borrowName);
					TimeScale = info.period_ * 7 / 365 * info.apr_;
					maxInvestMoney = info.investMaxAmount;

					var invest_amount_total_;
					var per;
					min_invest_amount = info.investMinAmount;
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

					amountWait = info.amountWait;
					$(".tiltle").html("您所在的位置：<span>首页</span>> <span>散标</span>> <span>" + info.borrowName + "</span>");
					/*标题*/
					var title = '<span> ' + info.borrowName + '</span><span>短期项目 资金灵活</span>';
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
					var profitPlanArr = ["", "等额本息", "等额本金", "按期付息", "到期还本", "一次性还款"];
					var bidTopLeft = '<div class="bidMesageLeft">' +
						'<p class="bmlP1">' +
						'	<span>' + info.annualizedRate.toFixed(2) + '<i>%</i></span>' +
						'	<span>' + info.periodLength + '<i>' + timeArr[info.periodUnit] + '</i></span>' +
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
						'	<span>还款方式：' + profitPlanArr[info.profitPlan] + '</span>' +
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
				} else {
					layer.msg(data.msg);
				}
			}
		});
	}

	/*散标产品详情*/
	productDetail();
	InvestmentRecord(1);
	function productDetail() {
		var borrowNo = sessionStorage.getItem("borrowNo");
		$.ajax({
			type: "post",
			url: queryBidTabUrl,
			async: true,
			data: {
				borrowNo: borrowNo
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("散标借款人信息");
				console.log(data);
				if(data.code == "success") {
					var cc = Math.round(Math.random() * 1 + 1);
					var educationArr = ["", "小学", "初中", "高中", "大专", "本科", "硕士", "研究生"];
					var sexArr = ["", "男", "女", "男", "女", "男", "女", "男"];

					var workArr = ["", "服务业", "制造业", , "服务业", "制造业", "服务业", "制造业", "服务业", "制造业"];

					var marryArr = ["", "是", "否", "是", "否", "是", "否", "是", "否"];

					var WordYearArr = ["", "1-3年", "3-5年", "5-10年", "10年以上", "1-3年", "3-5年", "5-10年", "10年以上"];

					var info = data.model;
					//					if(loginStatus == "1") {
					var userInfo1 = '<span>用户ID</span>' +
						'<span>' + NameHidden(info.username) + '</span>' +
						'<span>学历</span>' +
						'<span>' + info.education + '</span>' +
						'<span>所属行业</span>' +
						'<span>' +info.thirdPlatformId + '</span>';
					$(".userInfo1").append(userInfo1);
					var userInfo2 = '<span>性别</span>' +
						'<span>' + sexArr[info.sex] + '</span>' +
						'<span>是否结婚</span>' +
						'<span>' + info.maritalStatus + '</span>';
					'<span>还款来源</span>' +
					'<span>工薪还款</span>';
					$(".userInfo2").append(userInfo2);
					var userInfo3 = '<span>工作年限</span>' +
						'<span>' + info.workYears + '</span>' +
						'<span>房产</span>' +
						'<span>' + info.houseAssets + '</span>' +
						'<span>车产</span>' +
						'<span>' + info.carAssets + '</span>';
					$(".userInfo3").append(userInfo3);
					var userInfo4 = '<span>年收入</span>' +
						'<span>' + formatNum(info.annualEarnings) + '</span>' +
						'<span>月收入</span>' +
						'<span>'+info.monthlyIncome+'</span>' +
						'<span>资产估值</span>' +
						'<span>' + formatNum(info.valuation) + '</span>';
					$(".userInfo4").append(userInfo4);

					//					} else {
					//						$(".bd0").html("");
					//						var ctc = '<div class="noLogin">' +
					//							'	只有<i>注册用户</i>才能看到，现在<i>登录</i>' +
					//							'</div>';
					//						$(".bd0").append(ctc);
					//						$(".noLogin>i").on("click", function() {
					//							window.location.href = "../../html/1LoginRegister/login.html";
					//						});
					//					}

				} else {
					layer.msg(data.msg);
				}
			}
		});
	}

	/*散标出借记录*/

	var totalPageNum;

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

	function loadPage() {
		setTimeout(function() {
			$('.pageTest').page({
				leng: totalPageNum, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					console.log(page);
					$(".recordListBid").html("");
					InvestmentRecord(page);
				}
			});
		}, 2000)
	};
	//	InvestmentRecord(0, 10, 0);
	loadPage();

	//还款计划
	var totalPageNum1;
	detailReturnPlan(1);

	function detailReturnPlan(pageIndex) {
		var borrowNo = sessionStorage.getItem("borrowNo");
		var pageIndex = pageIndex;
		$.ajax({
			type: "post",
			url: payPlanUrl,
			async: true,
			data: {
				borrowNo: borrowNo,
				pageIndex: pageIndex,
				pageSize: "10"
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("还款计划");
				console.log(data);
				if(data.code == "success") {
					$(".planRecord").html("");
					var info = data.model.result;
					totalPageNum1 = Math.ceil(data.model.total / 10);
					//console.log(totalPageNum);
					var len = info.length;
					if(len > 0) {
						for(var i = 0; i < len; i++) {
							var ctc = '<div class="bdpDiv1">' +
								'	<span>' + info[i].periodNo + '期</span>' +
								'	<span>' + info[i].billDate + '</span>' +
								'	<span>' + formatNum(info[i].beginPrincipal) + '</span>' +
								'	<span>' + formatNum(info[i].shouldAmount) + '</span>' +
								'	<span>' + formatNum(info[i].shouldInterest) + '</span>' +
								'	<span>' + formatNum(info[i].shouldReturn) + '</span>' +
								'	<span>' + formatNum(info[i].endPrincipal) + '</span>' +
								'	<span>' + formatNum(info[i].earlySettlement) + '</span>' +
								'</div>';

							$(".planRecord").append(ctc);
							$(".ListPage1").show();
						}
					} else {
						var zwsj = '<p style="width:9.6rem;" class="zwsj">暂无还款计划</p>';

						$(".planRecord").append(zwsj);
						$(".ListPage1").hide();
					}
				} else {
					layer.msg(data.msg);
				}
			}
		});
	}

	function loadPage1() {
		setTimeout(function() {
			$('.pageTest1').page({
				leng: totalPageNum1, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					console.log(page);
					detailReturnPlan(page);
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
		console.log(PInputAmount);
		var checkNull = inputIsNull(PInputAmount);
		if(checkNull != "200") {
			$(".bidwrongTips").html("购买金额不能为空");
			return arr;
		};
		//最小金额
		//				alert(min_invest_amount)
		var checkFlag = checkmaxMoney(PInputAmount, min_invest_amount);
		if(checkFlag != "200") {
			$(".bidwrongTips").html("购买金额不能小于最低金额");
			return arr;
		};

		//单笔上线
		var checkFlag = checkmaxMoney(maxInvestMoney, PInputAmount);
		if(checkFlag != "200") {
			$(".bidwrongTips").html("购买金额大于购买上限");
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

	$(".DIjoin").on("click", function() {

		$(".bidwrongTips").html("");
		var data = searchUserStatus();
		if(data.code == "success") {
			if(data.model.userStatus.openAccountStatus == "1") {
				$(".openCG").show();
			} else if(data.model.userStatus.openAccountStatus == "4") {
				//激活
				$(".accountJH").show();
			} else {
				if(purchase() != "") {
					var pagAmount = parseFloat($(".DIInput").val());
					window.location.href = "bugBid.html";
					sessionStorage.setItem("pagAmount", pagAmount);
					sessionStorage.setItem("pagAmount", parseFloat($(".DIInput").val()));
				}
			}
		} else {
			layer.msg(data.msg);
			window.location.href = returnUrlHL;
		}
	});

})