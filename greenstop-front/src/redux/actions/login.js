import 'whatwg-fetch';
export const LOGIN_REQ_START = 'LOGIN_REQ_START';
export const LOGIN_REQ_ERR = 'LOGIN_REQ_ERR';
export const LOGIN_REQ_SUCCESS = 'LOGIN_REQ_SUCCESS';

function loginReqStart() {
	return {
		type: LOGIN_REQ_START
	};
};

function loginReqErr(payload) {
	return {
		type: LOGIN_REQ_ERR,
		message: payload
	};
};

function loginReqSuccess(res) {
	return {
		type: LOGIN_REQ_SUCCESS,
		payload: res
	};
};

export function dologinReq(params) {
	debugger;
	var p=JSON.parse(params);
	return (dispatch, state) => {
		
		dispatch(loginReqStart());
				return fetch('http://127.0.0.1:8080/api/signin', {
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

					return dispatch(loginReqSuccess(res));
				} else {
					
					return dispatch(loginReqErr(res));
				}
			})

			.catch(error => dispatch(loginReqErr(error)));
	};
};