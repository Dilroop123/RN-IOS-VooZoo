
import { SET_FILTER_DATA } from '../actions/FiltersAction';

const initialState = {
    FilterDataList: []
};

export default (state = initialState, action) => {

    switch (action.type) {


        case SET_FILTER_DATA:


            return {
                ...state, FilterDataList: action.filterData
            }


    }
    return state;
};

