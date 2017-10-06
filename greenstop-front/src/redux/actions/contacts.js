import 'whatwg-fetch';
export const CONTACT_REQ_START = 'CONTACT_REQ_START';
export const CONTACT_REQ_ERR = 'CONTACT_REQ_ERR';
export const CONTACT_REQ_SUCCESS = 'CONTACT_REQ_SUCCESS';

function contactReqStart() {
	return {
		type: CONTACT_REQ_START
	};
};

function contactReqErr(payload) {
	return {
		type: CONTACT_REQ_ERR,
		message: payload
	};
};

function contactReqSuccess(res) {
	return {
		type: CONTACT_REQ_SUCCESS,
		payload: res
	};
};

export function docontactReq(params) {
	debugger;
	var p=JSON.parse(params);
	return (dispatch, state) => {
		
		dispatch(contactReqStart());
				return fetch('http://127.0.0.1:8080/api/users_contact', {
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

					return dispatch(contactReqSuccess(res));
				} else {
					
					return dispatch(contactReqErr(res));
				}
			})

			.catch(error => dispatch(contactReqErr(error)));
	};
};