export const CREATE_REVIEW = 'CREATE_REVIEW';
export const SET_REVIEW_ITEMCATEGORY = 'SET_REVIEW_ITEMCATEGORY';
export const SET_REVIEW_PRODUCT = 'SET_REVIEW_PRODUCT';
export const SET_ALL_REVIEW_PRODUCT = 'SET_ALL_REVIEW_PRODUCT';
export const SET_ALL_REVIEW_ITEM_CAT_PRODUCT = 'SET_ALL_REVIEW_ITEM_CAT_PRODUCT';
import baseUrl from '../../constants/baseUrl';



export const createReview = (userId, productId, itemcategoryId, review, rating, reviewImages, productGraphLine, supplierId) => {

    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/reviews/addReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                productId,
                itemcategoryId,
                review,
                rating,
                reviewImages,
                productGraphLine,
                supplierId
            })
        });

        const resData = await response.json();


        dispatch({
            type: CREATE_REVIEW, RecivedResponse: resData

        });
    };
};


export const fetchItemCategoryReviews = (itemcategoryId) => {

    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/reviews/getReviewsItemcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemcategoryId

            })
        });

        const resData = await response.json();





        dispatch({ type: SET_REVIEW_ITEMCATEGORY, reviewdata: resData });
    }
};


export const fetchProductReviews = (itemcategoryId, productId) => {

    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/reviews/getReviewsProductItemcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemcategoryId,
                productId

            })
        });

        const resData = await response.json();





        dispatch({ type: SET_REVIEW_PRODUCT, productreview: resData });
    }
};

export const fetchAllProductReviews = (itemcategoryId, productId) => {

    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/reviews/allReviewsProductItemcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemcategoryId,
                productId

            })
        });

        const resData = await response.json();

        dispatch({ type: SET_ALL_REVIEW_PRODUCT, allproductreview: resData });
    }
};

export const fetchAllItemCategoryReviews = (itemcategoryId) => {

    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/reviews/allReviewsItemcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemcategoryId


            })
        });

        const resData = await response.json();

        dispatch({ type: SET_ALL_REVIEW_ITEM_CAT_PRODUCT, allItemCatreview: resData });
    }
};
