/********************************************************************************************************************/
var newUrl = "http://192.168.7.223:8080/v1/api/";
var returnUrl = "http://zzt-test.chinazyjr.net/";
var returnUrlHL = returnUrl + "html/1LoginRegister/login.html";
var testType = "1"; /*1.测试数据 2.生产数据*/












var loginStatus;
var client = "1";
var platform = "ZZT";
var version = "1.0.0";
var userType = "1";
var loginUrl = "../../html/1LoginRegister/login.html";
/*图片验证码地址*/
var GetImageCodeUrl = newUrl + "common/getValidateImage";

/*获取Token*/
var GetTokenLink = newUrl + "common/getToken";

/* 发送短信验证码*/
var sendCodeMessageUrl = newUrl + "common/getSmsCode";

/* 注册*/
var Register = newUrl + "user/register";

/*登录*/
var Login = newUrl + "user/login";

/*忘记密码*/
var ForgetPassword = newUrl + "user/forgetPassWord";

/*注销*/
var outLoginUrl = newUrl + "user/logout";

/*首页信息*/
var indexMessageUrl = newUrl + "homePage/homePageBannerArticle";

/*首页列表*/
var indexListUrl = newUrl + "homePage/homePageBorrowList";

/*用户信息*/
var UserStatusUrl = newUrl + "common/getUserStatus";

/*账户余额*/
var useraccountUrl = newUrl + "useraccount/homePage";
/*开户发短信*/
var openSmsUrl = newUrl + "account/sendSmsCode";

/*开户*/
var openAccountUrl = newUrl + "account/openAccount";

/*开户成功查询*/
var checkOpenAccountUrl = newUrl + "account/checkOpenAccount";

/*激活*/
var toBosAcctActivateUrl = newUrl + "user/bosAcctActivate";
/*银行卡信息*/
var bankCardMessageUrl = newUrl + "recharge/queryBeforeRecharge";

/**充值*/
var rechargeUrl = newUrl + "recharge/confirmRecharge";

/*充值限额*/
var bankRchargeLimitUrl = newUrl + "recharge/queryBeforeRecharge";

/**提现*/
var toCashUrl = newUrl + "usertrade/userCash";

/*提现手续费*/
var userCashFeeUrl = newUrl + "usertrade/userCashFee";

/*提现回调*/
var CashInfoUrl = newUrl + "usertrade/isWithdrawSuccess";

/*提现回调*/
var CashInfoUrl = newUrl + "usertrade/isWithdrawSuccess";

/*是否激活*/
var isBosAcctActivateUrl = newUrl + "user/isBosAcctActivate"

/*银行卡信息*/
var cardInfoUrl = newUrl + "userQuery/queryCardInfo";

/*用户信息查询接口*/
var userInfoUrl = newUrl + "userQuery/queryCardInfo";

/*修改登录密码*/
var changeLoginPasswordUrl = newUrl + "user/changePassword";

/*自动投标*/
var autoTenderUrl = newUrl + "userManage/autoTenderPlan";

/*自动复投状态*/
var autoTenderStatusUrl = newUrl + "userManage/queryTenderPlan";

/*换绑卡*/
var changeCardUrl = newUrl + "account/quickBinding";

/*产品列表页*/
var ListUrl = newUrl + "product/standardAndPlanList";

/*计划标产品标题*/
var productListUrl = newUrl + "product/productList";

/*出借标的详情*/
var queryDetails = newUrl + "product/productDetail";

/*借款人信息*/
var queryBidTabUrl = newUrl + "product/fromBorrowUserDetail";

/*散标购标记录*/
var queryInvestListUrl = newUrl + "/product/investRecord";

/*散标还款计划*/
var payPlanUrl = newUrl + "product/getReturn";

/*购买*/
var buyBidUrl = newUrl + "invest/borrowInvest";

/*收益计算*/
var ExpectedRevenueUrl = newUrl + "invest/getExpectedRevenue";

/*购买记录*/
var productManageUrl = newUrl + "useraccount/productManage";

/*交易记录*/
var transactionRecordUrl = newUrl + "useraccount/transactionRecord";

/*账户中心卡券接口*/
var accountCouponUrl = newUrl + "coupon/accountCoupon";

/*购买页面卡券*/
var investCouponUrl = newUrl + "coupon/investCoupon";

/*提现卡券*/
var withDrawCouponUrl = newUrl + "coupon/withDrawCoupon";

/*电子签约*/
var DZQYUrl = newUrl + "signing/signingContract";

/*电子签约查询*/
var QYCCUrl = newUrl + "signing/querySigningStatus";

/*电子合同*/
var DZHTUrl = newUrl + "signing/downloadSigningContract";

/*信息披露运营数据接口*/
var platformConstantlyUrl = newUrl + "infoDisClosed/platformConstantly";

/*调阅详情-当前持有债券*/
var dqDebtBillsUrl = newUrl + "debt/cash/held";

/*资产配置历史*/
var zcpzAssetConfigLogUrl = newUrl + "debt/cash/match";

/*债权转让记录*/
var zqTransferRecordsUrl = newUrl + "debt/cash/transfer";

/*资金流水*/
var FundsAccountsUrl = newUrl + "debt/cash/fund/flow";

/*出借详情*/
var FundDetailsUrl = newUrl + "debt/invest/detail";

/*下载合同*/
var XZHTUrl = newUrl + "signing/downloadSigningContract";

/*预览合同*/
var YLHTUrl = newUrl + "signing/previewSigningContract";