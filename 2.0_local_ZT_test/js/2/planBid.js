var formeIndex;
$(function() {
	$(".headerSelect span").eq(1).addClass("higLine");
    // 进页面
	var obj1 = GetRequest();
	if(obj1.linkType == "" || obj1.linkType == null || obj1.linkType == undefined) { //进页面判断
		console.log("正常");
		$('.bidSelectP>span').removeClass("higLineShort");
		$('.bidSelectP>span').eq(0).addClass("higLineShort");
		$(".planBidList0").show();
		$(".planBidList1").hide();
		listPlanBid(0);
		loadPage();
		setNewPageNum();
		
	} else if(obj1.linkType == 1) {
		console.log("制定标的");
		$(".planBidList1").show();
		$(".planBidList0").hide();
		var index = obj1.linkType;
		if(index == 1){
			$('.bidSelectP span').eq(index).show();
		}
		$('.bidSelectP>span').removeClass("higLineShort");
		$('.bidSelectP>span').eq(index).addClass("higLineShort");
		listPlanBid(index);
		loadPage();
		setNewPageNum();
	}

	 $(".bidSelectBtn0").show();
	//		$('.pageTest').page({
	//			leng: 5, //分页总数
	//			activeClass: 'activP', //active 类样式定义
	//			clickBack: function(page) {
	//				//console.log(page);
	//			}
	//		});
	var typeI = 0;
	$('.Lsanbiao').on("click", function() { //点击标的种类
		location.href="bidStandard.html"
	});
	var DQYid;
	var YHJid;
	var bid_id;

	/*赢计划列表*/
	function listPlanBid(index) {
		formeIndex = index;
		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
			type: "post",
			url: productListUrl,//productList
			async: true,
			data: {
				platform: platform,
				pageIndex: "1",
				client: client,
                platform: platform,
                isChannelBorrow: formeIndex
			},
			success: function(data) {
				data = jsonchange(data);
				// console.log("赢计划列表");
				// console.log(data);
				if(data.code == "success") {
					var info = data.model.list;
					var len = info.length;
					$(".bidSelectBtn0").html(""); 
					var textcc = '标的种类';
					$(".bidSelectBtn0").append(textcc);
					if(len > 0) {
						for(var i = 0; i < len; i++) {
							var periodLength;
							if(info[i].periodLength == 104) {
								periodLength = "52+52";
							} else {
								periodLength = info[i].periodLength;
							}
							if(info[i].productName.indexOf("短期赢") != -1){ //关闭短期赢 
								continue;  
							}
							if(info[i].productName.indexOf("赢计划D") != -1){ //赢计划D 
								continue;  
							}
							var ctc = '<span class="bidSelectBtnspan">' + info[i].productName + '<i style="display:none;">' + info[i].productNo + '</i></span>';
							$(".bidSelectBtn0").append(ctc);
						}
						productName = $('.bidSelectBtn0').find("span").eq(0).html();
					} else {
						productName = "暂无产品";
					}
					if(formeIndex == 1) {
						fromeId = $('.bidSelectBtn0').find("span").eq(0).find("i").html();
						bid_id = $('.bidSelectBtn0').find("span").eq(0).find("i").html();
						DQYid = $('.bidSelectBtn0').find("span").eq(0).find("i").html();
						$('.bidSelectBtn0').find("span").eq(0).addClass("higBGC");
						$(".tiltle").html(""); 

						var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>渠道标</span>> <span>' + productName + '</span>';
						$(".tiltle").append(ctc);
						sessionStorage.setItem("bidNam", productName);
					} else {
						bid_id = $('.bidSelectBtn0').find("span").eq(0).find("i").html();
						DQYid = $('.bidSelectBtn0').find("span").eq(0).find("i").html();
						$('.bidSelectBtn0').find("span").eq(0).addClass("higBGC");
						$(".tiltle").html("");
						var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>赢计划</span>> <span>' + productName + '</span>';
						$(".tiltle").append(ctc);
						sessionStorage.setItem("bidNam", productName);
					}

					// 点击
					$('.bidSelectBtn0>span').on("click", function() {
						var index = $('.bidSelectBtn0>span').index($(this));
						$('.bidSelectBtn0>span').removeClass("higBGC");
						$(this).addClass("higBGC");
						bid_id = $(this).find("i").html();
						var productName = $(this).html();
						$(".tiltle").html("");
						if(formeIndex == 0){
							var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>赢计划</span>> <span>' + productName + '</span>';
						}else{
							var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>渠道标</span>> <span>' + productName + '</span>';
						}
						$(".tiltle").append(ctc);
						sessionStorage.setItem("bidNam", productName);
						switch(index) {
							case 0:
								queryRaisePlanBid(bid_id, 1, formeIndex);
								setNewPageNum();
								break;
							case 1:
								queryRaisePlanBid(bid_id, 1, formeIndex);
								setNewPageNum();
								//									sessionStorage.setItem("rateType", 1);
								break;
							case 2:
								queryRaisePlanBid(bid_id, 1, formeIndex);
								setNewPageNum();
								break;
							case 3:
								queryRaisePlanBid(bid_id, 1, formeIndex);
								setNewPageNum();
								break;
							case 4:
								queryRaisePlanBid(bid_id, 1, formeIndex);
								setNewPageNum();
								break;
							case 5:
								queryRaisePlanBid(bid_id, 1, formeIndex);
								setNewPageNum();
								break;
							case 6:
								queryRaisePlanBid(bid_id, 1, formeIndex);
								setNewPageNum();
								break;
							case 7:
								queryRaisePlanBid(bid_id, 1, formeIndex);
								setNewPageNum();
								break;
							default:
								break;
						}
					});

					//console.log(DQYid);
					queryRaisePlanBid(DQYid, 1, formeIndex);

				} else if(data.code == "P-1011" || data.code == "user_not_login") {
					layer.msg(data.msg);
					exitLogin();
					setTimeout(function() {
						window.location.href = "../../html/1LoginRegister/login.html";
					}, 1500);

				} else {
					layer.msg(data.msg);
				}

			}
		});
	}
	//	listPlanBid();



	var totalPageNum;

	var total;

	function queryRaisePlanBid(bid_id, num, type) {
		var bid_id = bid_id;
		var num = num;
		var type = type;
		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
			type: "post",
			url: ListUrl,//standardAndPlanList
			async: true,
			data: {
				productNo: bid_id,
				platform: platform,
				client: client,
				borrowType: "2",
				pageIndex: num,
				isChannelBorrow: formeIndex
			},
			success: function(data) {
				data = jsonchange(data);
			//	console.log("标的列表");
			//	console.log(data);
			//	console.log(bid_id);
				if(data.code == "success") {
					var timeArr = ["", "天", "周", "个月", "年"];
					if(type == 0) {
						$(".planBidList00").html("");
					} else {
						$(".planBidList11").html("");
					}

					totalPageNum = Math.ceil(data.model.allCount / 10);
					allCount = data.model.allCount;
					//console.log(data.model.allCount);
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
							} else if(info[i].status == 5) {
								status = "已售罄";
								className = "planBidButtonGray";
							} else if(info[i].status == 7 || info[i].status == 6) {
								status = "计息中";
								className = "planBidButtonGray";
							} else {
								status = "已结束";
								className = "planBidButtonGray";
							}
							var periodLengthText ='';
							// if(info[i].periodLength < 10){
							// 	periodLengthText = '<span>债权期限10周，'+info[i].periodLength+'周(产品期限)可转让，存在无法转出可能</span>'; 
							// }
							var ctc = '<div class="planBidListDetial am-animation-fade">' +
								'	<p class="planBidTiltle">' +
								'		<span>' + info[i].borrowName + '</span><span>短期项目 资金灵活</span>' + periodLengthText +
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
								'			<div>历史借贷年利率</div>' +
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
								$(".planBidList11").append(ctc);
							}
							$(".ListPage").show();

						}

					} else {

						var zwsj = '<p style="width:9.6rem;height:3.0rem;line-height:3.0rem;" class="zwsj am-animation-fade">暂无数据</p>';
						if(type == 0) {
							$(".planBidList00").append(zwsj);
						} else {
							$(".planBidList11").append(zwsj);
						}
						$(".ListPage").hide();
					}
				} else if(data.code == "P-1011" || data.code == "user_not_login") {
					layer.msg(data.msg);
					exitLogin();
					setTimeout(function() {
						window.location.href = "../../html/1LoginRegister/login.html";
					}, 1500);

				} else {
					layer.msg(data.msg)
				}
			}
		});
	}

	//		function ProgessAnimate(className1, className2, length) {
	//			var bluePLength = parseInt($("." + className1).html());
	//			var length = length;
	//			//console.log((bluePLength * length / 100).toFixed(2));
	//			$("." + className2).animate({
	//				width: (bluePLength * length / 100).toFixed(1) + "rem"
	//			}, 1000)
	//		};

	function loadPage() {
		setTimeout(function() {
			$(".pageTest").html("");
			////console.log(totalPageNum);
			$('.pageTest').page({
				leng: totalPageNum, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					////console.log(page);
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

	loadPage();
	setNewPageNum();
})

function linkNextHtml1(borrowNo, projectType) {
	var borrowNo = borrowNo;
	var projectType = projectType;
	////console.log(borrowId);
	sessionStorage.setItem("isChannelBorrow",formeIndex);
	sessionStorage.setItem("projectType", projectType);
	sessionStorage.setItem("borrowNo", borrowNo);
	sessionStorage.setItem("rateType", 1);
	window.location.href = "planBidDetial.html";
}
