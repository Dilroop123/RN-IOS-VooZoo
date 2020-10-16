
import Category from '../../models/category';
import SubCategory from '../../models/subcategory';
import baseUrl from '../../constants/baseUrl';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SUBCATEGORY = 'SET_SUBCATEGORY';
export const SET_ITEM_CATEGORY = 'SET_ITEM_CATEGORY';
export const REMOVE_FROM_PRODUCTLIST = 'REMOVE_FROM_PRODUCTLIST';
export const SET_SLIDER = 'SET_SLIDER';
export const REMOVE_FROM_ITEMCATEGORY = 'REMOVE_FROM_ITEMCATEGORY';
export const UPDATE_ITEMCATEGORY = 'UPDATE_ITEMCATEGORY';
export const SET_PRODUCT = 'SET_PRODUCT';
export const REMOVE_FROM_SUBCATEGORY = 'REMOVE_FROM_SUBCATEGORY';
export const SET_HOME_ITEM_CATEGORY = 'SET_HOME_ITEM_CATEGORY';


export const fetchSliderImages = () => {

  return async dispatch => {

    const response = await fetch(baseUrl.url + 'api/v1/slider/view');

    const resData = await response.json();


    dispatch({ type: SET_SLIDER, sliderdata: resData });
  }
};


export const fetchCategory = () => {

  return async dispatch => {

    const response = await fetch(baseUrl.url + 'api/v1/category/view');

    const resData = await response.json();

    const loadedCatgeory = [];

    for (const key in resData) {

      loadedCatgeory.push(
        new Category(
          resData[key]._id,
          resData[key].categoryName,
          resData[key].categoryImage[0].privateUrl,
          resData[key].categoryStatus,
          resData[key].categoryHeader[0].privateUrl,
          false,
          resData[key].count
        )
      );
    }




    dispatch({ type: SET_CATEGORY, catdata: loadedCatgeory });
  }
};


export const fetchSubCategory = (catId) => {
  return async dispatch => {

    const response = await fetch(baseUrl.url + 'api/v1/subcategory/view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: catId

      })
    });

    const resData = await response.json();



    const loadedSubCatgeory = [];

    for (const key in resData) {

      loadedSubCatgeory.push(
        new SubCategory(
          resData[key]._id,
          resData[key].subCategoryName,
          resData[key].subCategoryImage[0].privateUrl,
          resData[key].subCategoryStatus,
          resData[key].filterlist,
          false,
          resData[key].count,

          //resData[key].subCategoryHeader[0].privateUrl
        )
      );
    }



    dispatch({
      type: SET_SUBCATEGORY, subcatdata: loadedSubCatgeory

    });
  };
};




export const fetchItemCategory = (catId, subCatId, userId) => {
  return async dispatch => {

    const response = await fetch(baseUrl.url + 'api/v1/itemcategory/view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        catId: catId,
        subCatId: subCatId,
        userId

      })
    });

    const resData = await response.json();

    dispatch({
      type: SET_ITEM_CATEGORY, itemcatdata: resData

    });
  };
};


export const fetchHomeLatestItemCategory = (userId) => {
  return async dispatch => {

    const response = await fetch(baseUrl.url + 'api/v1/itemcategory/homecategory', {
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
      type: SET_HOME_ITEM_CATEGORY, homecategory: resData

    });
  };
};

export const clearSubCategory = () => {
  return { type: REMOVE_FROM_SUBCATEGORY, pid: 'productId' };
};

export const clearItemCategory = () => {
  return { type: REMOVE_FROM_ITEMCATEGORY, pid: 'productId' };
};

export const clearProduct = () => {
  return { type: REMOVE_FROM_PRODUCTLIST, pid: 'productId' };
};



export const WhisListItemCategory = (id, value) => {

  return async dispatch => {

    const response = await fetch(baseUrl.url + 'api/v1/itemcategory/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        itemcatId: id,
        wishlist: value

      })
    });

    // const resData = await response.json();





    dispatch({
      type: UPDATE_ITEMCATEGORY, itemcatdata: 'resData'

    });
  };
};


export const fetchProduct = (catId, subCatId, itemId) => {
  return async dispatch => {

    const response = await fetch(baseUrl.url + 'api/v1/product/view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        catId: catId,
        subCatId: subCatId,
        itemcatId: itemId,
      })
    });

    const resData = await response.json();

    dispatch({
      type: SET_PRODUCT, productData: resData

    });
  };
};

export const fetchFilterProduct = (filter) => {
  return async dispatch => {

    const response = await fetch(baseUrl.url + 'api/v1/product/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter
      })
    });

    const resData = await response.json();

    dispatch({
      type: SET_PRODUCT, productData: resData

    });
  };
};