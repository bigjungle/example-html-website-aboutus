/**
 *全局变量&公共函数*
 * */
//默认后台请求地址

//默认后台请求PC端固定参数
//倒计时60秒

//document.title = '中赢金融';
var severPhone = "400-088-0888";
var CountdownNumber = 60;
//ajax传参json化
function jsonchange(data) {
	var dataObjiect
	if(typeof(data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) {
		dataObjiect = data;
	} else {
		dataObjiect = jQuery.parseJSON(data);
	}
	return dataObjiect;
}
/* 手机号码输入框   数字限制   中间空格 */

$(function() {
	$(".password").on("keyup", function() {
		if(this.value.length > 20) {
			this.value = this.value.slice(0, 20).replace(/\s/g, "");
		}
	});
	$(".phone").onlyNum();
	$(".vcode").onlyNum();
	//手机
	$(".phone").formatInput({
		formatArr: [3, 4, 4],
		delimiter: ' '
	});
	//银行卡号
	$(".bank_card").formatInput({
		formatArr: [4, 4, 4, 4, 4, 4]
	});
	//身份证号
	$(".ID_card").formatInput({
		formatArr: [3, 3, 4, 4, 4]
	});

	//身份证号
	$(".IdCard").formatInput({
		formatArr: [6, 4, 2, 2, 4],
		delimiter: ' '
	});

});
//手机号码输入 加空格   禁止粘贴
$.fn.onlyNum = function() {
	$(this).keypress(function(event) {
		var eventObj = event || e;
		var keyCode = eventObj.keyCode || eventObj.which;
		if((keyCode >= 48 && keyCode <= 57))
			return true;
		else
			return false;
	}).focus(function() {
		//禁用输入法
		this.style.imeMode = 'disabled';
	}).bind("paste", function() {
		//获取剪切板的内容
		var clipboard = window.clipboardData.getData("Text");
		if(/^\d+$/.test(clipboard))
			return true;
		else
			return false;
	});
};
//检验手机号码是否符合初步的验证规则
function checkPhone(value) {
	var Number = value.replace(/\s/g, "");
	var phone_num = Number;
	var reg = /^1\d{10}$/;
	if(!reg.test(phone_num)) {
		return "404";
	} else {
		return "200";
	};
}
//检验输入框是否为空
function inputIsNull(value) {
	var Number = $.trim(value);
	if(Number == "") {
		return "404";
	} else {
		return "200";
	}
}
//检验密码是否符合初步的验证规则
function checkPassword(value) {
	var phone_num = value;
	//var reg=/^[a-z0-9A-Z\-\/\:\;\(\)\$\&\@\"\.\,\?\!\'\[\]\{\}#\%\^\*\+\=_\\\|\~\<\>\€\£\¥\•\-\/\：\；\（\）\¥\@\“\”\。\，\、\？\！\【\】\｛\｝\—\《\》\·]{6,20}$/;
	//var reg = /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[\-\/:;()$&@"\.,\?\!'\[\]#%\^\*\+=_\\\|~<>€£¥•：；（）¥@“”。，、？！【】｛｝—《》\·]+$)[\da-zA-Z\-\/:;()$&@"\.,\?\!'\[\]#%\^\*\+=_\\\|~<>€£¥•：；（）¥@“”。，、？！【】｛｝—《》\·]{6,16}$/;
	//数字 字母 和下划线
	var reg = /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^_+$)[\d|a-zA-Z|_]{6,12}$/;
	if(!reg.test(phone_num)) {
		return "404";
	} else {
		return "200";
	};
};
//检验登录密码是否符合初步的验证规则
function checkLoginPassword(value) {
	var phone_num = value;
	//数字 字母 和下划线
	var reg = /^[a-zA-Z0-9]{6,12}/;
	if(!reg.test(phone_num)) {
		return "404";
	} else {
		return "200";
	};
};

