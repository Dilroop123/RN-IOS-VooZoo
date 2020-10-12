//import PRODUCTS from '../../data/dummy-data';
import { SET_CATEGORY, REMOVE_FROM_PRODUCTLIST, SET_HOME_ITEM_CATEGORY, REMOVE_FROM_ITEMCATEGORY, SET_SUBCATEGORY, SET_ITEM_CATEGORY, SET_SLIDER, SET_PRODUCT, UPDATE_ITEMCATEGORY, REMOVE_FROM_SUBCATEGORY } from '../actions/CategoryAction';
//import CurrentUser_Login from '../../model/Currentuser';
const initialState = {
    CategoryData: [],
    SubCategoryData: [],
    ItemCategoryData: [],
    SliderData: [],
    ProductData: [],
    HomeItemCategory: []
};

export default (state = initialState, action) => {

    switch (action.type) {


        case SET_CATEGORY:
            return {
                ...state, CategoryData: action.catdata
            }

        case SET_SUBCATEGORY:
            return {
                ...state, SubCategoryData: action.subcatdata
            }
        case SET_ITEM_CATEGORY:
            return {
                ...state, ItemCategoryData: action.itemcatdata
            }
        case SET_SLIDER:
            return {
                ...state, SliderData: action.sliderdata
            }
        case SET_PRODUCT:
            return {
                ...state, ProductData: action.productData
            }
        case UPDATE_ITEMCATEGORY:
            return {
                ...state
            }
        case REMOVE_FROM_SUBCATEGORY:
            return {
                ...state, SubCategoryData: []
            }
        case REMOVE_FROM_ITEMCATEGORY:
            return {
                ...state, ItemCategoryData: []
            }
        case REMOVE_FROM_PRODUCTLIST:
            return {
                ...state, ProductData: []
            }
        case SET_HOME_ITEM_CATEGORY:
            return {
                ...state, HomeItemCategory: action.homecategory
            }
    }
    return state;
};

