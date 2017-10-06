import 'whatwg-fetch';
export const MESSAGESLIST_REQ_START = 'MESSAGESLIST_REQ_START';
export const MESSAGESLIST_REQ_ERR = 'MESSAGESLIST_REQ_ERR';
export const MESSAGESLIST_REQ_SUCCESS = 'MESSAGESLIST_REQ_SUCCESS';

function messageslistReqStart() {
	return {
		type: MESSAGESLIST_REQ_START
	};
};

function messageslistReqErr(payload) {
	return {
		type: MESSAGESLIST_REQ_ERR,
		message: payload
	};
};

function messageslistReqSuccess(res) {
	return {
		type: MESSAGESLIST_REQ_SUCCESS,
		payload: res
	};
};

export function domessageslistReq(token) {
	return (dispatch, state) => {
		
		dispatch(messageslistReqStart());
				return fetch('http://127.0.0.1:8080/api/users_contact', {
					mode: 'cors',
					method: "get",
					headers:{'Accept':'application/json , text/plain, */*',
						     'Content-type':'application/json',
						     'authorization':token
				}
			})
				.then(res => res.json())
			.then(res => {
				if (res) {

					return dispatch(messageslistReqSuccess(res));
				} else {
					
					return dispatch(messageslistReqErr(res));
				}
			})

			.catch(error => dispatch(messageslistReqErr(error)));
	};
};