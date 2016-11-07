import province from './province'
import city from './city'
import region from './region'

export const getAddress = (id) => {
	let address = [];
	const setProvince = id.substring(0,2) + '0000';
	province[setProvince] ? address.push(province[setProvince].name) : '';
	const setCity = id.substring(0,4) + '00';
	city[setCity] ? address.push(city[setCity].name) : '';
	region[id] ? address.push(region[id].name) : '';
	return address.join('');
}
