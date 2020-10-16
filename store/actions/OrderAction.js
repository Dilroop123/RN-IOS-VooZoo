export const CREATE_ORDER = 'CREATE_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
import baseUrl from '../../constants/baseUrl';



export const CreateOrder = (userId, cartData, addressId, MerchantMargin, orderStatus, PaymentMethod, OrderTotal, FinalCustomerPrice, ShippingPrice) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/order/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                cartData,
                addressId,
                MerchantMargin,
                orderStatus,
                PaymentMethod,
                OrderTotal,
                FinalCustomerPrice,
                ShippingPrice,


            })
        });

        const resData = await response.json();


        dispatch({
            type: CREATE_ORDER, RecivedResponse: resData

        });
    };
};


export const fetchOrder = (id) => {

    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/order/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: id

            })
        });

        const resData = await response.json();





        dispatch({ type: SET_ORDERS, orderData: resData });
    }
};



