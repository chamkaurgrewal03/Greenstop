import 'whatwg-fetch';
export const SUBSCRIBERLIST_REQ_START = 'SUBSCRIBERLIST_REQ_START';
export const SUBSCRIBERLIST_REQ_ERR = 'SUBSCRIBERLIST_REQ_ERR';
export const SUBSCRIBERLIST_REQ_SUCCESS = 'SUBSCRIBERLIST_REQ_SUCCESS';

function subscriberlistReqStart() {
	return {
		type: SUBSCRIBERLIST_REQ_START
	};
};

function subscriberlistReqErr(payload) {
	return {
		type: SUBSCRIBERLIST_REQ_ERR,
		message: payload
	};
};

function subscriberlistReqSuccess(res) {
	return {
		type: SUBSCRIBERLIST_REQ_SUCCESS,
		payload: res
	};
};

export function dosubscriberlistReq(token) {
	
	return (dispatch, state) => {
		
		dispatch(subscriberlistReqStart());
				return fetch('http://127.0.0.1:8080/api/users_subscribed', {
					mode: 'cors',
					method: "get",
					headers:{
						     'authorization':token
				}
			})
				.then(res => res.json())
			.then(res => {
				if (res) {

					return dispatch(subscriberlistReqSuccess(res));
				} else {
					
					return dispatch(subscriberlistReqErr(res));
				}
			})

			.catch(error => dispatch(subscriberlistReqErr(error)));
	};
};