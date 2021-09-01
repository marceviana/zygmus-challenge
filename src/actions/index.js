import axios from 'axios';
import * as types from './action-types';
import * as constants from '../constants';

export const resetState = () => {
    return {
        type: types.ACT_RESET_STATE
    }
}

export const addToFavorites = postId => {
    return {
        type: types.ACT_ADD_TO_FAVORITES,
        payload: postId
    }
}

export const removeFromFavorites = postId => {
    return {
        type: types.ACT_REMOVE_FROM_FAVORITES,
        payload: postId
    }
}

export const addComment = payload => {
    return {
        type: types.ACT_ADD_COMMENT,
        payload
    }
}

export const deleteComment = payload => {
    return {
        type: types.ACT_DELETE_COMMENT,
        payload
    }
}

export const getComments = () => dispatch => {

    dispatch({
        type: types.ACT_GET_COMMENTS,
        payload: []
    })
    
    axios.get(constants.API_COMMENTS_ENDPOINT)
    .then(r=>{
        dispatch({
            type: types.ACT_GET_COMMENTS_SUCCESS,
            payload: r.data
        })
    })
    .catch(err=>{
        dispatch({
            type: types.ACT_GET_COMMENTS_ERROR
        })
    })
}

export const getPosts = () => {
    return dispatch => {
        dispatch({
            type: types.ACT_GET_POSTS,
            payload: []
        })
        /*  
        |   setTimeout was implementend only for the sake of challenge 
        |   so the placeholder skeleton is visible for a second
        */
        setTimeout(() => {
            axios.get(constants.API_POSTS_ENDPOINT)
            .then(r=>{
                dispatch({
                    type: types.ACT_GET_POSTS_SUCCESS,
                    payload: r.data
                })
            })
            .catch(err=>{
                dispatch({
                    type: types.ACT_GET_POSTS_ERROR
                })
            })
        }, 1000 )
    }
}

export const cleanPosts = () => {
    return {
        type: types.ACT_CLEAN_POSTS
    }
}
