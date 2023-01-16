import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
// export const GET_COUNTRY = "GET_COUNTRY";

export const getCountries = () => {
  return async function (dispatch) {
    const countries = (await axios.get("http://localhost:3001/countries")).data;
    dispatch({ type: GET_COUNTRIES, payload: countries });
  };
};

// export const getCountry = (id) => {
//     return async function (dispatch){
//         const country = (await axios.get(`http://localhost:3001/countries/${id}`)).data;
//         dispatch({type: GET_COUNTRY, payload: country});
//     }
// }
