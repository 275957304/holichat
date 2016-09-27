'use strict';
const urlBase = "http://121.41.0.124:81/";
const API = {
	//系统
	"sys_info"       : urlBase + "sys/api/info?",
	"get_sts_auth"   : urlBase + "sys/api/sts_auth?",             //name: 获取sts授权， type: Post, params: mark=RES_UPLOADS

	//登录
	"login"          : urlBase + "login/api/login",
	"check_session"  : urlBase + "login/api/check_session?",
	"re_session"     : urlBase + "login/api/re_session?",
	"other_login"    : urlBase + "login/sdk/other_login?",   //第三方登录
	"wx_access_token": urlBase + "login/sdk/wx_access_token?", //name:獲取微信令牌  type: Get params: source=mp code= grant_type=
	"check_logined"  : urlBase + "login/api/check_logined?",  //活跃统计

	//广告
	"get_holichat_banner":    urlBase + "ad/api/ad_holichat_banner?",     //name: 活力圈广告
	"get_community_banner":   urlBase + "ad/api/ad_community_banner?",     //name: 圈子广告
	'get_community_home_ad':  urlBase + 'ad/api/ad_home?',               //name:社团宣传图
}
//export default apis;

export default API
