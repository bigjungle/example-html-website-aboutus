$(function() {
	$(".headerSelect div").eq(0).addClass("accountDivBtn");

	var cashNo = sessionStorage.getItem("cashNo");
	var juid = sessionStorage.getItem("juid");

	//	var fund_id_ = "10970";
	//	var juid = "1708091751200074";

	$(".lendDiv0").show();

	$('.ListPage').show();

	//	$('.pageTest').page({
	//		leng: 5, //分页总数
	//		activeClass: 'activP', //active 类样式定义
	//		clickBack: function(page) {
	//			console.log(page);
	//		}
	//	});

	$(".lendSectionBtn>span").on("click", function() {
		$(".lendSectionBtn>span").removeClass("higline");
		var index = $(".lendSectionBtn>span").index($(this));
		$(".lendSectionBtn>span").removeClass("higLineShort");
		$(".lendSectionBtn>span").removeClass("higColor");
		$(this).addClass("higColor");
		$(this).addClass("higLineShort");

		switch(index) {
			case 0:

				$(".lendDiv0").show();
				$(".lendDiv1").hide();
				$(".lendDiv2").hide();
				$(".lendDiv3").hide();

				dqDebtBills(0);
				loadPage();
				setNewPageNum();
				break;
			case 1:

				$(".lendDiv1").show();
				$(".lendDiv0").hide();
				$(".lendDiv2").hide();
				$(".lendDiv3").hide();

				zcpzAssetConfigLog(0);
				loadPage1();
				setNewPageNum1();
				break;
			case 2:
				$(".lendDiv2").show();
				$(".lendDiv1").hide();
				$(".lendDiv0").hide();
				$(".lendDiv3").hide();

				zqTransferRecords(0);
				loadPage2();
				setNewPageNum2();
				break;
			case 3:

				$(".lendDiv3").show();
				$(".lendDiv1").hide();
				$(".lendDiv2").hide();
				$(".lendDiv0").hide();

				FundsAccounts(0);
				loadPage3();
				setNewPageNum3();
				break;
			default:
				break;
		}

	});

	var data = searchUserStatus();
	if(data.code == "success") {
		FundDetails();
		dqDebtBills(0);
		loadPage();
		setNewPageNum();
	} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	}

	//出借详情  
	function FundDetails() {
		var JHBorderNo = sessionStorage.getItem("JHBorderNo");
		$.ajax({
			type: "post",
			url: FundDetailsUrl,
			async: true,
			data: {
				orderNo: JHBorderNo
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("出借详情 ");
				console.log(data);
				if(data.code == "success") {
					var info = data.model;
					$(".lendSectionDiv").html("");
					var timeArr = ["", "天", "周", "个月", "年"];
					var profitPlanArr = ['', '等额本息', '等额本金', '按期付息', '到期还本', '一次性还款', '其他'];
					var statusArr = ['', '投资中', '正在支付', '投资成功', '投资失败', '计息中', '已还款', '扣款中', '扣款成功', '扣款失败', '账户本地操作异常'];

					var interestStartDate;
					var interestEndDate;
					var natureEndDay;
					if(info.interestStartDate == "") {
						interestStartDate = "等待满标确认";
					} else {
						interestStartDate = info.interestStartDate;
					}
					if(info.interestEndDate == "") {
						interestEndDate = "等待满标确认";
					} else {
						interestEndDate = info.interestEndDate;
					}
					if(info.natureEndDay == "") {
						natureEndDay = "等待满标确认";
					} else {
						natureEndDay = info.natureEndDay + "天";
					}

					var ctc = '<span>出借ID</span>' +
						'<span>' + info.id + '</span>' +
						'<span>出借人</span>' +
						'<span>' + info.realName + '</span>' +
						'<span>计划标名称</span>' +
						'<span>' + info.borrowName + '</span>' +
						'<span>出借金额</span>' +
						'<span style="color: #FF8000;">' + formatNum(info.investAmount) + '元</span>' +
						'<span>出借周期</span>' +
						'<span>' + info.periodLength + timeArr[info.periodUnit] + '</span>' +
						'<span>累计收益</span>' +
						'<span style="color: #FF8000;">' + formatNum(info.yesProfit) + '元</span>' +
						'<span>产品模板</span>' +
						'<span>' + info.productName + '</span>' +
						'<span>历史平均年化收益</span>' +
						'<span>' + info.annualizedRate + '%</span>' +
						'<span>收益方式</span>' +
						'<span>' + profitPlanArr[info.profitPlan] + '</span>' +
						'<span>出借日期</span>' +
						'<span>' + info.orderDate + '</span>' +
						'<span>状态</span>' +
						'<span>' + statusArr[info.status] + '</span>' +
						'<span>计息起始日期</span>' +
						'<span>' + interestStartDate + '</span>' +
						'<span>退出日期</span>' +
						'<span>' + interestEndDate + '</span>' +
						'<span>自然到期日期</span>' +
						'<span>' + natureEndDay + '</span>';
					$(".lendSectionDiv").append(ctc);
					$(".lendSectionDiv").show();
				} else {
					layer.msg(data.msg);
				}
			}
		});

	}

	//当前债权列表
	var totalPageNum;

	function dqDebtBills(num) {
		var num = num;
		$.ajax({
			type: "post",
			url: dqDebtBillsUrl,
			async: true,
			data: {
				cashNo: cashNo,
				start: num,
				rows: "5"
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("当前债权");
				console.log(data);
				if(data.code == "success") {
					$(".lendDivTitle0").html("");
					var tt = '<span>当前持有债权个数：' + data.model.totalAmount + '个</span>' +
						'<span>当前持有债权价值总计：' + data.model.totalValue + '元</span>';
					$(".lendDivTitle0").append(tt);
					$(".Record0").html("");
					var info = data.model.list;
					var len = info.length;
					totalPageNum = Math.ceil(data.model.totalAmount / 5);
					if(len > 0) {
						for(var i = 0; i < len; i++) {

							var JHBorderNo = sessionStorage.getItem("JHBorderNo");
							var HTlink;
							if(info[i].jzqApplyNo == "" || info[i].jzqApplyNo == null || info[i].jzqApplyNo == undefined) {

								HTlink = '<span  style="color:#3788f8;cursor:pointer;" onclick="oldAgreement1(\'' + info[i].orderNo + '\',\'' + info[i].debtNo + '\',\'' + info[i].cashNo + '\');">合同</span>';

							} else {
								var linlll = downLoad(info[i].jzqApplyNo);
								HTlink = '<span  style="color:#3788f8;cursor:pointer;">' +
									'<a style="color:#3788f8;"  id="downLoad" download="下载合同" href="' + linlll + '" >下载合同</a>' +
									'</span>';
							}

							var ctc = '<p class="lendDivP1">' +
								'	<span>' + info[i].id + '</span>' +
								'	<span>' + info[i].matchDate + '</span>' +
								'	<span style="color:#ff8000;">' + formatNum(info[i].matchPrincipal) + '</span>' +
								'	<span style="color:#ff8000;">' + formatNum(info[i].currPrincipal) + '</span>' +
								'	<span style="color:#ff8000;">' + formatNum(info[i].currValue) + '</span>' +
								HTlink +
								'	<span>' + info[i].borrowName + '</span>' +
								'	<span>' + info[i].realName + '</span>' +
								'</p>';
							$(".Record0").append(ctc);
							$(".ListPage").show();
						}
					} else {
						var zwsj = '<p class="zwsj" style="width: 9.2rem;">暂无数据</p>';
						$(".Record0").append(zwsj);
						$(".ListPage").hide();
					}

				} else {
					layer.msg(data.msg);
				}
			}
		});
	}
	//资产配置历史
	var totalPageNum1 = 1;

	function zcpzAssetConfigLog(num) {
		var num = num;
		$.ajax({
			type: "post",
			url: zcpzAssetConfigLogUrl,
			async: true,
			data: {
				cashNo: cashNo,
				start: num,
				rows: "5"
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("资产配置历史");
				console.log(data);
				if(data.code == "success") {
					$(".Record1").html("");
					var info = data.model.list;
					var len = info.length;
					totalPageNum1 = Math.ceil(data.model.totalAmount / 5);
					$(".lendDivTitle1").html("");
					var tt = '<span>当前持有债权个数：' + data.model.totalAmount + '个</span>';
					$(".lendDivTitle1").append(tt);
					if(len > 0) {
						for(var i = 0; i < len; i++) {

							var ctc = '<p class="lendDivP1">' +
								'<span>' + info[i].id + '</span>' +
								'<span>' + info[i].matchDate + '</span>' +
								'<span style="color:#ff8000;">' + formatNum(info[i].matchPrincipal) + '</span>' +
								'<span style="color:#ff8000;">' + formatNum(info[i].currPrincipal) + '</span>' +
								'<span style="color:#ff8000;">' + formatNum(info[i].currValue) + '</span>' +
								'<span style="color:#ff8000;">' + formatNum(info[i].expireValue) + '</span>' +
								'<span>' + info[i].borrowName + '</span>' +
								'<span>' + info[i].realName + '</span>' +
								'</p>';
							$(".Record1").append(ctc);
							$(".ListPage1").show();
						}

					} else {
						var zwsj = '<p class="zwsj" style="width: 9.2rem;">暂无数据</p>';
						$(".Record1").append(zwsj);
						$(".ListPage1").hide();
					}

				} else {
					layer.msg(data.msg);
				}
			}
		});
	}
	//债权转让
	var totalPageNum2 = 1;

	function zqTransferRecords(num) {
		var num = num;
		$.ajax({
			type: "post",
			url: zqTransferRecordsUrl,
			async: true,
			data: {
				cashNo: cashNo,
				start: num,
				rows: "5"
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("债权转让");
				console.log(data);
				if(data.code == "success") {
					$(".Record2").html("");
					var info = data.model.list;
					var len = info.length;
					totalPageNum2 = Math.ceil(data.model.totalAmount / 5);
					$(".lendDivTitle2").html("");
					var tt = '<span>已转债权个数：：' + data.model.totalAmount + '个</span>';
					$(".lendDivTitle2").append(tt);

					if(len > 0) {
						for(var i = 0; i < len; i++) {
							var JHBorderNo = sessionStorage.getItem("JHBorderNo");
							var HTlink;
							if(info[i].jzqApplyNo == "" || info[i].jzqApplyNo == null || info[i].jzqApplyNo == undefined) {

								HTlink = '<span  style="color:#3788f8;cursor:pointer;" onclick="oldAgreement1(\'' + JHBorderNo + '\',\'' + info[i].debtNo + '\',\'' + info[i].buyerCashNo + '\');">合同</span>';

							} else {
								var linlll = downLoad(info[i].jzqApplyNo);
								HTlink = '<span  style="color:#3788f8;cursor:pointer;">' +
									'<a style="color:#3788f8;"  id="downLoad" download="下载合同" href="' + linlll + '" >下载合同</a>' +
									'</span>';
							}
							var ststusArr = ["", "挂牌中", "债转成功", "债转失败", "撤销挂牌"];
							var ctc = '<p class="lendDivP2">' +
								'<span>' + info[i].id + '</span>' +
								'<span>' + info[i].startTransferDate + '</span>' +
								'<span>' + ststusArr[info[i].status] + '</span>' +
								'<span>' + formatNum(info[i].salePrincipal) + '</span>' +
								'<span>' + info[i].discountPrincipal + '</span>' +
								'<span>' + formatNum(info[i].transferFee) + '</span>' +
								HTlink +
								'<span>' + formatNum(info[i].transferAmount) + '</span>' +
								'<span>' + info[i].realName + '</span>' +
								'</p>';

							$(".Record2").append(ctc);
							$(".ListPage2").show();
						}
					} else {
						var zwsj = '<p class="zwsj" style="width: 9.2rem;">暂无数据</p>';
						$(".Record2").append(zwsj);
						$(".ListPage2").hide();
					}
				} else {
					layer.msg(data.msg);
				}
			}
		});
	}

	//账目流水
	var totalPageNum3 = 1;

	function FundsAccounts(num) {
		var num = num;
		$.ajax({
			type: "post",
			url: FundsAccountsUrl,
			async: true,
			data: {
				cashNo: cashNo,
				start: num,
				rows: "5"
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("账目流水");
				console.log(data);
				if(data.code == "success") {
					$(".Record3").html("");
					$(".lendDivTitle2").html("");
					var tt = '<span>资金流水条数：' + data.model.totalAmount + '个 </span>' +
						'<span>当前现金结余：' + data.model.remainAmount + '元</span>' +
						'<span>回款：' + data.model.totalRollAmount + '元</span>' +
						'<span>手续费缴纳：' + data.model.advanceFee + '元</span>';
					$(".lendDivTitle2").append(tt);
					var info = data.model.list;
					var len = info.length;
					totalPageNum3 = Math.ceil(data.model.totalAmount / 5);
					if(len > 0) {
						var TypeArr = ["初始认购", "借款人还款", "投资人回款", "复投", "承兑"];
						for(var i = 0; i < len; i++) {
							var ctc = '<p class="lendDivP3">' +
								'<span>' + info[i].id + '</span>' +
								'<span>' + info[i].createTime + '</span>' +
								'<span>' + formatNum(info[i].operationAmount) + '</span>' +
								'<span>' + formatNum(info[i].currCashAmountBefore) + '</span>' +
								'<span>' + formatNum(info[i].currCashAmountAfter) + '</span>' +
								'<span>' + TypeArr[info[i].type] + '</span>' +
								'<span>' + info[i].remark + '</span>' +
								'</p';
							$(".Record3").append(ctc);
							$(".ListPage3").show();
						}
					} else {
						var zwsj = '<p class="zwsj" style="width: 9.2rem;">暂无数据</p>';
						$(".Record3").append(zwsj);
						$(".ListPage3").hide();
					}

				} else {
					layer.msg(data.msg);
				}

			}
		});
	}

	function setNewPageNum() {
		setTimeout(function() {
			$('.pageTest').setLength(totalPageNum);
		}, 3000)
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
					dqDebtBills((page - 1) * 5);
				}
			});
		}, 1500)
	};

	function setNewPageNum1() {
		setTimeout(function() {
			$('.pageTest1').setLength(totalPageNum1);
		}, 3000)
	}

	function loadPage1() {
		setTimeout(function() {
			$(".pageTest1").html("");
			//console.log(totalPageNum1);
			$('.pageTest1').page({
				leng: totalPageNum1, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					//console.log(page);
					zcpzAssetConfigLog((page - 1) * 5);
				}
			});
		}, 1500)
	};

	function setNewPageNum2() {
		setTimeout(function() {
			$('.pageTest2').setLength(totalPageNum2);
		}, 3000)
	}

	function loadPage2() {
		setTimeout(function() {
			$(".pageTest2").html("");
			//console.log(totalPageNum2);
			$('.pageTest2').page({
				leng: totalPageNum2, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					//console.log(page);
					zqTransferRecords((page - 1) * 5);
				}
			});
		}, 1500)
	};

	function setNewPageNum3() {
		setTimeout(function() {
			$('.pageTest3').setLength(totalPageNum3);
		}, 3000)
	}

	function loadPage3() {
		setTimeout(function() {
			$(".pageTest3").html("");
			//console.log(totalPageNum3);
			$('.pageTest3').page({
				leng: totalPageNum3, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					//console.log(page);
					FundsAccounts((page - 1) * 5);
				}
			});
		}, 1500)
	};
})