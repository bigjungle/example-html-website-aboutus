$(function() {
	sessionStorage.setItem("urlFrom", "1");
	$(".messageReturn").on("click", function() {
		history.back()
	});
	var hh1 = document.documentElement.clientWidth;
	var hh2 = $(".nYbg").width();
	var hh3 = (hh2 - hh1) / 2;
	setTimeout(function() {
		window.scrollTo(hh3, 0);
		$(".footer").css({
			width: hh2 + "px"
		});
		$(".header").css({
			width: hh2 + "px"
		});
	}, 700);

	var height = $(".nYbg").height();

	$(".toTop1").on("click", function() {
		var $w = $(window);
		$w.smoothScroll({
			position: (1650 / 5227) * height
		});
	});
	$('.toTop2').on('click', function() {
		var $w = $(window);
		$w.smoothScroll({
			position: (2300 / 5227) * height
		});
	});
	$('.toTop3').on('click', function() {
		var $w = $(window);
		$w.smoothScroll({
			position: (3052 / 5227) * height
		});
	});
	$('.toTop4').on('click', function() {
		var $w = $(window);
		$w.smoothScroll({
			position: (3800 / 5227) * height
		});
	});

	$('.toTop').on('click', function() {
		var $w = $(window);
		$w.smoothScroll({
			position: 0
		});
	});

	//		$('.jxBtnNext1').on("click", function() {
	//			window.location.href = "../../html/2/planBid.html";
	//		});

	$('.jxBtnNext1').on("click", function() {
		window.location.href = "../../html/2/planBid.html?linkType=3";
	});

	$('.jxBtnNext2').on("click", function() {
		window.location.href = "../../html/2/planBid.html?linkType=5";
	});

	$('.jxBtnNext3').on("click", function() {
		window.location.href = "../../html/2/planBid.html?linkType=2";
	});

	$('.cxBtn').on("click", function() {
		window.location.href = "../../html/2/planBid.html?linkType=5";
	});

	var loginStatus = sessionStorage.getItem("loginStatus");

	var mobile = sessionStorage.getItem("mobile");

	console.log(loginStatus);

	/*用户获取卡券*/
	function getNewYearCard(couponNo) {
		var couponNo = couponNo;
		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
			type: "post",
			url: newYeaCard,
			async: true,
			data: {
				client: client,
				phoneNum: mobile,
				couponNo: couponNo
			},
			success: function(data) {
				data = jsonchange(data);
				console.log(data);
				if(data.code == "success") {
					layer.msg(data.msg);
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
	};

	/*检验登录状态,领取卡券*/
	function checkLoginStatue(className, couponNo) {
		var className = className;
		var couponNo = couponNo;
		className.on("click", function() {

			if(loginStatus == "1") {

				getNewYearCard(couponNo);

			} else {
				layer.msg('请先登录');
				window.location.href = "../../html/1LoginRegister/login.html";
				sessionStorage.setItem("urlFrom", "2");
			}
		});

	}

	checkLoginStatue($(".fxBtnNext1"), "FXQ_ZZT_20180124_01");
	checkLoginStatue($(".fxBtnNext2"), "FXQ_ZZT_20180124_02");
	checkLoginStatue($(".fxBtnNext3"), "FXQ_ZZT_20180124_03");
	checkLoginStatue($(".fxBtnNext4"), "FXQ_ZZT_20180124_04");
	newYearRanking("2018-1-26 00:00:00", "2018-3-2 23:59:59");

	function newYearRanking(startDate, endDate) {
		var startDate = startDate;
		var endDate = endDate;
		$.ajax({
			type: "post",
			url: ranking,
			async: true,
			data: {
				startDate: startDate,
				endDate: endDate
			},
			success: function(data) {
				data = jsonchange(data);
				console.log(data);
				if(data.code == "success") {
					var len = data.model.length;

					if(len > 0) {

						for(var i = 0; i < 5; i++) {
							if(data.model[i].phoneNum != null || data.model[i].phoneNum != "") {
								$(".pmMobile" + i).html(data.model[i].phoneNum);
							} else {
								$(".pmMobile" + i).html("暂无数据");
							}
						}
					} else {
						$(".pmMobile").html("暂无数据");
					}

				} else {
					$(".pmMobile").html("暂无数据");
				}
			}
		});

	}

})