import {
    SUBSCRIBERLIST_REQ_ERR,
    SUBSCRIBERLIST_REQ_START,
    SUBSCRIBERLIST_REQ_SUCCESS
} from '../actions/subscriberlist.js';

const initialState = {
    loading: false,
    error: null,
    success: false,
    message: '',
    result: []
};

export default function subscriberlistReducer(state = initialState, action) {
    switch(action.type) {
        case SUBSCRIBERLIST_REQ_START:
            return { ...state, loading: true };
        case SUBSCRIBERLIST_REQ_ERR:
            return { ...state, loading: false, error: true, message: action.message };
        case SUBSCRIBERLIST_REQ_SUCCESS:
            return { ...state, loading: false, success: true, result: action.payload };
            
        default:
            return state;
    }
};
