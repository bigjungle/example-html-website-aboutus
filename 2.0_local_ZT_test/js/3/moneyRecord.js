$(function() {
	var mobile = sessionStorage.getItem("mobile");
	$(".headerSelect div").eq(0).addClass("accountDivBtn");
	$(".asLeft p>a").eq(3).css({
		'color': "#ff8000"
	});

	var type = 0;
	$(".recordListSelectBtn>span").on("click", function() {
		var index = $('.recordListSelectBtn>span').index($(this));
		$('.recordListSelectBtn>span').removeClass("higLineShort");
		$(this).addClass("higLineShort");
		type = $(this).find("i").html();
		console.log(index);
		switch(index) {
			case 0:
				moneyRecord(0, 0);
				setNewPageNum();
				break;
			case 1:
				moneyRecord(1, 0);
				setNewPageNum();
				break;
			case 2:
				moneyRecord(2, 0);
				setNewPageNum();
				break;
			case 3:
				moneyRecord(3, 0);
				setNewPageNum();
				break;
			case 4:
				moneyRecord(4, 0);
				setNewPageNum();
				break;
			case 5:
				moneyRecord(5, 0);
				setNewPageNum();
				break;
			case 6:
				moneyRecord(6, 0);
				setNewPageNum();
				break;
			case 7:
				moneyRecord(7, 0);
				setNewPageNum();
				break;
			case 8:
				moneyRecord(8, 0);
				setNewPageNum();
				break;
			default:
				break;
		}

	});

	var data = searchUserStatus();
	if(data.code == "success") {

		moneyRecord(0, 0);
		loadPage();
		setNewPageNum();

	} else {
		window.location.href = loginUrl;
		layer.msg(data.msg);
	}

	function setNewPageNum() {
		setTimeout(function() {
			$('.pageTest').setLength(totalPageNum);
		}, 1500)
	}
	var totalPageNum;

	function moneyRecord(type, num) {
		var type = type;
		var num = num;
		$.ajax({
			type: "post",
			url: transactionRecordUrl,
			async: true,
			data: {
				phoneNum: mobile,
				platform: platform,
				client: client,
				pageIndex: num,
				type: type,
			},
			success: function(data) {
				data = jsonchange(data);
				console.log("交易记录");
				console.log(data);
				if(data.code == "success") {
					var info = data.model.dataList;
					var len = info.length;
					totalPageNum = Math.ceil(data.model.total / 10);
					$(".buyPlanBid0").html("");
					if(len > 0) {
						for(var i = 0; i < len; i++) {
							var val;
							if(info[i].transactionType=="1"){
								val='<i style="color:rgb(255, 83, 93);">+'+formatNum(info[i].transactionAmount)+'</i>';
							}else if(info[i].transactionType=="2"){
								val='<i style="color:rgb(0, 123, 23);">-'+formatNum(info[i].transactionAmount)+'</i>';
							}else{
								val='<i style="color:rgb(55,136,248);">'+formatNum(info[i].transactionAmount)+'</i>';
							}
							
							var ctc = '<p class="mrspan am-animation-fade">' +
								'	<span>' + info[i].transactionDate + ' </span>' +
								'	<span><i style="color:#ff8000;">' + info[i].transactionName + '</i>&nbsp;|&nbsp;' + info[i].accountOrgOrderNo + '</span>' +
								'	<span>' +val+ '</span>' +
								'	<span>' + formatNum(info[i].availabelAmount) + '</span>' +
								'</p>';
							$(".buyPlanBid0").append(ctc);
							$(".ListPage").show();
						}

					} else {
						var zwsj = '<p style="margin-top:1.2rem;" class="zwsj am-animation-fade">暂无数据</p>';
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

	function loadPage() {
		setTimeout(function() {
			$(".pageTest").html("");
			//console.log(totalPageNum);
			$('.pageTest').page({
				leng: totalPageNum, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					//console.log(page);
					moneyRecord(type, page);
				}
			});
		}, 800)
	};

	function setNewPageNum() {
		setTimeout(function() {
			$('.pageTest').setLength(totalPageNum);
		}, 1500)
	}
})