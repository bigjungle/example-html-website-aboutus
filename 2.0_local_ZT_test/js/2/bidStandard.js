$(function() {
	$(".headerSelect span").eq(2).addClass("higLine");

	//		$('.pageTest').page({
	//			leng: 10, //分页总数
	//			activeClass: 'activP', //active 类样式定义
	//			clickBack: function(page) {
	//				//console.log(page);
	//			}
	//		});
	var totalPageNum;
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
							} else if(info.status == 5) {
								Text = "已售罄";
								className = "planBidButtonGray";
							} else if(info.status == 7||info.status == 6) {
								Text = "计息中";
								className = "planBidButtonGray";
							} else {
								Text = "已结束";
								className = "planBidButtonGray";
							}
							var ctc = '<div class="planBidListDetial">' +
								'	<p class="planBidTiltle">' +
								'		<span>' + info[i].borrowName + '</span><span>短期项目 资金灵活</span>' +
								'	</p>' +
								'	<div class="planBidMessage">' +
								'		<div class="planBidMessageDiv">' +
								'			<div>' + info[i].annualizedRate.toFixed(2) + '<i>%</i></div>' +
								'			<div>' + info[i].periodLength + '' + timeArr[info[i].periodUnit] + '</div>' +
								'			<div>' + info[i].contractAmount + '</div>' +
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
	listQuery(1);
	loadPage();
	setNewPageNum();

	function loadPage() {
		setTimeout(function() {
			$('.pageTest').page({
				leng: totalPageNum, //分页总数
				activeClass: 'activP', //active 类样式定义
				clickBack: function(page) {
					//					//console.log(page);
					listQuery(page);
				}
			});
		}, 1000)
	};

	function setNewPageNum() {
		setTimeout(function() {
			$('.pageTest').setLength(totalPageNum);
		}, 3000)
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