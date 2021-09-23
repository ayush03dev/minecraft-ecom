import {
    SET_LOADING,
    REMOVE_LOADING,
} from '../actions/types';

export const setLoading = id => dispatch => {
    dispatch({type: SET_LOADING, payload: {id}});
}

export const removeLoading = id => dispatch => {
    dispatch({type: REMOVE_LOADING, payload: {id}});
}