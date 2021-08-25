import * as types from '../actions/action-types'

export const defaultState = {
    comments: [],
    fetchingComments: false,
    errorFetchingComments: false,
    posts: [],
    fetchingPosts: false,
    errorFetchingPosts: false,
}

export const reducer = function (state, action) {  
    const newState = { ...state }
    switch (action.type) {
        case types.ACT_ADD_COMMENT:
            return { 
                ...newState,
                comments: [ ...newState.comments, action.payload ]
            }
        case types.ACT_GET_COMMENTS:
            return { 
                ...newState,
                fetchingComments: true,
                errorFetchingComments: false
            }
        case types.ACT_GET_COMMENTS_SUCCESS:
            return { 
                ...newState,
                comments: action.payload,
                fetchingComments: false,
                errorFetchingComments: false
            }
        case types.ACT_GET_COMMENTS_ERROR:
            return { 
                ...newState,
                fetchingComments: false,
                errorFetchingComments: true
            }
        case types.ACT_GET_POSTS:
            return { 
                ...newState,
                fetchingPosts: true,
                errorFetchingPosts: false
            }
        case types.ACT_GET_POSTS_SUCCESS:
            return { 
                ...newState,
                posts: action.payload,
                fetchingPosts: false,
                errorFetchingPosts: false
            }
        case types.ACT_GET_POSTS_ERROR:
            return { 
                ...newState,
                fetchingPosts: false,
                errorFetchingPosts: true
            }
        case types.ACT_CLEAN_POSTS:
            return { 
                ...newState,
                posts: [],
                fetchingPosts: false,
                errorFetchingPosts: true
            }
       default:
        break;
    }
    return newState
}