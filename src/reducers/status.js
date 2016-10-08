import * as types from '../actions/';

const statusInfo = {
    msg : false,
	msgTxt : '加载中...'
}

export default function status(state = statusInfo,action){
    switch(action.type){
        case types.PAGE_DIALOG:
            return Object.assign({}, state,action.payload);
		case types.PAGE_DIALOG_CLOSE:
            return Object.assign({}, state,action.payload);
        default:
            return state
    }
}
