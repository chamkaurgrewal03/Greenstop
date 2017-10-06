import {
    MESSAGESLIST_REQ_ERR,
    MESSAGESLIST_REQ_START,
    MESSAGESLIST_REQ_SUCCESS
} from '../actions/messagesList.js';

const initialState = {
    loading: false,
    error: null,
    success: false,
    message: '',
    result: []
};

export default function messageslistReducer(state = initialState, action) {
    switch(action.type) {
        case MESSAGESLIST_REQ_START:
            return { ...state, loading: true };
        case MESSAGESLIST_REQ_ERR:
            return { ...state, loading: false, error: true, message: action.message };
        case MESSAGESLIST_REQ_SUCCESS:
            return { ...state, loading: false, success: true, result: action.payload };
            
        default:
            return state;
    }
};
