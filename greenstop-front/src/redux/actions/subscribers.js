import 'whatwg-fetch';
export const SUBSCRIBER_REQ_START = 'SUBSCRIBER_REQ_START';
export const SUBSCRIBER_REQ_ERR = 'SUBSCRIBER_REQ_ERR';
export const SUBSCRIBER_REQ_SUCCESS = 'SUBSCRIBER_REQ_SUCCESS';

function subscriberReqStart() {
	return {
		type: SUBSCRIBER_REQ_START
	};
};

function subscriberReqErr(payload) {
	return {
		type: SUBSCRIBER_REQ_ERR,
		message: payload
	};
};

function subscriberReqSuccess(res) {
	return {
		type: SUBSCRIBER_REQ_SUCCESS,
		payload: res
	};
};

export function dosubscriberReq(params) {
	debugger;
	var p=JSON.parse(params);
	return (dispatch, state) => {
		
		dispatch(subscriberReqStart());
				return fetch('http://127.0.0.1:8080/api/users_subscribed', {
					mode: 'cors',
					method: "post",
					headers:{'Accept':'application/json , text/plain, */*',
						     'Content-type':'application/json'
				},
					body: JSON.stringify(p)

				})
				.then(res => res.json())
			.then(res => {
				if (res) {

					return dispatch(subscriberReqSuccess(res));
				} else {
					
					return dispatch(subscriberReqErr(res));
				}
			})

			.catch(error => dispatch(subscriberReqErr(error)));
	};
};