//检验用户名是否为中文
function checkUserName(value) {
	var UsaeName = value;
	//	var reg = /^[\u4E00-\u9FA5]+$/;
	var reg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
	if(!reg.test(UsaeName)) {
		return "404";
	} else {
		return "200";
	};
};
//检验手机号码是否符合初步的验证规则
function checkCodeNumber(value) {
	var Number = value.replace(/\s/g, "");
	var phone_num = Number;
	var reg = /\d{6}$/;
	if(!reg.test(phone_num)) {
		return "404";
	} else {
		return "200";
	};
}
//图片中验证规则
function checkImgCodeNumber(value) {
	var Number = value.replace(/\s/g, "");
	var phone_num = Number;
	var reg = /^[a-zA-Z0-9]{4}/;
	if(!reg.test(phone_num)) {
		return "404";
	} else {
		return "200";
	};
}
//验证码长度验证
function checkInvitateCode(value, length) {
	var phone_num = value;
	var arr = phone_num.split("");
	if(arr.length != parseInt(length)) {
		return "404";
	} else {
		return "200";
	}
};
//邀请码首字母验证
function checkCodeFirstWord(value) {
	var arr = value.split("");
	if(arr[0] == 'f' || arr[0] == 'F' || arr[0] == 'c' || arr[0] == 'C' || arr[0] == 's' || arr[0] == 'S' || arr[0] == 'x' || arr[0] == 'X') {
		return "200";
	} else {
		return "404";
	}
};
//邀请码正则验证
//^[XCSF](?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{7}
function checkCodeRule(value) {
	var strExp = /^[XCSF][a-zA-Z0-9]{7}/;
	if(strExp.test(value)) {
		return "200";
	} else {
		return "404";
	}
};
//验证新旧密码  是否一样
function checkNewPassword(value1, value2) {
	if(value1 === value2) {
		return "200";
	} else {
		return "404";
	}
};

function checkLength(value) {
	if(value.length < 2 || value.length > 10) {
		return "404";
	} else {
		return "200";
	}
};

function CheckAllNumber(value) {
	var reg = /\d{6}$/;
	if(!reg.test(value)) {
		return "404";
	} else {
		return "200";
	};
};
//手机号码中间空格函数
function phoneNumber(obj1, obj2) {
	var value = obj1.val();
	var value1 = value.replace(/\s/g, "");
	var value2 = value1.substr(0, 11);
	obj2.val(value1);
	var ccc = obj2.val();
	var arr = ccc.split("");
	var len = arr.length;
	var arr1 = [];
	for(var i = 0; i < len; i++) {
		if(i == 3 || i == 7) {
			arr[i] = " " + arr[i];
		}
		arr1.push(arr[i])
	}
	ccc = arr1.join("");
	obj2.val(ccc);
}
//光标移入到最后一位
function focusInput(inputName, value) {
	var timer = setInterval(function() {
		if(value == 1) {
			inputName.val("");
		}
		inputName.focus().val(inputName.val());
		clearInterval(timer);
	}, 2000)
};
//检验身份证规则
function checkIdCard(value) {
	var scCard = value;
	if(scCard.length != 0) {
		if(!checkCard(scCard)) {
			return "404";
		} else {
			return "200";
		}
	} else {
		return "404";
	}
};
//function checkidno(obj) {
var vcity = {
	11: "北京",
	12: "天津",
	13: "河北",
	14: "山西",
	15: "内蒙古",
	21: "辽宁",
	22: "吉林",
	23: "黑龙江",
	31: "上海",
	32: "江苏",
	33: "浙江",
	34: "安徽",
	35: "福建",
	36: "江西",
	37: "山东",
	41: "河南",
	42: "湖北",
	43: "湖南",
	44: "广东",
	45: "广西",
	46: "海南",
	50: "重庆",
	51: "四川",
	52: "贵州",
	53: "云南",
	54: "西藏",
	61: "陕西",
	62: "甘肃",
	63: "青海",
	64: "宁夏",
	65: "新疆",
	71: "台湾",
	81: "香港",
	82: "澳门",
	91: "国外"
};
checkCard = function(obj) {
	//			var card = $("#sc_card_type").val();
	//			//是否为空
	//			if(card === '') {
	//				return false;
	//			}
	//校验长度，类型

	var arr = obj.split("");
	var len = arr.length;
	var arr1 = [];
	for(var i = 0; i < len; i++) {
		if(arr[17] == "x") {
			arr[17] = "X";
		}
		arr1.push(arr[i]);
	}
	var cc = arr1.join("");
	obj = cc;

	if(isCardNo(obj) === false) {
		return false;
	}
	//检查省份
	if(checkProvince(obj) === false) {
		return false;
	}
	//校验生日
	if(checkBirthday(obj) === false) {
		return false;
	}
	//检验位的检测
	if(checkParity(obj) === false) {
		return false;
	}
	return true;
};
//检查号码是否符合规范，包括长度，类型
isCardNo = function(obj) {
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
	if(reg.test(obj) === false) {
		return false;
	}
	return true;
};
//取身份证前两位,校验省份
checkProvince = function(obj) {
	var province = obj.substr(0, 2);
	if(vcity[province] == undefined) {
		return false;
	}
	return true;
};
//检查生日是否正确
checkBirthday = function(obj) {
	var len = obj.length;
	//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
	if(len == '15') {
		var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
		var arr_data = obj.match(re_fifteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date('19' + year + '/' + month + '/' + day);
		return verifyBirthday('19' + year, month, day, birthday);
	}
	//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
	if(len == '18') {
		var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
		var arr_data = obj.match(re_eighteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date(year + '/' + month + '/' + day);
		return verifyBirthday(year, month, day, birthday);
	}
	return false;
};
//校验日期
verifyBirthday = function(year, month, day, birthday) {
	var now = new Date();
	var now_year = now.getFullYear();
	//年月日是否合理
	if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
		//判断年份的范围（3岁到100岁之间)
		var time = now_year - year;
		if(time >= 0 && time <= 130) {
			return true;
		}
		return false;
	}
	return false;
};
//校验位的检测
checkParity = function(obj) {
	//15位转18位
	obj = changeFivteenToEighteen(obj);
	var len = obj.length;
	if(len == '18') {
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		var cardTemp = 0,
			i, valnum;
		for(i = 0; i < 17; i++) {
			cardTemp += obj.substr(i, 1) * arrInt[i];
		}
		valnum = arrCh[cardTemp % 11];
		if(valnum == obj.substr(17, 1)) {
			return true;
		}
		return false;
	}
	return false;
};
//15位转18位身份证号
changeFivteenToEighteen = function(obj) {
	if(obj.length == '15') {
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		var cardTemp = 0,
			i;
		obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6);
		for(i = 0; i < 17; i++) {
			cardTemp += obj.substr(i, 1) * arrInt[i];
		}
		obj += arrCh[cardTemp % 11];
		return obj;
	}
	return obj;
};
//检验银行卡最小长度
function cheackBankCard(value) {
	if(value.length >= 16) {
		return "200";
	} else {
		return "404";
	}
}
//金额去掉首位的0
function delfirstNumber(value) {
	var arr = value.split("");
	var al = arr.length;
	var index = 0;
	for(var i = 0; i < al; i++) {
		if("0" != arr[i]) {
			index = i;
			break;
		}
	}
	var ss = value.substring(index, al);
	return ss;
}
//检验银行卡号是否为数字
function checkBankcardNummber(value) {
	var val = value;
	var arr = val.split("");
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] >= 0 && arr[i] <= 9) {
			return "200";
		} else {
			return "404";
			break;

		}

	}
}
//检验最大金额
function checkmaxMoney(v1, v2) {
	if(v1 >= v2) {
		return "200";
	} else {
		return "404";
	}
}
/**
 * 输入框增加分隔符插件

 */
