
import { ADD_WHISHLIST, SET_WHISHLIST, REMOVE_LIST } from '../actions/WishListAction';

const initialState = {
    wishListData: []
};

export default (state = initialState, action) => {

    switch (action.type) {



        case ADD_WHISHLIST:
            return {
                ...state
            }
        case REMOVE_LIST:
            return {
                ...state
            }
        case SET_WHISHLIST:
            return {
                ...state, wishListData: action.wishData
            }

    }
    return state;
};

