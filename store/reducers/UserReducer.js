//import PRODUCTS from '../../data/dummy-data';
import { CREATE_USER, UPDATE_GENDER, UPDATE_CONTACT, GENERATE_OTP } from '../actions/UserAction';
//import CurrentUser_Login from '../../model/Currentuser';
const initialState = {
    UserData: [],
    OtpData: []
};

export default (state = initialState, action) => {

    switch (action.type) {


        case CREATE_USER:


            return {
                ...state, UserData: action.userdata
            }
        case UPDATE_GENDER:
            return {
                ...state
            }

        case GENERATE_OTP:
            return {
                ...state, OtpData: action.otpdata
            }
        case UPDATE_CONTACT:
            return {
                ...state, UserData: action.userdata
            }

    }
    return state;
};

