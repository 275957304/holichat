import province from './province'
import city from './city'
import region from './region'

export const getAddress = (id) => {
	let address = [];
	const setProvince = id.substring(0,2) + '0000';
	address.push(province[setProvince].name)
	const setCity = id.substring(0,4) + '00';
	address.push(city[setCity].name)
	address.push(region[id].name)
	return address.join('');
}
