
import { CREATE_CART, DELETE_CART, SET_CART, UPDATE_CART, CLEAR_REDUX_CART, CLEAR_CART, SET_BATCHICON } from '../actions/CartAction';

const initialState = {
    CartData: [],
    BatchIcon: []
};

export default (state = initialState, action) => {

    switch (action.type) {


        case CREATE_CART:


            return {
                ...state, BatchIcon: action.cartDataLength
            }

        case SET_CART:

            return {
                ...state, CartData: action.cartUserData
            }
        case UPDATE_CART:
            return {
                ...state
            }

        case DELETE_CART:
            return {
                ...state, BatchIcon: action.cartUserData
            }

        case SET_BATCHICON:
            //  console.log(action.batic);
            return {
                ...state, BatchIcon: action.batic
            }

        case CLEAR_CART:


            return {
                ...state, CartData: []
            }

        case CLEAR_REDUX_CART:


            return {
                ...state, CartData: []
            }


    }
    return state;
};

