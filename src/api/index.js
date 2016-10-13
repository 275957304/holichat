import Api from './api';
import { Tool } from '../utils/'

const uid = Tool.getItem('uid');
const session = Tool.getItem('session');
const device = '';
const baseURI = 'http://app.holichat.com/'
const imgBaseUrl = 'http://img.holichat.com/uploads/'
const api = new Api({
	baseURI: baseURI,
	headers: {'Accept': 'application/json'}
});

export default{
	//获取图片
	getImg : (url) => imgBaseUrl + url,
	//登录
	login : (formData) => api.post('login/api/login',formData),
	check_session: api.get('login/api/check_session',{'target_uid':uid,'save_session':session,'device':device}),

	//广告
	get_community_banner: api.get('ad/api/ad_community_banner',{'community_cid':1}),  //name: 社团首页广告位
	get_holichat_banner: api.get('ad/api/ad_holichat_banner'),   //name: 活力圈首页广告位

	//赛事
	get_competition_list :(parameter) => api.get('event/view/event_list',{parameter}),
	//"get_competition_list"         :this.urlBase + "event/view/event_list?",     //name: 获取赛事列表       type: Get  Params: community_cid=0 category_id=0 city_id=0 status= official=0 cost=0 page_size=10 page=1 event_type=0

	//专题
	get_topic_list: api.get('topic/view/topic_list'),  //name: 专题列表
}


/*
//const urlBase = "http://121.41.0.124:81/";
const urlBase = "http://app.holichat.com/";

export default{
	'imgURL'  :  "http://holichat-res-inside.img-cn-hangzhou.aliyuncs.com/uploads/",
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
	"get_community_banner":   urlBase + "ad/api/ad_community_banner",     //name: 圈子广告
	'get_community_home_ad':  urlBase + 'ad/api/ad_home?',               //name:社团宣传图
}
*/
