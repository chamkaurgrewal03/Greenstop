import {
    SUBSCRIBER_REQ_ERR,
    SUBSCRIBER_REQ_START,
    SUBSCRIBER_REQ_SUCCESS
} from '../actions/subscribers.js';

const initialState = {
    loading: false,
    error: null,
    success: false,
    message: '',
    result: []
};

export default function subscriberReducer(state = initialState, action) {
    switch(action.type) {
        case SUBSCRIBER_REQ_START:
            return { ...state, loading: true };
        case SUBSCRIBER_REQ_ERR:
            return { ...state, loading: false, error: true, message: action.message };
        case SUBSCRIBER_REQ_SUCCESS:
            return { ...state, loading: false, success: true, result: action.payload };
            
        default:
            return state;
    }
};
