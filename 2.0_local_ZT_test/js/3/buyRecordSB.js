$(function() {
	var mobile = sessionStorage.getItem("mobile");
	$(".headerSelect div").eq(0).addClass("accountDivBtn");
	$(".asLeft p>a").eq(2).css({
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

	//散标
	var totalPageNum;

	function ManagementList(num) {
		var num = num;
		$.ajax({
			type: "post",
			url: productManageUrl,
			async: true,
			data: {
				phoneNum: mobile,
				platform: platform,
				client: client,
				borrowType: "1",
				type: "0",
				pageIndex: num
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("散标购买记录");
				console.log(data);
				if(data.code == "success") {
					var info = data.model.dataList;
					var len = info.length;
					totalPageNum = Math.ceil(data.model.total / 10);
					$(".buyPlanBid0").html("");
					if(len > 0) {
						for(var i = 0; i < len; i++) {
							//							var remain_days_;
							//							if(info[i].remain_days_ <= 0) {
							//								remain_days_ = 0;
							//							} else {
							//								remain_days_ = info[i].remain_days_;
							//							}
							//
							//							var HTlink;
							//							if(info[i].apply_no_==""||info[i].apply_no_==null){
							//								HTlink='<span style="color:#3788f8;"  onclick="linkNextHtml2(\'' + info[i].debt_id_ + '\',4)" style="color: #0F376E;">合同</span>' ;
							//							}else{
							//								var linlll=downLoad(info[i].apply_no_);
							//								HTlink='	<span style="color: #0F376E;">'+
							//								'<a style="color:#3788f8;"  id="downLoad" download="下载合同" href="'+linlll+'" >下载合同</a>'+
							//								'</span>' ;
							//							}
							var profitPlanArr = ["", "等额本息", "等额本金", "按期付息", "到期还本", "一次性还款"];
							var timeArr = ["", "天", "周", "个月", "年"];
							var ctc = '<p class="rlspan">' +
								'	<span>' + info[i].borrowName + '</span>' +
								'	<span>' + info[i].annualizedRate + '%</span>' +
								'	<span style="color: #FF8000;">' + info[i].investAmount + '</span>' +
								'	<span>' + info[i].periodLength + timeArr[info[i].periodUnit] + '</span>' +
								'	<span>' + profitPlanArr[info[i].profitPlan] + '</span>' +
								'	<span>' + info[i].investDate + '</span>' +
								'	<span>合同</span>' +
								'</p>';
							$(".buyPlanBid0").append(ctc);
							$(".ListPage").show();
						};

					} else {
						var zwsj = '<p style="margin-top:0.5rem;" class="zwsj">暂无数据</p>';
						$(".buyPlanBid0").append(zwsj);
						$(".ListPage").hide();
					}

				} else if(data.code == "user_not_login") {
					window.location.href = loginUrl;
				} else {
					layer.msg(data.msg);
				}

			}
		});
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
		}
	});
	var data = searchUserStatus();
	if(data.code == "success") {

		ManagementList(1);
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
					$(".cjje").html(data.model.borrowAmount);
					$(".yqsy").html(data.model.borrowProfit);
				}
			}
		});
	} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	}

	function setNewPageNum() {
		setTimeout(function() {
			$('.pageTest').setLength(totalPageNum);
		}, 1500)
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
					ManagementList(page);
				}
			});
		}, 800)
	};
})

function linkNextHtml2(debt_id_, pact_no_) {
	var debt_id_ = debt_id_;
	var pact_no_ = pact_no_;
	sessionStorage.setItem("debt_id_", debt_id_);
	sessionStorage.setItem("pact_no_", pact_no_);
	window.location.href = "../../html/2/bidplancontract_old.html";
}