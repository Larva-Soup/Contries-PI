import {
  FILTER_BY_CONTINENTS,
  GET_COUNTRIES,
  GET_COUNTRY,
  POST_ACTIVITY,
} from "./actions";

const initialState = {
  countriesDefault: [],
  countries: [],
  country: [],
  activities: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countriesDefault: action.payload,
        countries: action.payload,
      };
    case GET_COUNTRY:
      return { ...state, country: action.payload };
    case POST_ACTIVITY:
      return { ...state };
    case FILTER_BY_CONTINENTS:
      const allCountries = state.countriesDefault;
      const countriesByContinent =
        action.payload === "All"
          ? allCountries
          : allCountries.filter(
              (country) => action.payload === country.continents
            );
      return { ...state, countries: countriesByContinent };
    default:
      return { ...state };
  }
};

export default rootReducer;
