//import PRODUCTS from '../../data/dummy-data';
import { CREATE_REVIEW, SET_REVIEW_ITEMCATEGORY, SET_REVIEW_PRODUCT, SET_ALL_REVIEW_PRODUCT, SET_ALL_REVIEW_ITEM_CAT_PRODUCT } from '../actions/ReviewsAction';

//import CurrentUser_Login from '../../model/Currentuser';
const initialState = {
    reviewItemCategoryData: [],
    reviewProduct: [],
    allreviewProduct: [],
    alreviewItemcat: []
};

export default (state = initialState, action) => {

    switch (action.type) {

        case CREATE_REVIEW:

            return {
                ...state
            }
        case SET_REVIEW_ITEMCATEGORY:

            return {
                ...state, reviewItemCategoryData: action.reviewdata
            }

        case SET_REVIEW_PRODUCT:

            return {
                ...state, reviewProduct: action.productreview
            }
        case SET_ALL_REVIEW_PRODUCT:

            return {
                ...state, allreviewProduct: action.allproductreview
            }
        case SET_ALL_REVIEW_ITEM_CAT_PRODUCT:

            return {
                ...state, alreviewItemcat: action.allItemCatreview
            }
    }
    return state;
};

