import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const GET_COUNTRY = "GET_COUNTRY";
export const FILTER_BY_CONTINENTS = "FILTER_BY_CONTINENTS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";

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
    return async function (dispatch){
        const country = (await axios.get(`http://localhost:3001/countries/${id}`)).data;
        dispatch({type: GET_COUNTRY, payload: country});
    }
}

export const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENTS, payload
  }
}

export const orderByName = (payload) =>{
  return {
    type: ORDER_BY_NAME, payload
  }
}