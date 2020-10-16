export const SET_FILTER_DATA = 'SET_FILTER_DATA';

import baseUrl from '../../constants/baseUrl';





export const fetchFilterData = (catdata, id) => {

    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/itemcategory/viewfilter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                catId: catdata,
                userId: id

            })
        });

        const resData = await response.json();





        dispatch({ type: SET_FILTER_DATA, filterData: resData });
    }
};





// export const clearReduxCart = () => {

//     return { type: CLEAR_REDUX_CART, pid: 'productId' };
// };





