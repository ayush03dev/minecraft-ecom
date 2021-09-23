import {
    PLAYER_DATA_RECEIVED, PLAYER_DATA_REQUESTED, PLAYER_LOGOUT
} from '../actions/types';

const initialState = {
    name: undefined,
    id: undefined,
    avatar: undefined,
    success: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
        case PLAYER_DATA_REQUESTED:
            return {...initialState, loading: true};
        case PLAYER_DATA_RECEIVED:
            const { name, id } = action.payload;
            return {name, id, avatar: `https://crafatar.com/avatars/${id}`, loading: false, success: true}; 

        case PLAYER_LOGOUT:
        default:
            return initialState;
    }
}