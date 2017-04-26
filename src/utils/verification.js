/*
* phoneValid(phone)                 //检测手机号码格式
* identityCodeValid(code)           //检测身份证号码格式
* identityHKCodeValid(code)         //检测港澳通行证格式
* identityTWCodeValid(code)         //检测台湾通行证格式
* dateDiff(date0,date1)             //获取日期相差的毫秒数
* dateComparison(date0,date1)       //日期比较
* getTimeDiffStr(time)              //获取目标日期相对与现在应该显示的文字
* object2String(object)             //Object 转为 String
* deepCopy(source)                  //深拷贝
* isArray(object)                   //判断是否数组
* isObject(object)                  //判断是否对象
* isString(object)                  //判断是否字符串
* isNumber(object)                  //判断是否数字
* isUndefined(object)               //判断是否undefined
* isNull(object)                    //判断是否null
* isBoolean(object)                 //判断是否boolean
* isFunction(object)                //判断是否function
*/
export const identityCodeValid = (code) => {
    const card = code.toUpperCase();
    //console.log(code)
    //是否为空
    if(card === '')
    {
        //alert('请输入身份证号，身份证号不能为空');
        return false;
    }
    //校验长度，类型
    if(isCardNo(card) === false)
    {
        //alert('您输入的身份证号码不正确，请重新输入');
        return false;
    }
    //检查省份
    if(checkProvince(card) === false)
    {
        //alert('您输入的身份证号码不正确,请重新输入');
        return false;
    }
    //校验生日
    if(checkBirthday(card) === false)
    {
        //alert('您输入的身份证号码生日不正确,请重新输入');
        return false;
    }
    //检验位的检测
    if(checkParity(card) === false)
    {
        //alert('您的身份证校验位不正确,请重新输入');
        return false;
    }
    return true;
}

const vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
            33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
            42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
            51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
            63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
           };

//检查号码是否符合规范，包括长度，类型
const isCardNo = function(card)
{
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    const reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if(reg.test(card) === false)
    {
        return false;
    }

    return true;
};

//取身份证前两位,校验省份
const checkProvince = function(card)
{
    const province = card.substr(0,2);
    if(vcity[province] == undefined)
    {
        return false;
    }
    return true;
};

//检查生日是否正确
const checkBirthday = function(card)
{
    const len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if(len == '15')
    {
        const re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        const arr_data = card.match(re_fifteen);
        const year = arr_data[2];
        const month = arr_data[3];
        const day = arr_data[4];
        const birthday = new Date('19'+year+'/'+month+'/'+day);
        return verifyBirthday('19'+year,month,day,birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if(len == '18')
    {
        const re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        const arr_data = card.match(re_eighteen);
        const year = arr_data[2];
        const month = arr_data[3];
        const day = arr_data[4];
        const birthday = new Date(year+'/'+month+'/'+day);
        return verifyBirthday(year,month,day,birthday);
    }
    return false;
};

//校验日期
const verifyBirthday = function(year,month,day,birthday)
{
    let now = new Date();
    let now_year = now.getFullYear();
    //年月日是否合理
    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)
    {
        //判断年份的范围（3岁到100岁之间)
        const time = now_year - year;
        if(time >= 3 && time <= 100)
        {
            return true;
        }
        return false;
    }
    return false;
};

//校验位的检测
const checkParity = function(card)
{
  //15位转18位
  card = changeFivteenToEighteen(card);
  const len = card.length;
  if(len == '18')
  {
    const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    let cardTemp = 0, i, valnum;
    for(i = 0; i < 17; i ++){
        cardTemp += card.substr(i, 1) * arrInt[i];
    }
    valnum = arrCh[cardTemp % 11];
    //alert(card)
    const last = card.substr(17, 1)

    if (valnum == last){
        return true;
    }
    return false;
  }
  return false;
};

//15位转18位身份证号
const changeFivteenToEighteen = function(card)
{
    if(card.length == '15')
    {
        const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        let cardTemp = 0, i;
        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
        for(i = 0; i < 17; i ++)
        {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        card += arrCh[cardTemp % 11];
        return card;
    }
    return card;
};



//检测港澳通行证格式
export const identityHKCodeValid = ( code ) =>{
    const card = code.toUpperCase();
    if(card ===''){
        return false;
    }
    var reg = /^[HMhm]{1}([0-9]{10})$/;
    if(reg.test(card) === false){
        return false;
    }
    return true
}


//台湾居民来往大陆通行证
export const identityTWCodeValid = (code) =>{
    const card = code.toUpperCase();
    if(card === ''){
        return false;
    }
    var reg = /^[0-9]{8}$/;
    if(reg.test(card) === false){
        return false;
    }
    return true
}
