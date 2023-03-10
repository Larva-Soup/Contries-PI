import axios from "axios";
import { useState, useEffect } from "react";
import { getCountries, getActivitiesList } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { difficultyOptions, seasonOptions } from "./formHelpers";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [form, setForm] = useState({
    name: "",
    difficulty: "1",
    duration: "",
    season: "Primavera",
    countryArray: [],
  });

  const [time, setTime] = useState({
    hours: 1,
    minutes: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    hours: "",
    minutes: "",
    season: "",
    countryArray: "",
  });

  const [isValid, setIsValid] = useState(false);
  const activitiesList = useSelector((state) => state.activitiesHashTable);

  const validateName = (form) => {
    if (activitiesList[form.name.toLowerCase()]) {
      setIsValid(false);
      return setErrors({ ...errors, name: `${form.name} already exists` });
    } else {
      setErrors({ ...errors, name: "" });
      setIsValid(true);
    }

    if (/^([a-zA-Z0-9\sÁÉÍÓÚáéíóúÑñ#]+)$/.test(form.name)) {
      if (form.name.length < 4) {
        setIsValid(false);
        setErrors({ ...errors, name: "Too short" });
      } else {
        if (form.name.length > 30) {
          setIsValid(false);
          setErrors({ ...errors, name: "Too long" });
        } else {
          setIsValid(true);
          setErrors({ ...errors, name: "" });
        }
      }
    } else {
      setIsValid(false);
      setErrors({ ...errors, name: "Not permitted character(s)" });
    }

    if (form.name === "") {
      setIsValid(false);
      setErrors({ ...errors, name: "Empty field" });
    }
    // setForm({ ...form, countryArray: [...form.countryArray] });
  };

  const validateDifficulty = (form) => {
    if (form.difficulty < 1 || form.difficulty > 5) {
      setErrors({ ...errors, difficulty: "Please select a proper value" });
      setForm({ ...form, difficulty: "" });
      setIsValid(false);
    } else {
      setIsValid(true);
      setErrors({ ...errors, difficulty: "" });
    }
  };

  const validateHours = (time) => {
    if (/^(2[0-3]|[01]?[0-9])$/gm.test(time.hours)) {
      setErrors({ ...errors, hours: "" });
      setIsValid(true);
    } else {
      setErrors({ ...errors, hours: "from 0 to 23 hours only" });
      setIsValid(false);
    }
  };

  const validateMinutes = (time) => {
    // const regexcompleto = /^(2[0-3]|[01][0-9]):([0-5][0-9])$/gm
    if (/^([0-5]?[0-9])$/gm.test(time.minutes)) {
      setErrors({ ...errors, minutes: "" });
      setIsValid(true);
    } else {
      setErrors({ ...errors, minutes: "from 0 to 59 minutes only" });
      setIsValid(false);
    }
  };

  const validateBoth = (time) => {
    if (time.hours === "0" && time.minutes === "0") {
      setErrors({ ...errors, minutes: "Please input a proper time" });
      setIsValid(false);
      setTime({ ...time });
    }
    /* if(time.hours > 0){
      setErrors({...errors, minutes:""})
    } */
  };

  const validateSeason = (form) => {
    if (
      form.season === "Primavera" ||
      form.season === "Verano" ||
      form.season === "Otoño" ||
      form.season === "Invierno"
    ) {
      setErrors({ ...errors, season: "" });
      setIsValid(true);
    } else {
      setIsValid(false);
      setErrors({ ...errors, season: "Incorrect value" });
    }
  };

  const validateCountries = (form) => {
    if (form.countryArray.length > 0) {
      setIsValid(true);
      setErrors({ ...errors, countryArray: "" });
    } else {
      setIsValid(false);
      setErrors({
        ...errors,
        countryArray: "Please select at least one country",
      });
    }
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivitiesList());
  }, [dispatch]);

  const changeTime = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    let hours;
    let minutes;

    if (prop === "hours") {
      hours = e.target.value;
      validateHours({ ...time, [prop]: value });
    }
    if (prop === "minutes") {
      minutes = e.target.value;
      validateMinutes({ ...time, [prop]: value });
    }

    validateBoth({ ...time, [prop]: value });

    setTime({ ...time, [prop]: value });

    setForm({
      ...form,
      duration: `${hours || time.hours}:${minutes || time.minutes}`,
    });
  };

  const changeHandler = (e) => {
    const prop = e.target.name;
    const value = e.target.value;

    if (prop === "difficulty" && isNaN(value)) {
      validateDifficulty({ ...form, [prop]: value });
      return;
    }

    prop === "name" && validateName({ ...form, [prop]: value });
    prop === "difficulty" && validateDifficulty({ ...form, [prop]: value });
    prop === "season" && validateSeason({ ...form, [prop]: value });

    setForm({ ...form, [prop]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!form.countryArray.length) {
      setIsValid(false);
      setErrors({
        ...errors,
        countryArray: "Please select at least one country",
      });
      return;
    }
    axios.post("http://localhost:3001/activities", form);
    setForm({
      name: "",
      difficulty: "1",
      duration: "",
      season: "Primavera",
      countryArray: [],
    });
    setTime({
      hours: 1,
      minutes: 0,
    });
  };

  const handleCountrySelect = (e) => {
    if (e.target.value === "") return;
    if (form.countryArray.includes(e.target.value)) {
      setErrors({ ...errors, countryArray: `country already selected` });
      return;
    }
    validateCountries({
      ...form,
      countryArray: [...form.countryArray, e.target.value],
    });
    setForm({ ...form, countryArray: [...form.countryArray, e.target.value] });
  };

  const handleCountryUnselect = (e) => {
    const arr = form.countryArray.filter(
      (country) => country !== e.target.value
    );

    validateCountries({ ...form, countryArray: arr });
    setForm({ ...form, countryArray: arr });
  };

  return (
    <div className={style.form}>
      <form onSubmit={submitHandler} className={style.formform}>
        <div className={style.formchildren}>
          <label>Activity Name: </label>
          <input
            type="text"
            name="name"
            onChange={changeHandler}
            autoComplete="off"
            value={form.name}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div className={style.formchildren}>
          <label>Difficulty: </label>
          <select
            name="difficulty"
            onChange={changeHandler}
            value={form.difficulty}
          >
            {difficultyOptions.map((el) => (
              <option value={el.value} key={el.label}>
                {el.label}
              </option>
            ))}
          </select>
          {errors.difficulty && <span>{errors.difficulty}</span>}
        </div>
        <div className={style.formchildren}>
          <fieldset>
            <legend>Duration: </legend>
            <label>Hours: </label>
            <input
              type="text"
              name="hours"
              onChange={changeTime}
              value={time.hours}
            />
            {errors.hours && <span>{errors.hours}</span>}
            <label>Minutes:</label>
            <input
              type="text"
              name="minutes"
              onChange={changeTime}
              value={time.minutes}
            />
            {errors.minutes && <span>{errors.minutes}</span>}
          </fieldset>
        </div>

        <div className={style.formchildren}>
          <label>Season: </label>
          <select name="season" onChange={changeHandler} value={form.season}>
            {seasonOptions.map((season) => (
              <option value={season.value} key={season.label}>
                {season.label}
              </option>
            ))}
          </select>
          {errors.season && <span>{errors.season}</span>}
        </div>
        <div className={style.formchildren}>
          <label>Select countries</label>
          <select onChange={handleCountrySelect}>
            <option value="">-select country-</option>
            {countries.map((country) => {
              return (
                <option value={country.id} key={country.id}>
                  {country.name}
                </option>
              );
            })}
          </select>
          {errors.countryArray && <span>{errors.countryArray}</span>}
        </div>
        <div className={style.formchildren}>
          <label>Unselect countries</label>
          <select onChange={handleCountryUnselect}>
            <option>-unselect country-</option>
            {form.countryArray.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          disabled={!isValid}
          value="Send"
          className={style.formsubmit}
        />
      </form>
    </div>
  );
};

export default Form;
