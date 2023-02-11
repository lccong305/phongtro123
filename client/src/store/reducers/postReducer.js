import actionTypes from "../actions/actionTypes";

const initState = {
    posts: [],
    msg: '',
    count: 0,
    newPosts: [],
    postOfCurrent: [],
    dataEdit: null,
    outstandingPosts: [],
    postLike: []
}

const postReducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.GET_POSTS_LIMIT:
        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0
            }
            case actionTypes.GET_NEW_POSTS:
                return {
                    ...state,
                    newPosts: action.newPosts || [],
                    msg: action.msg || '',
                }
                case actionTypes.GET_OUTSTANDING_POSTS:
                return {
                    ...state,
                    outstandingPosts: action.outstandingPosts || [],
                    msg: action.msg || '',
                }
                case actionTypes.GET_POSTS_ADMIN:
                return {
                    ...state,
                    postOfCurrent: action.postOfCurrent || [],
                    msg: action.msg || '',
                }
                case actionTypes.EDIT_DATA:
                return {
                    ...state,
                    dataEdit: action.dataEdit || null,
                }
                case actionTypes.RESET_DATAEDIT:
                return {
                    ...state,
                    dataEdit: null,
                }
                case actionTypes.GET_POST_LIKE:
                return {
                    ...state,
                    postLike: action.postLike || [],
                    msg: action.msg || '',
                }
        default:
            return state;
    }
}
export default postReducer