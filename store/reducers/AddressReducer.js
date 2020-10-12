
import { CREATE_ADDRESS, SET_ADDRESS, SET_PRIMARY_ADDRESS } from '../actions/AddressAction';

const initialState = {
    AddressData: [],
    PrimaryData: []
};

export default (state = initialState, action) => {

    switch (action.type) {


        case CREATE_ADDRESS:


            return {
                ...state
            }
        case SET_ADDRESS:
            // console.log(action.addressDataUser);
            return {
                ...state, AddressData: action.addressDataUser
            }
        case SET_PRIMARY_ADDRESS:
            return {
                ...state, PrimaryData: action.PrimaryData
            }

    }
    return state;
};

