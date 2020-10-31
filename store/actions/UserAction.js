export const CREATE_USER = 'CREATE_USER';
export const UPDATE_GENDER = 'UPDATE_GENDER';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const GENERATE_OTP = 'GENERATE_OTP';
import baseUrl from '../../constants/baseUrl';



export const createUser = (phoneNumber, reciveotp, sessionkey) => {



    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/appusers/verifyOtp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile: phoneNumber,
                session_id: sessionkey,
                otp_input: reciveotp,
                fullName: '',
                email: '',
                pincode: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                dateOfBirth: ''

            })
        });

        const resData = await response.json();


        dispatch({
            type: CREATE_USER, userdata: resData

        });
    };
};


export const GenerateOtp = (mobilenumber) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/appusers/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile: mobilenumber,
                fullName: '',
                email: '',
                pincode: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                dateOfBirth: ''

            })
        });

        const resData = await response.json();


        dispatch({
            type: GENERATE_OTP, otpdata: resData

        });
    };
};


export const updateUserGender = (id, gendervalue, mobile, fullName) => {
    console.log(fullName);
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/appusers/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: id,
                gender: gendervalue,
                username: 'VooZoo' + mobile,
                fullName


            })
        });

        const resData = await response.json();


        dispatch({
            type: UPDATE_GENDER, userdata: resData

        });
    };
};



export const updateUserContact = (userID, fullName, mobile, email, pincode, address1, address2, city, state, dateOfBirth) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/appusers/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID,
                fullName,
                mobile,
                email,
                pincode,
                address1,
                address2,
                city,
                state,
                dateOfBirth

            })
        });

        const resData = await response.json();


        dispatch({
            type: UPDATE_CONTACT, userdata: resData

        });
    };
};

export const updateUserPersonal = (userID, dateOfBirth, gender) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/appusers/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID,
                dateOfBirth,
                gender



            })
        });

        const resData = await response.json();

        dispatch({
            type: UPDATE_CONTACT, userdata: resData

        });
    };
};



export const getUserById = (UserId) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/appusers/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                UserId


            })
        });

        const resData = await response.json();


        dispatch({
            type: CREATE_USER, userdata: resData
        });
    };
};