import axios from "axios";
import {
    PLAYER_DATA_REQUESTED,
    PLAYER_DATA_RECEIVED,
    PLAYER_DATA_FAILED,
    PLAYER_LOGOUT
} from '../actions/types';
import { setLoading, removeLoading } from './loadingActions';

import { v4 } from "uuid";

export const requestData = (playerName) => async dispatch => {
    const id = v4();

    dispatch({type: PLAYER_DATA_REQUESTED});
    dispatch(setLoading(id));
    const url = `/api/minecraft/name/${playerName}`;
    
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return dispatch({
                type: PLAYER_DATA_RECEIVED,
                payload: response.data
            });
        }
        dispatch({type: PLAYER_DATA_FAILED});
        dispatch(removeLoading(id));
    } catch (error) {
        dispatch({type: PLAYER_DATA_FAILED});
        dispatch(removeLoading(id));

    }
}

export const logout = () => dispatch => {
    dispatch({type: PLAYER_LOGOUT})
}