
import { CREATE_ORDER, SET_ORDERS } from '../actions/OrderAction';

const initialState = {
    OrderData: [],
    OrderList: []
};

export default (state = initialState, action) => {

    switch (action.type) {


        case CREATE_ORDER:


            return {
                ...state, OrderData: action.RecivedResponse
            }
        case SET_ORDERS:
            return {
                ...state, OrderList: action.orderData
            }



    }
    return state;
};