(function($) {

	/**
	 * 获取光标位置
	 * @param  {Dom} ctrl [要获取光标位置的dom对象]
	 * @return {Number}      [返回光标的位置]
	 */
	function getCursortPosition(ctrl) { //获取光标位置函数
		var CaretPos = 0;
		if(document.selection) {
			ctrl.focus();
			var Sel = document.selection.createRange();
			Sel.moveStart('character', -ctrl.value.length);
			CaretPos = Sel.text.length;
		}
		// Firefox support
		else if(ctrl.selectionStart || ctrl.selectionStart == '0')
			CaretPos = ctrl.selectionStart;
		return(CaretPos);
	}

	/**
	 * 设置光标位置
	 * @param {Dom对象} ctrl [要设置光标位置的dom对象]
	 * @param {number} pos  [位置]
	 */
	function setCaretPosition(ctrl, pos) {
		if(ctrl.setSelectionRange) {
			ctrl.focus();
			ctrl.setSelectionRange(pos, pos);
		} else if(ctrl.createTextRange) {
			var range = ctrl.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}

	/**
	 * 将一个输入框设置为有分隔符的输入框
	 * @param  {Object} optionsTemp [{formatArr: 必填，格式化数组，比如手机号：[3,4,4] 表示第三个字符后有分隔符，再之后4个字符有分隔符,然后以此类推
	 *                              	delimiter: 可空，分隔符，默认为一个空格‘ ’，推荐使用一个字符的分隔符，多个字符的分隔符有bug
	 *                              	maxLength: 可空，最大长度，为空则自动计算
	 *                              	valChange: 可空，内容改变事件，function(formatValue, value) formatValue:格式化之后的字符串，value:格式化之前的字符串}]
	 */
	$.fn.formatInput = function(optionsTemp) {
		var options = {
			formatArr: [],
			delimiter: ' ',
			maxLength: 0,
			valChange: null,
			input: null,
			init: function(input) {
				this.input = input;
				//计算最大长度
				if(!this.maxLength) {
					for(var i = 0; i < this.formatArr.length; i++) {
						var value = this.formatArr[i];
						this.maxLength += value;
					}
					this.maxLength += this.delimiter.length * (this.formatArr.length - 1);
				}
				var _this = this;
				input
					//设置文本框最大长度
					.attr("maxlength", this.maxLength)
					//设置按键放开事件
					.keyup(function() {
						var val = input.val();
						//没变化则不进行任何操作
						if(val == input.data("oldValue")) {
							return val;
						}
						var position = getCursortPosition(this);
						var tempVal = val.substr(0, position);
						var offset = _this.format(tempVal).length - tempVal.length;
						input.val(_this.format(val))
							.data("oldValue", val);
						//还原光标位置
						setCaretPosition(this, position + offset);
						//内容被修改的回调
						if(_this.valChange) {
							_this.valChange.apply(input, [input.val(), _this.getValue()]);
						}
					}).keyup();
			},
			//获取格式化之前的的内容
			getValue: function() {
				var reg = new RegExp(this.delimiter, "g");
				var val = this.input.val().replace(reg, '');
				this.input.data("value", val);
				return val;
			},
			//将指定字符格式化
			format: function(val) {
				if(val) {
					val = val.replace(new RegExp(this.delimiter, "g"), '');
				} else {
					val = this.getValue();
				}
				var length = 0;
				var newVal = '';
				//根据formatArr数组对字符串进行处理
				for(var i = 0; i < this.formatArr.length; i++) {
					var value = this.formatArr[i];
					if(length < val.length) {
						if(value + length <= val.length) {
							newVal += val.substr(length, value);
							if(i != this.formatArr.length - 1 && value + length != val.length) {
								newVal += this.delimiter;
							}
						} else {
							newVal += val.substr(length);
						}
						length += value;
					}
				}

				return newVal;
			}
		}
		$("input").blur();
		options = $.extend(options, optionsTemp);
		options.init($(this));
		return options;

	}
})(jQuery)
// JavaScript Document

//去除中间空格的函数**********************************************
function centerTrim(value) {
	return value.replace(/\s/g, "");

}
/**客服电话**/
serviceTel = '18221263640';
$(".help_service").html(serviceTel);
/**第七板块红包页**/
var redBagHeight = document.documentElement.clientHeight || document.body.clientHeight;
$(".redBagBj").css({
	"min-height": redBagHeight
});
//根据弹出框文字的多少  判断弹出框的宽度
function bouncedWidth(className) {
	var value = className.text();
	var arr = value.split("");
	var len = arr.length;
	if(len = 0) {
		className.parents("#content").hide();
	} else if(len > 0 && len <= 9) {
		className.parent(".bounced").css({
			"maxWidth": 2.7 + "rem",
		});
	} else if(len > 9 && len <= 12) {
		className.parent(".bounced").css({
			"maxWidth": 3.6 + "rem",
		});
	} else {
		className.parent(".bounced").css({
			"maxWidth": 4.2 + "rem",
		});
	}
}
//*********************弹框函数（幸福钱庄）*******************************
//type:
//类型   1     黑色框

//msg:
//弹出框提示文字
//url
//跳转地址
//creat(输入框类型，错误信息,url)
//弹出框创建函数
function creat(type, msg, url) {
	switch(parseInt(type)) {
		case 1:
			var ctc = '<center>' +
				'<div class="bounced">' +
				'<div class="valueLength"></div>' +
				'</div>' +
				'</center>';
			//$(".box").addClass("boxPosition");
			$("#content").html("");
			$("#content").append(ctc);
			$(".valueLength").html(msg);
			$(".white").show();
			$("#content").show();
			if(url != "") {
				setTimeout(function() {
					//					$(".box").removeClass("boxPosition");
					$(".white").hide();
					$("#content").hide();
					window.location.href = url;
				}, 2000);
			} else {
				setTimeout(function() {
					//  				alert("要消失了")
					//					$(".box").removeClass("boxPosition");
					$(".white").hide();
					$("#content").hide();
				}, 2000);
			};
			bouncedWidth($(".valueLength"));
			break;
		default:
			break;
	}
}

function lading() {
	var ctc = ' <div class="loading">' +
		' 	<img src="../../image/1LoginRegister/timg.gif"/>' +
		'</div>';
}
//跳转弹层
function linkTips(type, message, linkw, url1, url2) {
	switch(parseInt(type)) {
		case 1:
			var ctc = '<img src="../../image/5RechargeWithdraw/banner_rename@2x.png"/>' +
				'<div class="LinkTipsW">' +
				'	<p class="LinkTipsWtitle">温馨提示:</p>' +
				'	<p class="LinkTipsW1"></p>' +
				'</div>' +
				'<div class="LinkTipsButton">' +
				'	<span class="LinkTipsButtonL">我知道了</span>' +
				'	<span class="LinkTipsButtonR"></span>' +
				'</div>';
			$(".LinkTips").html("");
			$(".LinkTips").append(ctc);
			$(".LinkTipsW1").html(message);
			$(".LinkTipsButtonR").html(linkw);
			$(".black1").show();
			$(".LinkTips").show();
			$(".LinkTipsButtonL").on("click", function() {

				if(url2 != null) {
					$(".black1").hide();
					$(".LinkTips").hide();
					window.location.href = url2;
				} else {
					$(".black1").hide();
					$(".LinkTips").hide();
				}
			});
			$(".LinkTipsButtonR").on("click", function() {

				if(url1 != null) {
					$(".black1").hide();
					$(".LinkTips").hide();
					window.location.href = url1;
				} else {
					$(".black1").hide();
					$(".LinkTips").hide();
				}
			});
			break;
		default:
			break;
	}
};
//点击返回上一个页面      幸福钱庄
$(".return").on("click", function() {
	history.back();
});

//购买金额数值判断
function checkInputAmount(value1, value2) {
	var val1 = value1;
	var val2 = value2;
	if(val1 % val2 == 0) {
		return "200";
	} else {

		return " 404"
	}
};
//姓名处理
function NameHidden(value) {
	if(value == "" || value == null || value == undefined) {
		return "***";
	} else {
		var arr = value.split("");
		var arr1 = [];
		arr1[0] = arr[0];
		arr1[1] = "*";
		arr1[2] = "*";
		var newName = arr1.join("");
		return newName;
	}
}
//手机号码处理
function PhoneNumber(value) {
	var arr = value.split("");
	for(var i = 3; i < arr.length - 4; i++) {
		arr[i] = "*";
	}
	var newPhone = arr.join("");
	return newPhone;
}
//身份证处理
function IDcardNumber(value) {
	var arr = value.split("");
	for(var i = 5; i < arr.length - 4; i++) {
		arr[i] = "*";
	}
	var IDcardNumber = arr.join("");
	return IDcardNumber;
};
//银行卡处理
function BankNumber(value) {
	var arr = value.split("");
	for(var i = 4; i < arr.length - 4; i++) {
		arr[i] = "*";
	}
	var BankNumber = arr.join("");
	return BankNumber;
};
//时间解析
function dateFormat(dat, fmt) { //author: meizz

	var o = {
		"M+": dat.getMonth() + 1, //月份
		"d+": dat.getDate(), //日
		"h+": dat.getHours(), //小时
		"m+": dat.getMinutes(), //分
		"s+": dat.getSeconds(), //秒
		"q+": Math.floor((dat.getMonth() + 3) / 3), //季度
		"S": dat.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (dat.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
//调用方法   dateFormat(new Date(data.model.startInverstTime * 1000), 'yyyy-MM-dd')；
//金额 三位加逗号
function formatNum(value) {
	var str;
	if(value == null || value == undefined || value == "") {
		str = "0";
	} else {
		str = value.toString();
	}

	var newStr = "";
	var count = 0;

	if(str.indexOf(".") == -1) {
		for(var i = str.length - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr;
			}
			count++;
		}
		str = newStr + ".00"; //自动补小数点后两位
		return str;
	} else {
		for(var i = str.indexOf(".") - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr; //逐个字符相接起来
			}
			count++;
		}
		str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
		return str;
	}
};
//解析链接带入页码
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
/**
 *共用接口 *
 * */
//验证码图片接口
//var ajax_picCode = function(img,imgId) {
//	$.ajax({
//		type: "get",
//		url: GetImageCode,
//		data: JSON.stringify({
//			platform: 'haolyy',
//			client: 'PC'
//		}),
//		contentType: 'application/json;chart=UTF-8',
//		dataType: 'json',
//		success: function(data) {
//			var data = jsonchange(data);
//			var picCodeUrl = serverPath +data.response.result.image_url+ "?image_id=" + data.response.result.image_id;
//			img.attr("src", picCodeUrl);
//			imgId.val(data.response.result.pic_verify_id);
//		}
//	});
//};