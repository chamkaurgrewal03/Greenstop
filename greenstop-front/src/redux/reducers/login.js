import {
    LOGIN_REQ_ERR,
    LOGIN_REQ_START,
    LOGIN_REQ_SUCCESS
} from '../actions/login.js';

const initialState = {
    loading: false,
    error: null,
    success: false,
    message: '',
    result: []
};

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_REQ_START:
            return { ...state, loading: true };
        case LOGIN_REQ_ERR:
            return { ...state, loading: false, error: true, message: action.message };
        case LOGIN_REQ_SUCCESS:
            return { ...state, loading: false, success: true, result: action.payload };
            
        default:
            return state;
    }
};
