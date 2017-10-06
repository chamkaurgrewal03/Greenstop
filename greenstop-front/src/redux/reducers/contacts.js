import {
    CONTACT_REQ_ERR,
    CONTACT_REQ_START,
    CONTACT_REQ_SUCCESS
} from '../actions/contacts.js';

const initialState = {
    loading: false,
    error: null,
    success: false,
    message: '',
    result: []
};

export default function contactReducer(state = initialState, action) {
    switch(action.type) {
        case CONTACT_REQ_START:
            return { ...state, loading: true };
        case CONTACT_REQ_ERR:
            return { ...state, loading: false, error: true, message: action.message };
        case CONTACT_REQ_SUCCESS:
            return { ...state, loading: false, success: true, result: action.payload };
            
        default:
            return state;
    }
};
