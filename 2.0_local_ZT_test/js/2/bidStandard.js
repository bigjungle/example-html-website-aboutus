
var totalPageNum;
var sanType = 1;//1个人 2企业
$(function() {
	$(".headerSelect span").eq(1).addClass("higLine");
	// 进页面
	$('.bidSelectP>span').removeClass("higLineShort");
		$('.bidSelectP>span').eq(1).addClass("higLineShort");
		$(".planBidList").show();
		$(".bidSelectBtn0").show();
		listPlanBid();
		loadPage(1);
		setNewPageNum();
	
		$('.Lyuyuebiao').on("click", function() { //点击标的种类
			location.href='planBid.html'
		});

	

	/*散标列表*/
	function listQuery(num,type) {
		var num = num;
		$.ajax({
			headers: {
				"accessToken": sessionStorage.getItem("accessToken")
			},
			type: "post",
			url: ListUrl,
			async: false,
			data: {
				platform: platform,
				borrowType: "1",
				/*标的类型 1:散标 2:赢计划 3:赢计划*/
				pageIndex: num,
				client: client,
				/*标的类型 1:个人 2:企业 */
				scatteredBorrowKind:type
			},
			success: function(data) {
				data = jsonchange(data);
				//console.log("散标");
				//console.log(data);
				if(data.code == "success") {

					$(".planBidListdiv").html("");
					totalPageNum = Math.ceil(data.model.allCount / 10);
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
							} else if(info[i].status == 5) {
								Text = "已售罄";
								className = "planBidButtonGray";
							} else if(info[i].status == 7 || info[i].status == 6) {
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
								'					<span class="higProgress bb' + i + '"></span>' +
								'					<span class="lowProgress"></span>' +
								'				</p>' +
								'				<p class="ProgressNum pp' + i + '">' + per + '%</p>' +
								'			</div>' +
								'		</div>' +
								'		<div class="planBidMessageDiv2">' +
								'			<div>历史借贷年利率</div>' +
								'			<div>出借期限</div>' +
								'			<div>计划金额</div>' +
								'			<div>投资进度</div>' +
								'		</div>' +
								'	</div>' +
								'	<div class="planBidButton  ' + className + '" onclick="linkNextHtml1(\'' + info[i].borrowNo + '\',2)">' +
								Text +
								'	</div>' +
								'</div>';
							$(".planBidListdiv").append(ctc);
							$(".ListPage").show();
							ProgessAnimate("pp" + i, "bb" + i, 0.9);
							$(".planBidList").show();
						}

					} else {
						$(".planBidList").show();
						var zwsj = '<p style="width:9.6rem;height:3.0rem;line-height:3.0rem;" class="zwsj">暂无数据</p>';
						$(".planBidListdiv").append(zwsj);
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

	function ProgessAnimate(className1, className2, length) {
		var bluePLength = parseInt($("." + className1).html());
		var length = length;

		$("." + className2).animate({
			width: bluePLength * length / 100 + "rem"
		}, 1000)
	};

	function loadPage() {
		setTimeout(function() {
			$('.pageTest').page({
				leng: totalPageNum, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					//console.log(page);
					listQuery(page,sanType);
				}
			});
		}, 1000)
	};

	function setNewPageNum() {
		 setTimeout(function() {
			$('.pageTest').setLength(totalPageNum);
		 }, 1000)
	}
	/*列表*/
function listPlanBid() {
	$.ajax({
		headers: {
			"accessToken": sessionStorage.getItem("accessToken")
		},
		type: "post",
		url: commonUrl + "/v1/api/product/getEnterpriseBorrowType",
		async: false,
		data: {

		},
		success: function(data) {
			data = jsonchange(data);
			// console.log("列表");
			// console.log(data);
			if(data.code == "success") {
				var info = data.model;
				var len = info.length;
				$(".bidSelectBtn0").html(""); 
				var textcc = '标的种类';
				$(".bidSelectBtn0").append(textcc);
				if(len > 0) {
					for(var i = 0; i < len; i++) {
						var ctc = '<span class="bidSelectBtnspan">' + info[i].name + '<i style="display:none;">' + info[i].value + '</i></span>';
						$(".bidSelectBtn0").append(ctc);
					}
					productName = $('.bidSelectBtn0').find("span").eq(0).html();
				} else {
					productName = "暂无产品";
				}
					bid_id = $('.bidSelectBtn0').find("span").eq(0).find("i").html();
					DQYid = $('.bidSelectBtn0').find("span").eq(0).find("i").html();
					$('.bidSelectBtn0').find("span").eq(0).addClass("higBGC");
					$(".tiltle").html("");
					var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>散标</span>> <span>' + productName + '</span>';
					$(".tiltle").append(ctc);
					sessionStorage.setItem("bidNam", productName);
				

				//点击
				$('.bidSelectBtn0>span').on("click", function() {
					var index = $('.bidSelectBtn0>span').index($(this));
					$('.bidSelectBtn0>span').removeClass("higBGC");
					$(this).addClass("higBGC");
					bid_id = $(this).find("i").html();
					var productName = $(this).html();
					$(".tiltle").html("");
					var ctc = '您所在的位置：<a href=""><span>首页</span></a>> <span>散标</span>> <span>' + productName + '</span>';
					$(".tiltle").append(ctc);
					sessionStorage.setItem("bidNam", productName);
					switch(index) {
						case 0:
						    sanType = 1;//个人
					     	listQuery(1,1);
							setNewPageNum();
							break;
						case 1:
						     sanType = 2;//公司
						     listQuery(1,2);
							 setNewPageNum();
							break;
						default:
							break;
					}
				});
				listQuery(1,1);

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
})

function linkNextHtml1(borrowNo, projectType) {
	var borrowNo = borrowNo;
	var projectType = projectType;
	////console.log(borrowId);
	sessionStorage.setItem("product_name", "散标出借");
	sessionStorage.setItem("firstName", "散标市场");
	sessionStorage.setItem("projectType", projectType);
	sessionStorage.setItem("borrowNo", borrowNo);
	window.location.href = "bidStandardDetial.html";
}
