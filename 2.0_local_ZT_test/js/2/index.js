$(function() {
	/*合作机构*/
	for(var i = 1; i <= 5; i++) {
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
	$(".sbmoreImg1").on("click", function() {
		window.location.href = "html/2/planBid.html";
	});
	$(".sbmoreImg").on("click", function() {
		window.location.href = "html/2/planBid.html?ss=1";
	});

	function listPlanBid() {
		var start = start;
		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
			type: "post",
			url: productListUrl,
			async: true,
			data: {
				platform: platform,
				pageIndex: "1",
				client:client
			},
			success: function(data) {
				data = jsonchange(data);
				//console.log("计划标列表");
				//console.log(data);
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
								'	<p  onclick="linkList(\'' + i + '\')">' +
								'		立即加入' +
								'	</p>' +
								'</div>';
							$(".bidPlan").append(ctc);
						}
					} else {
						var zwsj = '<p style="width:9.6rem;height:1.5rem;line-height:1.5rem;" class="zwsj am-animation-fade">暂无数据</p>';
						$(".bidPlan").append(zwsj);
					}
				} else if(data.code == "P-1011" || data.code == "user_not_login") {
					layer.msg(data.msg);exitLogin();
					setTimeout(function() {
						window.location.href = "html/1LoginRegister/login.html";
					}, 1500);

				} else {
					layer.msg(data.msg);
				}
			}
		})
	};

	listPlanBid();

	/*首页用户注册数据*/
	function getStatis() {
		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
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
				//console.log(data);
				if(data.code == "success") {
					var info = data.model.homestatic;
//					if(info.amount > 10000) {
//						$(".ljjy").html(formatNum(info.amount / 10000) + "万元");
//					} else {
//						$(".ljjy").html(formatNum(info.amount) + "元");
//					};

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
								'		<span></span>' +
								'		<span></span>' +
								'		<span>' + articleInfo[i].createTime.split(" ")[0] + '</span>' +
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
					if(bannerlen <= 1) {
						var swiper1 = new Swiper('.s1', {
							pagination: '.swiper-pagination',
							nextButton: '.swiper-button-next',
							prevButton: '.swiper-button-prev',
							slidesPerView: 1,
							paginationClickable: false,
							loop: false,
							autoplayDisableOnInteraction: false
						});
					} else {
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
					}

				} else if(data.code == "P-1011" || data.code == "user_not_login") {
					layer.msg(data.msg);exitLogin();
					setTimeout(function() {
						window.location.href = "html/1LoginRegister/login.html";
					}, 1500);

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
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
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
				//console.log("首页列表");
				//console.log(data);
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

							//							$(".StandardDiv").append(bidStandard);

							//							ProgessAnimate("pp" + i, "bb" + i, 0.6);
						}
					} else {
						var zwsj = '<p style="width:9.6rem;height:1.5rem;line-height:1.5rem;" class="zwsj am-animation-fade">暂无数据</p>';
						//						$(".StandardDiv").append(zwsj);
					}

				} else if(data.code == "P-1011" || data.code == "user_not_login") {
					layer.msg(data.msg);exitLogin();
					setTimeout(function() {
						window.location.href = "html/1LoginRegister/login.html";
					}, 1500);

				} else {
					layer.msg(data.msg);
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
	var linkType = parseInt(linkType);
	window.location.href = "html/2/planBid.html?linkType=" + linkType + "";
};