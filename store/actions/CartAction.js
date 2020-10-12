export const CREATE_CART = 'CREATE_CART';
export const SET_CART = 'SET_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const CLEAR_REDUX_CART = 'CLEAR_REDUX_CART';
export const DELETE_CART = 'DELETE_CART';
export const SET_BATCHICON = 'SET_BATCHICON';
export const UPDATE_CART = 'UPDATE_CART';
import baseUrl from '../../constants/baseUrl';



export const CreateCart = (PID, UId, SizeNumber, QuantityNumber, pay, ProductPrice, suplierName, suplierId) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/carts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: PID,
                userId: UId,
                size: SizeNumber,
                Quantity: QuantityNumber,
                PaymentMethod: pay,
                ProductPrice,
                suplierName,
                suplierId

            })
        });

        const resData = await response.json();
        //  console.log(resData.cartData.length);

        dispatch({
            type: SET_BATCHICON, batic: resData.cartData.length

        });
    };
};

export const setBatchIcon = (id) => {


    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/carts/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: id

            })
        });

        const resData = await response.json();





        dispatch({ type: SET_BATCHICON, batic: resData.length });
    }
};

export const fetchCart = (id) => {

    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/carts/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: id

            })
        });

        const resData = await response.json();





        dispatch({ type: SET_CART, cartUserData: resData });
    }
};

export const updateCart = (id, quantity) => {

    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/carts/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartId: id,
                Quantity: quantity

            })
        });

        const resData = await response.json();





        dispatch({ type: UPDATE_CART, cartUserData: resData });
    }
};

export const deleteCart = (id, userId) => {

    // console.log(id);
    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/carts/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                userId


            })
        });

        const cartdata = await response.json();

        console.log(response)



        dispatch({ type: DELETE_CART, cartUserData: cartdata.cardlength });
    }
};

export const clearReduxCart = () => {

    return { type: CLEAR_REDUX_CART, pid: 'productId' };
};


export const ClearCart = (id) => {

    // console.log(id);
    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/carts/clearCart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: id


            })
        });

        const resData = await response.json();

        console.log(resData);



        dispatch({ type: CLEAR_CART, cartUserData: 'resData' });
    }
};


