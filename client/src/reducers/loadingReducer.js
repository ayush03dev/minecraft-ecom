import {
    SET_LOADING,
    REMOVE_LOADING,
} from '../actions/types';


const initialState = {
    loading: false,
    requests: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const payload = action.payload;
    switch(action.type) {
        case SET_LOADING:
            return {loading: true, requests: [...state.requests, payload.id]};

        case REMOVE_LOADING:
            if (state.requests.length === 1) {
                return {loading: false, requests: []};
            }
            return {loading: true, requests: state.requests.filter(reqId => reqId !== payload.id)};
            
        default:
            return initialState;
    }
}