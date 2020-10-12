
import { ADD_SOCIALSHARE, SET_SOCAILSHARE } from '../actions/SocialShareAction';

const initialState = {
    socialShareData: []
};

export default (state = initialState, action) => {

    switch (action.type) {



        case ADD_SOCIALSHARE:
            return {
                ...state
            }
        /* case REMOVE_LIST:
             return {
                 ...state
             }*/

        case SET_SOCAILSHARE:
            return {
                ...state, socialShareData: action.socialShare
            }

    }
    return state;
};

