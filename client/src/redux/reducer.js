import { GET_COUNTRIES, POST_ACTIVITY} from "./actions";

const initialState = {
    countries:[],
    activities:[],
}

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {...state, countries: action.payload};
        case POST_ACTIVITY:
            return {...state}
        default:
            return {...state};
    }
}

export default rootReducer;