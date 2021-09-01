import * as types from '../actions/action-types'

export const INITIAL_STATE = {
    comments: [],
    fetchingComments: false,
    errorFetchingComments: false,
    posts: [],
    fetchingPosts: false,
    errorFetchingPosts: false,
    favorites: [],
}

export const reducer = (state=INITIAL_STATE, action) => {  
    switch (action.type) {
        case types.ACT_RESET_STATE:
            return { ...INITIAL_STATE }
        case types.ACT_ADD_TO_FAVORITES:
            return { 
                ...state,
                favorites: [ ...state.favorites, action.payload ]
            }
        case types.ACT_REMOVE_FROM_FAVORITES:
            return { 
                ...state,
                favorites: [ ...state.favorites.filter(pId=>pId!==action.payload) ]
            }
        case types.ACT_ADD_COMMENT:
            return { 
                ...state,
                comments: [ ...state.comments, action.payload ]
            }
        case types.ACT_DELETE_COMMENT:
            return { 
                ...state,
                comments: [ ...state.comments.filter(c=>c.id!==action.payload) ]
            }
        case types.ACT_GET_COMMENTS:
            return { 
                ...state,
                fetchingComments: true,
                errorFetchingComments: false
            }
        case types.ACT_GET_COMMENTS_SUCCESS:
            return { 
                ...state,
                comments: [ ...action.payload, ...state.comments.filter(c=>!action.payload.find(p=>p.id===c.id)) ],
                fetchingComments: false,
                errorFetchingComments: false
            }
        case types.ACT_GET_COMMENTS_ERROR:
            return { 
                ...state,
                fetchingComments: false,
                errorFetchingComments: true
            }
        case types.ACT_GET_POSTS:
            return { 
                ...state,
                fetchingPosts: true,
                errorFetchingPosts: false
            }
        case types.ACT_GET_POSTS_SUCCESS:
            return { 
                ...state,
                posts: action.payload,
                fetchingPosts: false,
                errorFetchingPosts: false
            }
        case types.ACT_GET_POSTS_ERROR:
            return { 
                ...state,
                fetchingPosts: false,
                errorFetchingPosts: true
            }
        case types.ACT_CLEAN_POSTS:
            return { 
                ...state,
                posts: [],
                fetchingPosts: false,
                errorFetchingPosts: true
            }
       default:
        break;
    }
    return state
}