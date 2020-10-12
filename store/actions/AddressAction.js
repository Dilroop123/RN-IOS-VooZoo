
export const CREATE_ADDRESS = 'CREATE_ADDRESS';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_PRIMARY_ADDRESS = 'SET_PRIMARY_ADDRESS';
import baseUrl from '../../constants/baseUrl';



export const creatAddress = (CustomerName, PhoneNumber, HouseNumber, Street, UserId, City, LandMark, State, PinCode) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/address/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CustomerName,
                PhoneNumber,
                HouseNumber,
                Street,
                UserId,
                City,
                LandMark,
                State,
                PinCode



            })
        });

        const resData = await response.json();
        //  console.log(resData);

        dispatch({
            type: CREATE_ADDRESS, addData: resData

        });
    };
};


export const fetchAddress = (id) => {
    //console.log(id);
    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/address/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: id

            })
        });

        const resData = await response.json();

        // console.log(resData);



        dispatch({ type: SET_ADDRESS, addressDataUser: resData });
    }
};


export const getPrimaryAddress = (id) => {
    //console.log(id);
    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/address/primaryAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: id

            })
        });

        const resData = await response.json();

        // console.log(resData);



        dispatch({ type: SET_PRIMARY_ADDRESS, PrimaryData: resData });
    }
};


export const hideAddrress = (id) => {
    //console.log(id);
    return async dispatch => {
        const response = await fetch(baseUrl.url + 'api/v1/address/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                addressId: id,
                address_status: false

            })
        });

        const resData = await response.json();



        dispatch({ type: CREATE_ADDRESS, addressDataUser: resData });
    }
};



export const UpdateAddress = (id, CustomerName, PhoneNumber, HouseNumber, Street, City, LandMark, State, PinCode) => {

    //  console.log(LandMark);

    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/address/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                addressId: id,
                CustomerName,
                PhoneNumber,
                HouseNumber,
                Street,
                City,
                LandMark,
                State,
                PinCode



            })
        });

        const resData = await response.json();
        //  console.log(resData);

        dispatch({
            type: CREATE_ADDRESS, addData: resData

        });
    };
};



export const selectAddress = (newId, oldId) => {

    //  console.log(LandMark);

    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/address/setAddress', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newId,
                oldId


            })
        });

        const resData = await response.json();
        //  console.log(resData);

        dispatch({
            type: CREATE_ADDRESS, addData: resData

        });
    };
};