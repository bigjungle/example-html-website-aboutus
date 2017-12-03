$(function() {
	$(".headerSelect span").eq(1).addClass("higLine");

	$(".planBidList0").show();
	$(".bidSelectBtn0").show();
	//		$('.pageTest').page({
	//			leng: 5, //分页总数
	//			activeClass: 'activP', //active 类样式定义
	//			clickBack: function(page) {
	//				console.log(page);
	//			}
	//		});
	var typeI = 0;
	var productName;
	$('.bidSelectP>span').on("click", function() {
		$(".tiltle").html("");
		var index = $('.bidSelectP>span').index($(this));
		$('.bidSelectP>span').removeClass("higLineShort");
		$(this).addClass("higLineShort");
		switch(index) {
			case 0:
				$(".planBidList0").show();
				$(".planBidList1").hide();
				$(".bidSelectBtn0").show();
				$(".bidSelectBtn1").hide();
				typeI = 0;
				bid_id = DQYid;
				queryRaisePlanBid(DQYid, 1, 0);
				var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>计划标</span>> <span>' + productName + '</span>';
				$(".tiltle").append(ctc);
				break;
			case 1:
				var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>计划标</span>> <span>散标</span>';
				$(".tiltle").append(ctc);
				$(".planBidList1").show();
				$(".planBidList0").hide();
				$(".bidSelectBtn1").show();
				$(".bidSelectBtn1").html("");
				$(".bidSelectBtn0").hide();
				listQuery(1);
				loadPage1();
				setNewPageNum1();
				break;
			default:
				break;
		}
	});
	var DQYid;
	var YHJid;
	var bid_id;
	/*计划标列表*/
	function listPlanBid() {
		var start = start;
		$.ajax({
			type: "post",
			url: productListUrl,
			async: true,
			data: {
				platform: platform,
				pageIndex: "1",
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("计划标列表");
				console.log(data);
				if(data.code == "success") {
					var info = data.model.list;
					var len = info.length;

					if(len > 0) {
						for(var i = 0; i < len; i++) {
							var periodLength;
							if(info[i].periodLength == 104) {
								periodLength = "52+52";
							} else {
								periodLength = info[i].periodLength;
							}
							//								var keyWord = info[i].product_name_.split("")[0];
							//								if(keyWord == "赢") {
							//									var ctc = '<span class="bidSelectBtnspan">' + info[i].product_name_ + '<i>' + info[i].id_ + '</i></span>';
							//									$(".bidSelectBtn1").append(ctc);
							//								} else {
							var ctc = '<span class="bidSelectBtnspan">' + info[i].productName + '<i style="display:none;">' + info[i].productNo + '</i></span>';
							$(".bidSelectBtn0").append(ctc);
							//								}
						}

						bid_id = $('.bidSelectBtn0').find("span").eq(0).find("i").html();
						DQYid = $('.bidSelectBtn0').find("span").eq(0).find("i").html();
						$('.bidSelectBtn0').find("span").eq(0).addClass("higBGC");
						$(".tiltle").html("");
						productName = $('.bidSelectBtn0').find("span").eq(0).html();
						var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>计划标</span>> <span>' + productName + '</span>';
						$(".tiltle").append(ctc);
						sessionStorage.setItem("bidNam", productName);

						//							YHJid = $('.bidSelectBtn1').find("span").eq(0).find("i").html();
						//							$('.bidSelectBtn1').find("span").eq(0).addClass("higBGC");
					}else{
						productName="暂无产品";
					}

					/*短期赢*/
					$('.bidSelectBtn0>span').on("click", function() {
						var index = $('.bidSelectBtn0>span').index($(this));
						$('.bidSelectBtn0>span').removeClass("higBGC");
						$(this).addClass("higBGC");
						bid_id = $(this).find("i").html();
						productName = $(this).html();
						$(".tiltle").html("");
						var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>计划标</span>> <span>' + productName + '</span>';
						$(".tiltle").append(ctc);
						sessionStorage.setItem("bidNam", productName);
						switch(index) {
							case 0:
								queryRaisePlanBid(bid_id, 1, 0);
								setNewPageNum();
								break;
							case 1:
								queryRaisePlanBid(bid_id, 1, 0);
								setNewPageNum();
								//									sessionStorage.setItem("rateType", 1);
								break;
							case 2:
								queryRaisePlanBid(bid_id, 1, 0);
								setNewPageNum();
								break;
							case 3:
								queryRaisePlanBid(bid_id, 1, 0);
								setNewPageNum();
								break;
							case 4:
								queryRaisePlanBid(bid_id, 1, 0);
								setNewPageNum();
								break;
							case 5:
								queryRaisePlanBid(bid_id, 1, 0);
								setNewPageNum();
								break;
							case 6:
								queryRaisePlanBid(bid_id, 1, 0);
								setNewPageNum();
								break;
							case 7:
								queryRaisePlanBid(bid_id, 1, 0);
								setNewPageNum();
								break;
							default:
								break;
						}
					});

					console.log(DQYid);
					queryRaisePlanBid(DQYid, 1, 0);

				} else {
					layer.msg(data.msg);
				}

			}
		});
	}

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
	if(obj1.ss != "1") {
		console.log("1");
		$('.bidSelectP>span').removeClass("higLineShort");
		$('.bidSelectP>span').eq(0).addClass("higLineShort");
		listPlanBid();
		loadPage();
		setNewPageNum();
	} else {
		console.log("2");
		$('.bidSelectP>span').removeClass("higLineShort");
		$('.bidSelectP>span').eq(1).addClass("higLineShort");
		var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>出借</span>> <span>散标</span>';
		$(".tiltle").append(ctc);
		$(".planBidList1").show();
		$(".planBidList0").hide();
		$(".bidSelectBtn1").show();
		$(".bidSelectBtn1").html("");
		$(".bidSelectBtn0").hide();
		listQuery(1);
		loadPage1();
		setNewPageNum1();
	}

	//		listPlanBid();
	loadPage();
	setNewPageNum();

	var totalPageNum;

	var total;

	function queryRaisePlanBid(bid_id, num, type) {
		var bid_id = bid_id;
		var num = num;
		var type = type;
		$.ajax({
			type: "post",
			url: ListUrl,
			async: true,
			data: {
				productNo: bid_id,
				platform: platform,
				borrowType: "2",
				pageIndex: num,
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("标的列表");
				console.log(data);
				console.log(bid_id);
				if(data.code == "success") {
					var timeArr = ["", "天", "周", "个月", "年"];
					if(type == 0) {
						$(".planBidList00").html("");
					} else {
						$(".planBidList111").html("");
					}

					totalPageNum = Math.ceil(data.model.allCount / 10);
					allCount = data.model.allCount;
					console.log(data.model.allCount);
					var info = data.model.list;
					var len = info.length;
					if(len > 0) {
						for(var i = 0; i < len; i++) {
							var periodLength;
							if(info[i].periodLength == 104) {
								periodLength = "52+52";
							} else {
								periodLength = info[i].periodLength;
							}
							var per = (info[i].contractAmount - info[i].amountWait) / (info[i].contractAmount) * 100;

							if(per < 1 && per > 0) {
								per = 1;
							} else if(per > 99 && per < 100) {
								per = 99;
							} else {
								per = ((info[i].contractAmount - info[i].amountWait) / (info[i].contractAmount) * 100).toFixed(2);
							}
							var rate;
							var txt;
							if(info[i].appendRate == 0) {
								rate = '<i>%</i>';
								txt = '<span onclick="linkNextHtml1(\'' + info[i].productNo + '\',3)" class="LDPspanJoin">' + info[i].status + '</span>';

							} else {
								rate = '<i>%+' + info[i].appendRate.toFixed(2) + '%</i>';
								txt = '<span onclick="linkNextHtml(\'' + info[i].productNo + '\',3,1)"  class="LDPspanJoin">' + info[i].status + '</span>';

							}
							var className;
							var status;
							if(info[i].status <= 4) {
								status = "立即加入";
								className = "";
							} else if(info.status == 5) {
								status = "已售罄";
								className = "planBidButtonGray";
							} else if(info.status == 7) {
								status = "计息中";
								className = "planBidButtonGray";
							} else {
								status = "已结束";
								className = "planBidButtonGray";
							}
							var ctc = '<div class="planBidListDetial am-animation-fade">' +
								'	<p class="planBidTiltle">' +
								'		<span>' + info[i].borrowName + info[i].borrowNo + '</span><span>短期项目 资金灵活</span>' +
								'	</p>' +
								'	<div class="planBidMessage">' +
								'		<div class="planBidMessageDiv">' +
								'			<div>' + info[i].annualizedRate.toFixed(2) + '' + rate + '</div>' +
								'			<div>' + periodLength + timeArr[info[i].periodUnit] + '</div>' +
								'			<div>' + formatNum(info[i].contractAmount) + '</div>' +
								'			<div>' +
								'				<p class="Progress">' +
								'					<span style="width:' + (per / 100) * 0.9 + 'rem;" class="higProgress bb' + i + '"></span>' +
								'					<span class="lowProgress"></span>' +
								'				</p>' +
								'				<p class="ProgressNum"><i class="pp' + i + '">' + per + '</i>%</p>' +
								'			</div>' +
								'		</div>' +
								'		<div class="planBidMessageDiv2">' +
								'			<div>历史年化收益率</div>' +
								'			<div>出借期限</div>' +
								'			<div>计划金额</div>' +
								'			<div>投资进度</div>' +
								'		</div>' +
								'	</div>' +
								'	<div onclick="linkNextHtml1(\'' + info[i].borrowNo + '\',3)" class="planBidButton ' + className + '">' +
								status +
								'	</div>' +
								'</div>'

							if(type == 0) {
								$(".planBidList00").append(ctc);
							} else {
								$(".planBidList111").append(ctc);
							}
							$(".ListPage").show();

						}

					} else {

						var zwsj = '<p style="width:9.6rem;height:3.0rem;line-height:3.0rem;" class="zwsj am-animation-fade">暂无数据</p>';
						if(type == 0) {
							$(".planBidList00").append(zwsj);
						} else {
							$(".planBidList111").append(zwsj);
						}
						$(".ListPage").hide();
					}
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
					//						alert(bid_id);
					queryRaisePlanBid(bid_id, page, typeI);
				}
			});
		}, 1000)
	};

	function setNewPageNum() {
		setTimeout(function() {
			$('.pageTest').setLength(totalPageNum);
		}, 2000)
	}

	var totalPageNum1;
	/*散标列表*/
	function listQuery(num) {
		var num = num;
		$.ajax({
			type: "post",
			url: ListUrl,
			async: true,
			data: {
				platform: platform,
				borrowType: "1",
				/*标的类型 1:散标 2:计划标 3:计划标*/
				pageIndex: num,
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("散标");
				console.log(data);
				if(data.code == "success") {

					$(".planBidList11").html("");
					totalPageNum1 = Math.ceil(data.model.allCount / 10);
					var info = data.model.list;
					var len = info.length;
					if(len > 0) {
						for(var i = 0; i < len; i++) {

							var timeArr = ["", "天", "周", "个月", "年"];
							var per = (info[i].contractAmount - info[i].amountWait) / (info[i].contractAmount) * 100;

							if(per < 1 && per > 0) {
								per = 1.00;
							} else if(per > 99 && per < 100) {
								per = 99.00;
							} else {
								per = ((info[i].contractAmount - info[i].amountWait) / (info[i].contractAmount) * 100).toFixed(2);
							}
							var Text;
							var className;
							if(info[i].status <= 4) {
								Text = "立即加入";
								className = "";
							} else if(info.status == 5) {
								Text = "已售罄";
								className = "planBidButtonGray";
							} else if(info.status == 7) {
								Text = "计息中";
								className = "planBidButtonGray";
							} else {
								Text = "已结束";
								className = "planBidButtonGray";
							}
							var ctc = '<div class="planBidListDetial">' +
								'	<p class="planBidTiltle">' +
								'		<span>' + info[i].borrowName + info[i].borrowNo + '</span><span>短期项目 资金灵活</span>' +
								'	</p>' +
								'	<div class="planBidMessage">' +
								'		<div class="planBidMessageDiv">' +
								'			<div>' + info[i].annualizedRate.toFixed(2) + '<i>%</i></div>' +
								'			<div>' + info[i].periodLength + '' + timeArr[info[i].periodUnit] + '</div>' +
								'			<div>' + formatNum(info[i].contractAmount) + '</div>' +
								'			<div>' +
								'				<p class="Progress">' +
								'					<span style="width:' + (per / 100) * 0.9 + 'rem;" class="higProgress bb' + i + '"></span>' +
								'					<span class="lowProgress"></span>' +
								'				</p>' +
								'				<p class="ProgressNum pp' + i + '">' + per + '%</p>' +
								'			</div>' +
								'		</div>' +
								'		<div class="planBidMessageDiv2">' +
								'			<div>历史年化收益率</div>' +
								'			<div>出借期限</div>' +
								'			<div>计划金额</div>' +
								'			<div>投资进度</div>' +
								'		</div>' +
								'	</div>' +
								'	<div class="planBidButton  ' + className + '" onclick="linkNextHtml2(\'' + info[i].borrowNo + '\',2)">' +
								Text +
								'	</div>' +
								'</div>';
							$(".planBidList11").append(ctc);
							$(".ListPage1").show();
						}

					} else {
						var zwsj = '<p style="width:9.6rem;height:3.0rem;line-height:3.0rem;" class="zwsj">暂无数据</p>';
						$(".planBidList11").append(zwsj);
						$(".ListPage1").hide();
					}

				} else {
					layer.msg(data.msg)
				}
			}
		});
	}

	function ProgessAnimate(className1, className2, length) {
		var bluePLength = parseInt($("." + className1).html());
		var length = length;

		$("." + className2).animate({
			width: bluePLength * length / 100 + "rem"
		}, 1000)
	};

	function loadPage1() {
		setTimeout(function() {
			$('.pageTest1').page({
				leng: totalPageNum1, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					//					console.log(page);
					listQuery(page);
				}
			});
		}, 1000)
	};

	function setNewPageNum1() {
		setTimeout(function() {
			$('.pageTest1').setLength(totalPageNum1);
		}, 2000)
	}
})

function linkNextHtml1(borrowNo, projectType) {
	var borrowNo = borrowNo;
	var projectType = projectType;
	//console.log(borrowId);
	sessionStorage.setItem("projectType", projectType);
	sessionStorage.setItem("borrowNo", borrowNo);
	sessionStorage.setItem("rateType", 1);
	window.location.href = "planBidDetial.html";
}

function linkNextHtml2(borrowNo, projectType) {
	var borrowNo = borrowNo;
	var projectType = projectType;
	//console.log(borrowId);
	sessionStorage.setItem("product_name", "散标出借");
	sessionStorage.setItem("firstName", "散标市场");
	sessionStorage.setItem("projectType", projectType);
	sessionStorage.setItem("borrowNo", borrowNo);
	window.location.href = "bidStandardDetial.html";
}