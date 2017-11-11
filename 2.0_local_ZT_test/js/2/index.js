$(function() {
	/*合作机构*/
	for(var i = 1; i <= 6; i++) {
		var imgCtc = '<div><img src="img/1/' + i + '.png" /></div>';
		$(".cooperationImg").append(imgCtc);
	}
	Infiniteloop();
	/*平台小消息*/
	function Infiniteloop() {
		//获得当前<ul>
		var $uList = $(".indexSectionBottom ul");
		var timer = null;
		//触摸清空定时器
		$uList.hover(function() {
				clearInterval(timer);
			},
			function() { //离开启动定时器
				timer = setInterval(function() {
						scrollList($uList);
					},
					3000);
			}).trigger("mouseleave"); //自动触发触摸事件
		//滚动动画
		function scrollList(obj) {
			//获得当前<li>的高度
			var scrollHeight = $("ul li:first").height();
			//滚动出一个<li>的高度
			$uList.stop().animate({
					marginTop: -scrollHeight
				},
				500,
				function() {
					//动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
					$uList.css({
						marginTop: 0
					}).find("li:first").appendTo($uList);
				});
		}
	}

	/*散标*/
	function listQuery(start, limit) {
		var limit = limit;
		var start = start;
		$.ajax({
			type: "post",
			url: listQueryUrl,
			async: true,
			data: {
				juid: juid,
				mer_id_: mer_id_,
				start: start,
				limit: limit,
				status_: "3"
			},
			success: function(data) {
				data = jsonchange(data);
				//				console.log(data);
				if(data.appcode == "1") {
					$(".LDlist").html("");
					totalPageNum = Math.ceil(data.data.bidListCount / limit);
					var info = data.data.bidsList;
					var len = info.length;
					if(len > 0) {
						for(var i = 0; i < len; i++) {

							var title_ = info[i].title_;
							var title_Arr = info[i].title_.split("】");

							var timeArr = ["", "天", "个月", "周"];
							var per = (info[i].invest_amount_total_) / (info[i].amount_) * 100;

							if(per < 1 && per > 0) {
								per = 1;
							} else if(per > 99 && per < 100) {
								per = 99;
							} else {
								per = ((info[i].invest_amount_total_) / (info[i].amount_) * 100).toFixed(0);
							}
							var Text;
							if(info[i].status_ > 3) {
								Text = '<span onclick="linkNextHtml1(\'' + info[i].id_ + '\',\'' + info[i].user_id_ + '\',2)" class="LDPspanJoin2">已售罄</span>';
							} else {
								Text = '<span onclick="linkNextHtml1(\'' + info[i].id_ + '\',\'' + info[i].user_id_ + '\',2)" class="LDPspanJoin">购买</span>';
							}

							var bidStandard = '<div class="StandardDivtop1">' +
								'	<div>' + title_Arr[0] + info[i].no_ + '</div>' +
								'	<div style="color: #FF8000;"> <i>' + (info[i].apr_ * 100).toFixed(2) + '</i>% </div>' +
								'	<div> <i>' + info[i].period_ + '</i>' + timeArr[info[i].period_unit_] + ' </div>' +
								'	<div>' + info[i].amount_ + '</div>' +
								'	<div class="sdDrogress">' +
								'		<p><i class="pp' + i + '">' + per + '</i>%</p>' +
								'		<p>' +
								'			<span class="blackLine"></span>' +
								'			<span class="blackLine1 bb' + i + '"></span>' +
								'		</p>' +
								'	</div>' +
								'	<div>' +
								'		<p onclick="linkNextHtml1(\'' + info[i].id_ + '\',\'' + info[i].user_id_ + '\',2)" class="nextLink">查看详情</p>' +
								'	</div>' +
								'</div>';

							$(".StandardDiv").append(bidStandard);

							ProgessAnimate("pp" + i, "bb" + i, 0.6);
						}
					} else {
						//						var zwcp = '<img class="zwcp" src="../../img/2Homepage/zwcp.png"/>';
						//						$(".LDlist").append(zwcp);
						//						$(".ListPage").hide();
					}

				} else {
					//					layer.msg(data.appmsg)
				}
			}
		});
	}

	//	listQuery(0, 4);
	//	loadPage();
	//	setNewPageNum();
	$(".sbmoreImg").on("click", function() {
		window.location.href = "html/2/bidStandard.html";
	});
	$(".sbmoreImg1").on("click", function() {
		window.location.href = "html/2/planBid.html";
	});

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
							var timeArr = ["", "天", "周", "个月", "年"];

							var ctc = '<div class="bidPlanList am-animation-scale-up">' +
								'	<p>' + info[i].productName + '</p>' +
								'	<p>' +
								'		<span style="color: #FF8800;"><i style="font-size: 0.30rem;">' + info[i].annualizedRate.toFixed(2) + '</i>%</span>' +
								'		<span>历史平均年化收益</span>' +
								'	</p>' +
								'	<p>' +
								'		<span>' + info[i].periodLength + timeArr[info[i].periodUnit] + '</span>' +
								'		<span>出借周期</span>' +
								'	</p>' +
								'	<p  onclick="linkList(\'' +i+ '\')">' +
								'		立即加入' +
								'	</p>' +
								'</div>';
							$(".bidPlan").append(ctc);
						}
					} else {
						var zwsj = '<p style="width:9.6rem;height:1.5rem;line-height:1.5rem;" class="zwsj am-animation-fade">暂无数据</p>';
						$(".bidPlan").append(zwsj);
					}
				}
			}
		})
	};

	listPlanBid();

	/*首页用户注册数据*/
	function getStatis() {
		$.ajax({
			type: "post",
			url: indexMessageUrl,
			async: true,
			data: {
				phoneNum: mobile,
				platform: platform,
				client: client
			},
			success: function(data) {
				data = jsonchange(data);
				console.log(data);
				if(data.code == "success") {
					var info = data.model.homestatic;
					if(info.amount > 10000) {
						$(".ljjy").html(formatNum(info.amount / 10000) + "万元");
					} else {
						$(".ljjy").html(formatNum(info.amount) + "元");
					};

					$(".article").html("");
					var articleInfo = data.model.article.announcementList;
					var len = articleInfo.length;
					if(len > 0) {
						$(".indexSectionBottom").show();
						for(var i = 0; i < len; i++) {
							var ctc = '<li>' +
								'	<a class="indexLiA" href="###">' +
								'		<span><img src="img/assets/gg.png"/></span>' +
								'		<span>' + articleInfo[i].title + '</span>' +
								'		<span>' + dateFormat(new Date(articleInfo[i].createTime), 'yyyy-MM-dd') + '</span>' +
								'		<span><img src="img/assets/more1.png"/></span>' +
								'		<span>查看更多</span>' +
								'	</a>' +
								'</li>';
							$(".article").append(ctc);
							//$(".article").append(ctc);
						}
					} else {};

					$(".wrapper1").html("");
					var bannnerList = data.model.banner;
					var bannerlen = bannnerList.length;
					for(var j = 0; j < bannerlen; j++) {

						if(bannnerList[j].linkUrl == "") {
							var ctc2 = '<div class="swiper-slide">' +
								'	<a  href="###"><img style="width: 100%; " src="' + bannnerList[j].imageUrl + '" /></a>' +
								'</div>';
							$(".wrapper1").append(ctc2);
						} else {
							var ctc2 = '<div class="swiper-slide">' +
								'	<a target="_blank" href="' + bannnerList[j].linkUrl + '"><img style="width: 100%; " src="' + bannnerList[j].imageUrl + '" /></a>' +
								'</div>';
							$(".wrapper1").append(ctc2);
						}

					}
					/*轮播图*/
					var swiper1 = new Swiper('.s1', {
						pagination: '.swiper-pagination',
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						slidesPerView: 1,
						paginationClickable: true,
						loop: true,
						autoplay: 3000,
						autoplayDisableOnInteraction: false
					});

				} else {
					layer.msg(data.msg);
				}
			}
		});
	}
	getStatis();
	/*首页产品列表*/
	function indexList(recommendNo, planNo) {
		var planNo = planNo;
		var recommendNo = recommendNo;
		$.ajax({
			type: "post",
			url: indexListUrl,
			async: true,
			data: {
				platform: platform,
				client: client,
				recommendNo: recommendNo,
				planNo: planNo
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("首页列表");
				console.log(data);
				if(data.code == "success") {
					var timeArr = ["", "天", "周", "个月", "年"];
					/*新手标*/
					var newBidList = data.model.noviciateBorrow;
					var newCtc = '<p class="bidNewRightP1">' +
						'	<span>' + newBidList.annualizedRate + '<i>%</i></span>' +
						'	<span>' + newBidList.periodLength + '<i>' + timeArr[newBidList.periodUnit] + '</i></span>' +
						'	<span>' + newBidList.investMinAmount + '<i>元</i></span>' +
						'</p>' +
						'<p class="bidNewRightP2">' +
						'	<span style="color: #000;">历史年化收益</span>' +
						'	<span>出借期限</span>' +
						'	<span>起投金额</span>' +
						'</p>' +
						'<p class="bidNewRightP3" onclick="linkNextHtml(\'' + newBidList.borrowNo + '\',3,1)">' +
						'	立即加入' +
						'</p>';
					$(".bidNewRight").append(newCtc);
					if(newBidList.annualizedRate == "" || newBidList.annualizedRate == null || newBidList.annualizedRate == undefined) {
						$(".bidNew").hide();
					} else {
						$(".bidNew").show();
					}
					/*计划标*/
					var planBidList = data.model.planBorrow;
					var planBidLength = planBidList.length;
					for(var i = 0; i < planBidLength; i++) {
						var ctc = '<div class="planBidDiv am-animation-scale-up">' +
							//									'	<p>' + planBidList[i].borrowName + '&nbsp;&nbsp; ' + planBidList[i].borrowNo + '</p>' +
							'	<p>' + planBidList[i].borrowName + '</p>' +
							'	<p>推荐 长期稳健收益佳</p>' +
							'	<p>' + planBidList[i].annualizedRate + '<i>%</i></p>' +
							'	<p>历史年化收益</p>' +
							'	<p>出借期限：' + planBidList[i].periodLength + timeArr[planBidList[i].periodUnit] + '</p>' +
							'	<p onclick="linkNextHtml(\'' + planBidList[i].borrowNo + '\',3,1)" >立即抢购</p>' +
							'</div>';
						//						$(".bidPlanSection").append(ctc);
					}

					/*散标--推荐标*/
					var bidList = data.model.recommendBorrow;
					var bidLength = bidList.length;
					if(bidLength > 0) {
						for(var i = 0; i < bidLength; i++) {
							var bidStandard = '<div class="StandardDivtop1">' +
								'	<div>' + bidList[i].borrowName + '</div>' +
								'	<div style="color: #FF8000;"> <i>' + bidList[i].annualizedRate + '</i>% </div>' +
								'	<div> <i>' + bidList[i].periodLength + '</i>' + timeArr[bidList[i].periodUnit] + ' </div>' +
								'	<div>' + bidList[i].contractAmount + '</div>' +
								'	<div class="sdDrogress">' +
								'		<p><i class="pp' + i + '">' + bidList[i].proportion + '</i>%</p>' +
								'		<p>' +
								'			<span class="blackLine"></span>' +
								'			<span class="blackLine1 bb' + i + '"></span>' +
								'		</p>' +
								'	</div>' +
								'	<div>' +
								'		<p onclick="linkNextHtml1(\'' + bidList[i].borrowNo + '\',2)" class="nextLink">查看详情</p>' +
								'	</div>' +
								'</div>';

							$(".StandardDiv").append(bidStandard);

							//							ProgessAnimate("pp" + i, "bb" + i, 0.6);
						}
					} else {
						var zwsj = '<p style="width:9.6rem;height:1.5rem;line-height:1.5rem;" class="zwsj am-animation-fade">暂无数据</p>';
						$(".StandardDiv").append(zwsj);
					}

				}
			}
		});
	}

	indexList(50, 50);

})

function linkNextHtml1(borrowNo, projectType) {
	var borrowNo = borrowNo;
	var projectType = projectType;
	sessionStorage.setItem("product_name", "散标出借");
	sessionStorage.setItem("firstName", "散标市场");
	sessionStorage.setItem("projectType", projectType);
	sessionStorage.setItem("borrowNo", borrowNo);
	window.location.href = "html/2/bidStandardDetial.html";
}

function linkNextHtml(borrowNo, projectType, rateType) {
	var borrowNo = borrowNo;
	var projectType = projectType;
	var rateType = rateType;
	sessionStorage.setItem("projectType", projectType);
	sessionStorage.setItem("rateType", rateType);
	sessionStorage.setItem("borrowNo", borrowNo);
	sessionStorage.setItem("firstName", "计划标市场");
	window.location.href = "html/2/planBidDetial.html";
};
function linkList(linkType) {
	var linkType=parseInt(linkType);
	window.location.href = "html/2/planBid.html?linkType="+linkType+"";
};