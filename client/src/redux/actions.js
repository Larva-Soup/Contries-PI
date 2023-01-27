import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const GET_COUNTRY = "GET_COUNTRY";
export const FILTER_BY_CONTINENTS = "FILTER_BY_CONTINENTS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const ACTIVITY_BY_NAME = "ACTIVITY_BY_NAME";
export const CREATE_ACTIVITIES_TABLE = "CREATE_ACTIVITIES_TABLE";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

// export const postActivity = (form) => {
//   return async function () {
//     console.log("adentro de la async")
//     const response = await axios.post("http://localhost:3001/activities", form);
//     return response;
//   };
// };

export const getCountries = () => {
  return async function (dispatch) {
    const countries = (await axios.get("http://localhost:3001/countries")).data;
    dispatch({ type: GET_COUNTRIES, payload: countries });
  };
};

export const getCountry = (id) => {
  return async function (dispatch) {
    const country = (await axios.get(`http://localhost:3001/countries/${id}`))
      .data;
    dispatch({ type: GET_COUNTRY, payload: country });
  };
};

export const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENTS,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByPopulation = (payload) => {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
};

export const getActivities = () => {
  return async function (dispatch) {
    const activity = (await axios.get("http://localhost:3001/activities")).data;
    dispatch({ type: GET_ACTIVITIES, payload: activity });
  };
};

export const getActivitiesList = () => {
  return{
    type: CREATE_ACTIVITIES_TABLE
  }
}

export const getActivitiesFilter = (payload) => {
  return {
    type: ACTIVITY_BY_NAME, payload
  }
}

export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS
  }
}