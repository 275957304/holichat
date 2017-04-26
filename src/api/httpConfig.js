const data = {
    "get_phone_check_code": {
        "action": "sys/phone/get_phone_check_code",
        "method": "get"
    },
    "confirm_code": {
        "action": "sys/phone/confirm_code",
        "method": "get"
    },
    "get_sts_auth": {
        "action": "sys/api/sts_auth",
        "method": "get"
    },
    "sys_info": {
        "action": "sys/api/info",
        "method": "get"
    },
    "rsa_login": {
        "action": "login/api/rsa_login",
        "method": "post"
    },
    "re_session": {
        "action": "login/api/re_session",
        "method": "get"
    },
    "check_session": {
        "action": "login/api/check_session",
        "method": "get"
    },
    "login": {
        "action": "login/api/login",
        "method": "post"
    },
    "other_login": {
        "action": "login/sdk/other_login",
        "method": "post"
    },
    "phone_exists": {
        "action": "user/api/phone_exists",
        "method": "get"
    },
    "reg": {
        "action": "user/api/reg",
        "method": "post"
    },
    "reset_pwd": {
        "action": "user/api/reset_pwd",
        "method": "post"
    },
    "get_user_info": {
        "action": "user/api/user_info",
        "method": "get"
    },
    "get_target_user_info": {
        "action": "user/api/target_user_info",
        "method": "get"
    },
    "set_bind_phone": {
        "action": "user/api/bind_phone",
        "method": "get"
    },
    "edit_user_info": {
        "action": "user/api/user_edit",
        "method": "post"
    },
    "change_pwd": {
        "action": "user/api/change_pwd",
        "method": "post"
    },
    "user_sign_in": {
        "action": "user/api/user_sign_in",
        "method": "get"
    },
    "is_user_sign": {
        "action": "user/api/is_user_sign",
        "method": "get"
    },
    "bind_community_id": {
        "action": "user/api/invite_code",
        "method": "get"
    },
    "get_competition_category": {
        "action": "event/view/category",
        "method": "get"
    },
    "get_competition_list": {
        "action": "event/view/event_list",
        "method": "get"
    },
    "get_competition_details": {
        "action": "event/view/get_info",
        "method": "get"
    },
    "get_competition_introduction": {
        "action": "event/view/get_brief",
        "method": "get"
    },
    "get_competition_address": {
        "action": "event/view/get_address",
        "method": "get"
    },
    "get_competition_enroll_info": {
        "action": "event/view/get_enroll_info",
        "method": "get"
    },
    "get_enroll_pro_group_info": {
        "action": "event/view/event_pro_group_info",
        "method": "get"
    },
    "search_competition_list": {
        "action": "event/view/event_search",
        "method": "get"
    },
    "get_competition_result": {
        "action": "event/view/event_result",
        "method": "get"
    },
    "get_event_brief_array": {
        "action": "event/view/get_brief_array",
        "method": "post"
    },
    "competition_pay_confirm": {
        "action": "event/interface/event_pay_confirm",
        "method": "get"
    },
    "select_competition_enroll": {
        "action": "event/interface/event_enroll_select",
        "method": "post"
    },
    "get_eroll_order_info": {
        "action": "event/interface/event_order_info",
        "method": "get"
    },
    "event_project_check": {
        "action": "event/interface/event_project_check",
        "method": "get"
    },
    "event_can_enroll_check": {
        "action": "event/interface/event_can_enroll_check",
        "method": "get"
    },
    "check_competition_enroll": {
        "action": "event/interface/event_enroll_check",
        "method": "get"
    },
    "check_competition_sign": {
        "action": "event/interface/event_sign_check",
        "method": "get"
    },
    "competition_enroll": {
        "action": "event/interface/event_enroll",
        "method": "post"
    },
    "event_pay_check": {
        "action": "event/interface/event_pay_check",
        "method": "post"
    },
    "send_moment": {
        "action": "event/theme/add",
        "method": "post"
    },
    "get_moment_list": {
        "action": "event/theme/theme_list",
        "method": "get"
    },
    "like_moment": {
        "action": "event/theme/praise",
        "method": "get"
    },
    "unlike_moment": {
        "action": "event/theme/cancel_praise",
        "method": "get"
    },
    "coment_moment": {
        "action": "event/theme/reply",
        "method": "post"
    },
    "follow_competition": {
        "action": "event/attention/event_attention",
        "method": "get"
    },
    "unfollow_competition": {
        "action": "event/attention/cancel_attention",
        "method": "get"
    },
    "check_competition_follow": {
        "action": "event/attention/check_attention",
        "method": "get"
    },
    "get_venue_category": {
        "action": "venue/view/category",
        "method": "get"
    },
    "get_venue_list": {
        "action": "venue/view/venue_list",
        "method": "get"
    },
    "get_venue_info": {
        "action": "venue/view/info",
        "method": "get"
    },
    "get_club_category": {
        "action": "community/view/category",
        "method": "get"
    },
    "get_club_list": {
        "action": "community/view/community_list",
        "method": "get"
    },
    "get_club_info": {
        "action": "community/view/community_info",
        "method": "get"
    },
    "get_commuity_bulletion": {
        "action": "community/view/community_bulletion",
        "method": "get"
    },
    "get_club_recommend": {
        "action": "community/view/community_recommend",
        "method": "get"
    },
    "get_follow_clubs": {
        "action": "community/attention/user_attention",
        "method": "get"
    },
    "follow_club": {
        "action": "community/attention/attention",
        "method": "get"
    },
    "unfollow_club": {
        "action": "community/attention/cancel_attention",
        "method": "get"
    },
    "get_club_fans_list": {
        "action": "community/attention/fans_attention",
        "method": "get"
    },
    "check_club_follow": {
        "action": "community/attention/check_attention",
        "method": "get"
    },
    "get_club_bind_venue": {
        "action": "community/view/community_bind_venue",
        "method": "get"
    },
    "get_community_relay_act": {
        "action": "community/view/community_relay_act",
        "method": "get"
    },
    "get_community_album_list": {
        "action": "community/album/community_album_list",
        "method": "get"
    },
    "get_community_album_photo_list": {
        "action": "community/album/community_album_photo_list",
        "method": "get"
    },
    "regeocode": {
        "action": "other/api/get_geocoding",
        "method": "post"
    },
    "wx_subscribe": {
        "action": "other/api/wx_subscribe",
        "method": "get"
    },
    "un_bind_community": {
        "action": "admin/manage/un_bind_community",
        "method": "get"
    },
    "alipay_callback_url": {
        "action": "pay/api/alipay",
        "method": "post"
    },
    "wx_unifiedorder": {
        "action": "pay/api/weixin_unifiedorder",
        "method": "post"
    },
    "get_community_home_ad": {
        "action": "ad/api/ad_home",
        "method": "get"
    },
    "get_community_banner": {
        "action": "ad/api/ad_community_banner",
        "method": "get"
    },
    "get_holichat_banner": {
        "action": "ad/api/ad_holichat_banner",
        "method": "get"
    },
    "get_live_banner": {
        "action": "ad/api/ad_live_banner",
        "method": "get"
    },
    "get_holichat_custom_ad": {
        "action": "ad/home/custom",
        "method": "get"
    },
    "get_holichat_recommended_ad": {
        "action": "ad/home/recommend",
        "method": "get"
    },
    "get_flash_sale_banner": {
        "action": "ad/api/ad_flash_sale_banner",
        "method": "get"
    },
    "get_sys_message": {
        "action": "message/api/get_sys_message",
        "method": "get"
    },
    "get_new_sys_message_cnt": {
        "action": "message/api/get_new_sys_message_cnt",
        "method": "get"
    },
    "add_receipt_info": {
        "action": "lottery/user/add_receipt_info",
        "method": "get"
    },
    "user_receipt_info": {
        "action": "lottery/user/user_receipt_info",
        "method": "get"
    },
    "edit_receipt_info": {
        "action": "lottery/user/edit_receipt_info",
        "method": "get"
    },
    "get_lottery_score": {
        "action": "lottery/view/get_lottery_score",
        "method": "get"
    },
    "get_lottery_count": {
        "action": "lottery/view/get_lottery_count",
        "method": "get"
    },
    "get_lottery_list": {
        "action": "lottery/view/get_lottery_list",
        "method": "get"
    },
    "get_lottery_info": {
        "action": "lottery/view/get_lottery_info",
        "method": "get"
    },
    "get_lottery_item_list": {
        "action": "lottery/view/get_lottery_item_list",
        "method": "get"
    },
    "get_lottery_item_info": {
        "action": "lottery/view/get_lottery_item_info",
        "method": "get"
    },
    "get_lottery_record": {
        "action": "lottery/view/get_lottery_record",
        "method": "get"
    },
    "lottery": {
        "action": "lottery/interface/lottery",
        "method": "get"
    },
    "get_lotterysite_region": {
        "action": "lotterysite/view/region",
        "method": "get"
    },
    "get_lotterysite_list": {
        "action": "lotterysite/view/site_list",
        "method": "get"
    },
    "get_lotterysite_info": {
        "action": "lotterysite/view/info",
        "method": "get"
    },
    "get_rc_token": {
        "action": "im/rc/token",
        "method": "get"
    },
    "join_rc_group": {
        "action": "im/rc/group_join",
        "method": "get"
    },
    "group_user_query": {
        "action": "im/rc/group_user_query",
        "method": "get"
    },
    "group_user_list": {
        "action": "im/rc/group_user_list",
        "method": "get"
    },
    "group_quit": {
        "action": "im/rc/group_quit",
        "method": "get"
    },
    "get_star_list": {
        "action": "news/star/lists",
        "method": "get"
    },
    "get_star_info": {
        "action": "news/star/info",
        "method": "get"
    },
    "get_holichat_news_list": {
        "action": "news/pf/lists",
        "method": "get"
    },
    "get_holichat_news_info": {
        "action": "news/pf/info",
        "method": "get"
    },
    "get_community_news_list": {
        "action": "news/community/lists",
        "method": "get"
    },
    "get_community_news_info": {
        "action": "news/community/info",
        "method": "get"
    },
    "get_lbs_competition_list": {
        "action": "lbs/lbs/list_lbs",
        "method": "get"
    },
    "get_lotterysite_lbs_list": {
        "action": "lbs/lbs/site_list_lbs",
        "method": "get"
    },
    "get_lbs_venue_list": {
        "action": "lbs/lbs/venue_list_lbs",
        "method": "get"
    },
    "get_activity_category": {
        "action": "activity/view/category",
        "method": "get"
    },
    "get_activity_list": {
        "action": "activity/view/activity_list",
        "method": "get"
    },
    "get_activity_details": {
        "action": "activity/view/get_info",
        "method": "get"
    },
    "get_activity_introduction": {
        "action": "activity/view/get_brief",
        "method": "get"
    },
    "get_activity_enroll_info": {
        "action": "activity/view/get_enroll_info",
        "method": "get"
    },
    "get_activity_enroll_pro_group_info": {
        "action": "activity/view/activity_pro_group_info",
        "method": "get"
    },
    "search_activity_list": {
        "action": "activity/view/activity_search",
        "method": "get"
    },
    "get_activity_result": {
        "action": "activity/view/activity_result",
        "method": "get"
    },
    "get_activity_address": {
        "action": "activity/view/get_address",
        "method": "get"
    },
    "get_activity_brief_array": {
        "action": "activity/view/get_brief_array",
        "method": "post"
    },
    "activity_pay_confirm": {
        "action": "activity/interface/activity_pay_confirm",
        "method": "get"
    },
    "select_activity_enroll": {
        "action": "activity/interface/activity_enroll_select",
        "method": "post"
    },
    "get_activity_eroll_order_info": {
        "action": "activity/interface/activity_order_info",
        "method": "get"
    },
    "activity_project_check": {
        "action": "activity/interface/activity_project_check",
        "method": "get"
    },
    "activity_can_enroll_check": {
        "action": "activity/interface/activity_can_enroll_check",
        "method": "get"
    },
    "check_activity_enroll": {
        "action": "activity/interface/activity_enroll_check",
        "method": "get"
    },
    "check_activity_sign": {
        "action": "activity/interface/activity_sign_check",
        "method": "get"
    },
    "activity_enroll": {
        "action": "activity/interface/activity_enroll",
        "method": "post"
    },
    "activity_pay_check": {
        "action": "activity/interface/activity_pay_check",
        "method": "post"
    },
    "send_activity_moment": {
        "action": "activity/theme/add",
        "method": "post"
    },
    "get_activity_moment_list": {
        "action": "activity/theme/theme_list",
        "method": "get"
    },
    "like_activity_moment": {
        "action": "activity/theme/praise",
        "method": "get"
    },
    "unlike_activity_moment": {
        "action": "activity/theme/cancel_praise",
        "method": "get"
    },
    "coment_activity_moment": {
        "action": "activity/theme/reply",
        "method": "post"
    },
    "follow_activity": {
        "action": "activity/attention/activity_attention",
        "method": "get"
    },
    "unfollow_activity": {
        "action": "activity/attention/cancel_attention",
        "method": "get"
    },
    "check_activity_follow": {
        "action": "activity/attention/check_attention",
        "method": "get"
    },
    "get_training_category": {
        "action": "training/view/category",
        "method": "get"
    },
    "get_training_list": {
        "action": "training/view/training_list",
        "method": "get"
    },
    "get_training_details": {
        "action": "training/view/get_info",
        "method": "get"
    },
    "get_training_introduction": {
        "action": "training/view/get_brief",
        "method": "get"
    },
    "get_training_enroll_info": {
        "action": "training/view/get_enroll_info",
        "method": "get"
    },
    "get_training_enroll_pro_group_info": {
        "action": "training/view/training_pro_group_info",
        "method": "get"
    },
    "search_training_list": {
        "action": "training/view/training_search",
        "method": "get"
    },
    "get_training_result": {
        "action": "training/view/training_result",
        "method": "get"
    },
    "get_training_address": {
        "action": "training/view/get_address",
        "method": "get"
    },
    "training_pay_confirm": {
        "action": "training/interface/training_pay_confirm",
        "method": "get"
    },
    "select_training_enroll": {
        "action": "training/interface/training_enroll_select",
        "method": "post"
    },
    "get_training_eroll_order_info": {
        "action": "training/interface/training_order_info",
        "method": "get"
    },
    "training_project_check": {
        "action": "training/interface/training_project_check",
        "method": "get"
    },
    "training_can_enroll_check": {
        "action": "training/interface/training_can_enroll_check",
        "method": "get"
    },
    "check_training_enroll": {
        "action": "training/interface/training_enroll_check",
        "method": "get"
    },
    "check_training_sign": {
        "action": "training/interface/training_sign_check",
        "method": "get"
    },
    "training_enroll": {
        "action": "training/interface/training_enroll",
        "method": "post"
    },
    "training_pay_check": {
        "action": "training/interface/training_pay_check",
        "method": "post"
    },
    "get_training_brief_array": {
        "action": "training/view/get_brief_array",
        "method": "post"
    },
    "send_training_moment": {
        "action": "training/theme/add",
        "method": "post"
    },
    "get_training_moment_list": {
        "action": "training/theme/theme_list",
        "method": "get"
    },
    "like_training_moment": {
        "action": "training/theme/praise",
        "method": "get"
    },
    "unlike_training_moment": {
        "action": "training/theme/cancel_praise",
        "method": "get"
    },
    "coment_training_moment": {
        "action": "training/theme/reply",
        "method": "post"
    },
    "follow_training": {
        "action": "training/attention/training_attention",
        "method": "get"
    },
    "unfollow_training": {
        "action": "training/attention/cancel_attention",
        "method": "get"
    },
    "check_training_follow": {
        "action": "training/attention/check_attention",
        "method": "get"
    },
    "get_enroll_template": {
        "action": "mine/user/user_event_template",
        "method": "get"
    },
    "get_enroller_info": {
        "action": "mine/user/user_event_content",
        "method": "get"
    },
    "get_user_nopay_competition": {
        "action": "mine/user/user_no_pay_event",
        "method": "get"
    },
    "get_activity_enroll_template": {
        "action": "mine/user/user_activity_template",
        "method": "get"
    },
    "get_activity_enroller_info": {
        "action": "mine/user/user_activity_content",
        "method": "get"
    },
    "get_user_nopay_activity": {
        "action": "mine/user/user_no_pay_activity",
        "method": "get"
    },
    "get_trainning_enroll_template": {
        "action": "mine/user/user_training_template",
        "method": "get"
    },
    "get_training_enroller_info": {
        "action": "mine/user/user_training_content",
        "method": "get"
    },
    "get_user_nopay_training": {
        "action": "mine/user/user_no_pay_training",
        "method": "get"
    },
    "get_user_act_list": {
        "action": "mine/user/user_act_list",
        "method": "get"
    },
    "get_user_no_pay_act_list": {
        "action": "mine/user/user_no_pay_act_list",
        "method": "get"
    },
    "get_user_act_attention_list": {
        "action": "mine/user/user_act_attention_list",
        "method": "get"
    },
    "get_user_no_pay_cnt": {
        "action": "mine/interface/user_act_no_pay_cnt",
        "method": "get"
    },
    "user_delete_act_list": {
        "action": "mine/user/user_delete_act_list",
        "method": "post"
    },
    "get_insurance_info": {
        "action": "insurance/view/insurance_info",
        "method": "get"
    },
    "set_user_interests": {
        "action": "user/api/user_interests",
        "method": "post"
    },
    "get_flashsale_start_time_list": {
        "action": "flashsale/view/sale_start_time_bucket",
        "method": "get"
    },
    "get_flashsale_more_time_list": {
        "action": "flashsale/view/sale_roll_time_bucket",
        "method": "get"
    },
    "get_flashsale_list": {
        "action": "flashsale/view/sale_list",
        "method": "get"
    },
    "get_flashsale_detail": {
        "action": "flashsale/view/sale_detail",
        "method": "get"
    },
    "get_flashsale_imgs": {
        "action": "flashsale/view/sale_pub_image_list",
        "method": "get"
    },
    "get_flashsale_qty": {
        "action": "flashsale/view/sale_qty_detail",
        "method": "get"
    },
    "add_sale_data": {
        "action": "flashsale/interface/add_sale_data",
        "method": "get"
    },
    "check_can_sale": {
        "action": "flashsale/interface/check_can_sale",
        "method": "get"
    },
    "get_sale_order_list": {
        "action": "flashsale/view/sale_order_list",
        "method": "get"
    },
    "get_sale_order_info": {
        "action": "flashsale/view/sale_order_info",
        "method": "get"
    },
    "get_sale_child_order_list": {
        "action": "flashsale/view/sale_child_order_list",
        "method": "get"
    },
    "get_module_switch_info": {
        "action": "config/config/module_sw_info",
        "method": "get"
    },
    "set_home_community": {
        "action": "user/user/set_home_community",
        "method": "get"
    },
    "get_home_community": {
        "action": "user/user/get_home_community",
        "method": "get"
    },
    "is_event_coupon": {
        "action": "event/coupon/is_event_coupon",
        "method": "get"
    },
    "is_activity_coupon": {
        "action": "activity/coupon/is_activity_coupon",
        "method": "get"
    },
    "is_training_coupon": {
        "action": "training/coupon/is_training_coupon",
        "method": "get"
    },
    "get_activity_coupon_info": {
        "action": "activity/coupon/activity_coupon_info",
        "method": "get"
    },
    "get_activity_group_coupon_info": {
        "action": "activity/coupon/activity_group_coupon_info",
        "method": "get"
    },
    "get_club_customer": {
        "action": "community/view/community_customer",
        "method": "get"
    },
    "get_event_coupon_info": {
        "action": "event/coupon/event_coupon_info",
        "method": "get"
    },
    "get_event_group_coupon_info": {
        "action": "event/coupon/event_group_coupon_info",
        "method": "get"
    },
    "get_training_coupon_info": {
        "action": "training/coupon/training_coupon_info",
        "method": "get"
    },
    "get_training_group_coupon_info": {
        "action": "training/coupon/training_group_coupon_info",
        "method": "get"
    },
    "check_im_user_online": {
        "action": "im/rc/check_user_online",
        "method": "get"
    },
    "get_customer_info": {
        "action": "community/view/community_customer_info",
        "method": "get"
    },
    "get_user_insurance_list": {
        "action": "mine/user/user_insurance_list",
        "method": "get"
    },
    "get_user_insurance_info": {
        "action": "mine/user/user_insurance_info",
        "method": "get"
    },
    "user_linkman_list": {
        "action": "mine/linkman/user_linkman_list",
        "method": "get"
    },
    "user_linkman_add": {
        "action": "mine/linkman/user_linkman_add",
        "method": "get"
    },
    "user_linkman_edit": {
        "action": "mine/linkman/user_linkman_edit",
        "method": "get"
    },
    "user_linkman_delete": {
        "action": "mine/linkman/user_linkman_delete",
        "method": "get"
    },
    "get_hot_search_fields": {
        "action": "config/config/hot_search_fields",
        "method": "get"
    },
    "get_global_search_result": {
        "action": "business/view/search",
        "method": "get"
    },
    "user_cash_coupon": {
        "action": "mine/user/user_cash_coupon",
        "method": "get"
    },
    "get_broadcast_info": {
        "action": "business/view/broadcast",
        "method": "get"
    },
    "get_coupon_info": {
        "action": "coupon/view/cash_coupon_info",
        "method": "get"
    },
    "user_cash_coupon_num": {
        "action": "mine/user/user_cash_coupon_num",
        "method": "get"
    },
    "get_coupon_List": {
        "action": "coupon/view/new_cash_coupon_list",
        "method": "get"
    },
    "orienteer_project_list": {
        "action": "orienteering/view/project_list",
        "method": "get"
    },
    "orienteer_route_list": {
        "action": "orienteering/view/route_list",
        "method": "get"
    },
    "orienteer_route_detail": {
        "action": "orienteering/view/route_detail",
        "method": "get"
    },
    "orienteer_sign_info": {
        "action": "orienteering/view/sign_info",
        "method": "get"
    },
    "orienteer_route_start": {
        "action": "orienteering/api/route_start",
        "method": "get"
    },
    "orienteer_route_point_sign": {
        "action": "orienteering/api/route_point_sign",
        "method": "get"
    },
    "orienteer_user_sign_info": {
        "action": "orienteering/user/user_sign_info",
        "method": "get"
    },
    "orienteer_user_sign_count": {
        "action": "orienteering/user/user_sign_count",
        "method": "get"
    },
    "orienteer_rank_list": {
        "action": "orienteering/rank/rank_list",
        "method": "get"
    },
    "orienteer_user_current_score": {
        "action": "orienteering/rank/user_current_score",
        "method": "get"
    },
    "orienteer_user_best_score": {
        "action": "orienteering/rank/user_best_score",
        "method": "get"
    },
    "edit_activity_enroll": {
        "action": "activity/enroll/activity_enroll_edit",
        "method": "post"
    },
    "edit_event_enroll": {
        "action": "event/enroll/event_enroll_edit",
        "method": "post"
    },
    "edit_training_enroll": {
        "action": "training/enroll/training_enroll_edit",
        "method": "post"
    },
    "get_custom_button": {
        "action": "config/config/get_custom_button",
        "method": "get"
    },
    "cancel_activity_enroll": {
        "action": "activity/interface/activity_cancel_enroll",
        "method": "get"
    },
    "cancel_event_enroll": {
        "action": "event/interface/event_cancel_enroll",
        "method": "get"
    },
    "cancel_training_enroll": {
        "action": "training/interface/training_cancel_enroll",
        "method": "get"
    },
    "check_need_bind": {
        "action": "mine/interface/check_need_bind",
        "method": "get"
    }
}
export default data