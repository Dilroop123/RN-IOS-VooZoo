export const ADD_SOCIALSHARE = 'ADD_SOCIALSHARE';
export const SET_SOCAILSHARE = 'SET_SOCAILSHARE';
export const REMOVE_LIST = 'REMOVE_LIST';
import baseUrl from '../../constants/baseUrl';



export const addSocialShare = (userId, itemCategoryId) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/socialShare/create', {
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
        //console.log(resData);

        dispatch({
            type: ADD_SOCIALSHARE, userdata: resData

        });
    };
};


export const ViewSocailShare = (userId) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/socialShare/View', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId


            })
        });

        const resData = await response.json();
        //console.log(resData);

        dispatch({
            type: SET_SOCAILSHARE, socialShare: resData

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

        //  const resData = await response.json();
        //console.log(resData);

        dispatch({
            type: REMOVE_LIST, wishData: 'resData'

        });
    };
};




