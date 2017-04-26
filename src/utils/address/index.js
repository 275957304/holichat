import province from './province'
import city from './city'
import region from './region'
import { getItem } from '../'
const city_id = getItem('city_id');

export const getAddress = (id) => {
	if(!id) return '';
	let address = [];
	const setProvince = id.substring(0,2) + '0000';
	province[setProvince] ? address.push(province[setProvince].name) : '';
	const setCity = id.substring(0,4) + '00';
	city[setCity] ? address.push(city[setCity].name) : '';
	region[id] ? address.push(region[id].name) : '';
	return address;
}
//返回全国城市数据
export function cityData(){
	let data = [{label :"全国",value : "000000",isLeaf: true}]
	for(let i in province){
		let children = [{label : `全-${province[i].name}`,value : i,id : i,}];
		let provinceData = {
			label :province[i].name,
			value : i,
		}
		for(let j in city){
			const cityid = j.substring(0,2) + '0000'
			if(i == cityid){
				let cityDat = {
					label : city[j].name,
					value : j,
				}
				if( j == city_id ){
					cityDat['disabled'] = true
				}
				children.push(cityDat)
			}
			provinceData['children'] = children
		}
		data.push(provinceData)
	}
	return data;
}
