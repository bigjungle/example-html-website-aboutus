/********************************************************************************************************************/
var commonUrl = "http://api-testgl.chinazyjr.net/";
var returnUrl = "http://zzt-testgl.chinazyjr.net/";
var returnUrlHL = returnUrl + "html/1LoginRegister/login.html";
var testType = "1"; /*1.测试数据 2.生产数据*/







var loginStatus;
var client = "1";
var platform = "ZZT";
var version = "1.0.0";
var userType = "1";
var loginUrl = "../../html/1LoginRegister/login.html";
/*图片验证码地址*/
var GetImageCodeUrl = commonUrl+ "v1/api/common/getValidateImage";

/*获取Token*/
var GetTokenLink = commonUrl+ "v1/api/common/getToken";

/* 发送短信验证码*/
var sendCodeMessageUrl = commonUrl+ "v1/api/common/getSmsCode";

/* 注册*/
var Register = commonUrl+ "v1/api/user/register";

/*登录*/
var Login = commonUrl+ "v1/api/user/login";

/*忘记密码*/
var ForgetPassword = commonUrl+ "v1/api/user/forgetPassWord";

/*注销*/
var outLoginUrl = commonUrl+ "v1/api/user/logout";

/*首页信息*/
var indexMessageUrl = commonUrl+ "v1/api/homePage/homePageBannerArticle";

/*首页列表*/
var indexListUrl = commonUrl+ "v1/api/homePage/homePageBorrowList";

/*用户信息*/
var UserStatusUrl = commonUrl+ "v1/api/common/getUserStatus";

/*账户余额*/
var useraccountUrl = commonUrl+ "v1/api/useraccount/homePage";
/*开户发短信*/
var openSmsUrl = commonUrl+ "v1/api/account/sendSmsCode";

/*开户*/
var openAccountUrl = commonUrl+ "v1/api/account/openAccount";

/*开户成功查询*/
var checkOpenAccountUrl = commonUrl+ "v1/api/account/checkOpenAccount";

/*激活*/
var toBosAcctActivateUrl = commonUrl+ "v1/api/user/bosAcctActivate";
/*银行卡信息*/
var bankCardMessageUrl = commonUrl+ "v1/api/recharge/queryBeforeRecharge";

/**充值*/
var rechargeUrl = commonUrl+ "v1/api/recharge/confirmRecharge";

/*充值限额*/
var bankRchargeLimitUrl = commonUrl+ "v1/api/recharge/queryBeforeRecharge";

/**提现*/
var toCashUrl = commonUrl+ "v1/api/usertrade/userCash";

/*提现手续费*/
var userCashFeeUrl = commonUrl+ "v1/api/usertrade/userCashFee";

/*提现回调*/
var CashInfoUrl = commonUrl+ "v1/api/usertrade/isWithdrawSuccess";

/*提现回调*/
var CashInfoUrl = commonUrl+ "v1/api/usertrade/isWithdrawSuccess";

/*是否激活*/
var isBosAcctActivateUrl = commonUrl+ "v1/api/user/isBosAcctActivate"

/*银行卡信息*/
var cardInfoUrl = commonUrl+ "v1/api/userQuery/queryCardInfo";

/*用户信息查询接口*/
var userInfoUrl = commonUrl+ "v1/api/userQuery/queryCardInfo";

/*修改登录密码*/
var changeLoginPasswordUrl = commonUrl+ "v1/api/user/changePassword";

/*自动投标*/
var autoTenderUrl = commonUrl+ "v1/api/userManage/autoTenderPlan";

/*自动复投状态*/
var autoTenderStatusUrl = commonUrl+ "v1/api/userManage/queryTenderPlan";

/*换绑卡*/
var changeCardUrl = commonUrl+ "v1/api/account/quickBinding";

/*产品列表页*/
var ListUrl = commonUrl+ "v1/api/product/standardAndPlanList";

/*计划标产品标题*/
var productListUrl = commonUrl+ "v1/api/product/productList";

/*出借标的详情*/
var queryDetails = commonUrl+ "v1/api/product/productDetail";

/*借款人信息*/
var queryBidTabUrl = commonUrl+ "v1/api/product/fromBorrowUserDetail";

/*散标购标记录*/
var queryInvestListUrl = commonUrl+ "v1/api//product/investRecord";

/*散标还款计划*/
var payPlanUrl = commonUrl+ "v1/api/product/getReturn";

/*购买*/
var buyBidUrl = commonUrl+ "v1/api/invest/borrowInvest";

/*收益计算*/
var ExpectedRevenueUrl = commonUrl+ "v1/api/invest/getExpectedRevenue";

/*购买记录*/
var productManageUrl = commonUrl+ "v1/api/useraccount/productManage";

/*交易记录*/
var transactionRecordUrl = commonUrl+ "v1/api/useraccount/transactionRecord";

/*账户中心卡券接口*/
var accountCouponUrl = commonUrl+ "v1/api/coupon/accountCoupon";

/*购买页面卡券*/
var investCouponUrl = commonUrl+ "v1/api/coupon/investCoupon";

/*提现卡券*/
var withDrawCouponUrl = commonUrl+ "v1/api/coupon/withDrawCoupon";

/*电子签约*/
var DZQYUrl = commonUrl+ "v1/api/signing/signingContract";

/*电子签约查询*/
var QYCCUrl = commonUrl+ "v1/api/signing/querySigningStatus";

/*电子合同*/
var DZHTUrl = commonUrl+ "v1/api/signing/downloadSigningContract";

/*信息披露运营数据接口*/
var platformConstantlyUrl = commonUrl+ "v1/api/infoDisClosed/platformConstantly";

/*调阅详情-当前持有债券*/
var dqDebtBillsUrl = commonUrl+ "v1/api/debt/cash/held";

/*资产配置历史*/
var zcpzAssetConfigLogUrl = commonUrl+ "v1/api/debt/cash/match";

/*债权转让记录*/
var zqTransferRecordsUrl = commonUrl+ "v1/api/debt/cash/transfer";

/*资金流水*/
var FundsAccountsUrl = commonUrl+ "v1/api/debt/cash/fund/flow";

/*出借详情*/
var FundDetailsUrl = commonUrl+ "v1/api/debt/invest/detail";

/*下载合同*/
var XZHTUrl = commonUrl+ "v1/api/signing/downloadSigningContract";

/*预览合同*/
var YLHTUrl = commonUrl+ "v1/api/signing/previewSigningContract";

/*新年活动领取卡券*/
var newYeaCard=commonUrl+ "v1/api/coupon/getFrontCoupon";

/*新年排行榜*/
var ranking=commonUrl+"v1/api/invest/queryCashPARanking";

/*刷新Token*/
var refreshTokenUrl=commonUrl+"v1/api/user/token/refresh";

/*查询用户是否进行风险评测*/
var  getRiskRatingUrl=commonUrl+"v1/api/invest/getRiskRating";
