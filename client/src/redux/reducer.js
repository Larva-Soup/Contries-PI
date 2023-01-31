import {
  ACTIVITY_BY_NAME,
  CLEAR_FILTERS,
  CREATE_ACTIVITIES_TABLE,
  FILTER_BY_CONTINENTS,
  GET_ACTIVITIES,
  GET_COUNTRIES,
  GET_COUNTRY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  POST_ACTIVITY,
  SEARCH_BY_NAME,
} from "./actions";

const initialState = {
  countriesDefault: [],
  countries: [],
  country: [],
  activities: [],
  activitiesHashTable: {},
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
        action.payload === ""
          ? allCountries
          : allCountries.filter(
              (country) => action.payload === country.continents
            );
      return { ...state, countries: countriesByContinent };
    case ORDER_BY_NAME:
      const allCountriesByName = state.countries;
      if (action.payload === "") return;
      else if (action.payload === "asc") {
        allCountriesByName.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      } else {
        allCountriesByName.sort(function (a, b) {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
      }
      return { ...state, countries: [...allCountriesByName] };

    case ORDER_BY_POPULATION:
      const countriesByPopulation = state.countries;
      if (action.payload === "") return;
      else if (action.payload === "asc") {
        countriesByPopulation.sort(function (a, b) {
          if (a.population < b.population) {
            return -1;
          }
          if (a.population > b.population) {
            return 1;
          }
          return 0;
        });
      } else {
        countriesByPopulation.sort(function (a, b) {
          if (a.population < b.population) {
            return 1;
          }
          if (a.population > b.population) {
            return -1;
          }
          return 0;
        });
      }
      return { ...state, countries: [...countriesByPopulation] };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case CREATE_ACTIVITIES_TABLE:
      const hashTable = {};
      for (const activity of state.activities) {
        !hashTable[activity.name] && (hashTable[activity.name.toLowerCase()] = true);
      }
      return {
        ...state,
        activitiesHashTable: { ...state.activitiesHashTable, ...hashTable },
      };
    case ACTIVITY_BY_NAME:
      let countriesWithActivity = [];
      for (const activity of state.activities) {
        if (activity.name === action.payload) {
          countriesWithActivity = [...activity.countries];
        }
      }
      return { ...state, countries: countriesWithActivity };
    case CLEAR_FILTERS:
      return{...state, countries: state.countriesDefault};
    case SEARCH_BY_NAME:
      return{...state, countries: action.payload};
    default:
      return { ...state };
  }
};

export default rootReducer;
