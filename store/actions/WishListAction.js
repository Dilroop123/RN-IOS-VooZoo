export const ADD_WHISHLIST = 'ADD_WHISHLIST';
export const SET_WHISHLIST = 'SET_WHISHLIST';
export const REMOVE_LIST = 'REMOVE_LIST';
import baseUrl from '../../constants/baseUrl';



export const addWishlist = (userId, itemCategoryId) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/wishlist/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                itemCategoryId

            })
        });

        const resData = await response.json();


        dispatch({
            type: ADD_WHISHLIST, userdata: resData

        });
    };
};


export const ViewWishlist = (userId) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/wishlist/View', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId


            })
        });

        const resData = await response.json();


        dispatch({
            type: SET_WHISHLIST, wishData: resData

        });
    };
};


export const RemoveWishList = (userId, itemCatId) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/wishlist/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                itemCatId

            })
        });



        dispatch({
            type: REMOVE_LIST, wishData: 'resData'

        });
    };
};




