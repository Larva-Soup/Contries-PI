import { clearFilters, getActivitiesFilter } from "../../redux/actions";

export const activitiesHandler = (e, dispatch) => {
    dispatch(getActivitiesFilter(e.target.value));
}

export const clearFiltersHandler = (dispatch) => {
    document.getElementById("continents").value="All Continents"
    document.getElementById("names").value = "";
    document.getElementById("population").value = "";
    document.getElementById("activities").value="";
    dispatch(clearFilters());
}
