import axios from "axios";
import { useState, useEffect } from "react";
import { getCountries } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { difficultyOptions, seasonOptions } from "./formHelpers";

const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country);

  const [form, setForm] = useState({
    name: "",
    difficulty: "1",
    duration: "",
    season: "Primavera",
    countryArray: [],
  });

  const [time, setTime] = useState({
    hours: 0,
    minutes: 1,
  });

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    hours: "",
    minutes: "",
    season: "",
    countryArray: "",
  });

  const validateName = (form) => {
    if (/^([a-zA-Z0-9\sÁÉÍÓÚáéíóúÑñ#]+)$/.test(form.name)) {
      if (form.name.length < 4) {
        setErrors({ ...errors, name: "Too short" });
      } else {
        setErrors({ ...errors, name: "" });
      }
    } else {
      setErrors({ ...errors, name: "Not permitted character(s)" });
    }

    if (form.name === "") {
      setErrors({ ...errors, name: "Empty field" });
    }
  };

  const validateDifficulty = (form) => {
    if (form.difficulty < 1 || form.difficulty > 5) {
      setErrors({ ...errors, difficulty: "Please select a proper value" });
      setForm({ ...form, difficulty: "" });
    } else {
      setErrors({ ...errors, difficulty: "" });
    }
  };

  const validateHours = (time) => {
    if (/^(2[0-3]|[01]?[0-9])$/gm.test(time.hours)) {
      setErrors({...errors, hours:""});

    } else {
      setErrors({ ...errors, hours: "from 0 to 23 hours only" });
    }
  }

  const validateMinutes = (time) => {
    // const regexcompleto = /^(2[0-3]|[01][0-9]):([0-5][0-9])$/gm
    if(/^([0-5]?[0-9])$/gm.test(time.minutes)){
      setErrors({...errors, minutes:""})
    }else{
      setErrors({...errors, minutes: "from 0 to 59 minutes only"})
    }
  };

  const validateBoth = (time) => {
    if(time.hours === "0" && time.minutes === "0"){
      setErrors({...errors, minutes:"Please input a proper time"})
      setTime({...time})
    }/* if(time.hours > 0){
      setErrors({...errors, minutes:""})
    } */
  }

  const validateSeason = (form) => {
    if (
      form.season === "Primavera" ||
      form.season === "Verano" ||
      form.season === "Otoño" ||
      form.season === "Invierno"
    ) {
      setErrors({ ...errors, season: "" });
    } else {
      setErrors({ ...errors, season: "Incorrect value" });
    }
  };

  const validateCountries = (form) => {
    if (form.countryArray.length > 0) {
      setErrors({ ...errors, countryArray: "" });
    } else {
      setErrors({
        ...errors,
        countryArray: "Please select at least one country",
      });
    }
  };

  // const [countryName, setCountryName] = useState({id:"", name:""}) //pospuesto

  useEffect(() => {
    dispatch(getCountries());
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

    validateBoth({...time, [prop]: value})

    setTime({...time, [prop]: value});

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

  // const abortSubmit = () => {
  //   if (!Object.values(errors).includes("")) {
  //     console.log("no vas a ningún lado")
  //     return;
  //   }
  // }

  //se puede cambiar este
  const submitHandler = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/activities", form);
  };

  const handleCountrySelect = (e) => {
    if (e.target.value === "") return;
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
    <form onSubmit={submitHandler}>
      <div>
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
      <div>
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
      <div>
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

      <div>
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
      <div>
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
      <div>
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

      <input type="submit" />
    </form>
  );
};

export default Form;
