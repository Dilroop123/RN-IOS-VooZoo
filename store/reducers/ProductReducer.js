
import { SAVE_PRODUCT_ID } from '../actions/ProductAction';


const initialState = {
    productId: [],

};

export default (state = initialState, action) => {

    switch (action.type) {


        case SAVE_PRODUCT_ID:


            return {
                ...state, productId: action.pid
            }


    }
    return state;
};

