import axios from "axios";
import { useState, useEffect } from "react";
import { getCountries } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countriesDefault);

  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryArray: [],
  });

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
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
    if(form.difficulty >=1 && form.difficulty <=5){
      setErrors({...errors, difficulty: ""})
    } else {
      setErrors({...errors, difficulty: "Outside difficulty range"})
    }
  }

  const validateDuration = (form) => {

  }

  const validateSeason = (form) => {
    if(form.season === "Primavera" || form.season === "Verano" || form.season === "Otoño" || form.season === "Invierno"){
      setErrors({...errors, season: ""})
    } else {
      setErrors({...errors, season: "Incorrect value"})
    }
  }

  const validateCountries = (form) => {
    if(form.countryArray.length > 0){
      setErrors({...errors, countryArray:""})
    }else{
      setErrors({...errors, countryArray:"Please select at least one country"})
    }
  }

  // const [countryName, setCountryName] = useState({id:"", name:""}) //pospuesto

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const changeTime = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    let hours = 0;
    let minutes = 0;

    if (prop === "hours") {
      hours = e.target.value;
    }
    if (prop === "minutes") {
      minutes = e.target.value;
    }

    setTime({ ...time, [prop]: value });

    return setForm({
      ...form,
      duration: `${hours || time.hours}:${minutes || time.minutes}`,
    });
  };

  const changeHandler = (e) => {
    const prop = e.target.name;
    const value = e.target.value;

    prop === "name" && validateName({ ...form, [prop]: value });
    prop === "difficulty" && validateDifficulty({...form, [prop]: value})
    prop === "season" && validateSeason({...form, [prop]: value})

    setForm({ ...form, [prop]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/activities", form);
  };

  const handleCountrySelect = (e) => {
    if(e.target.value === "") return;
    validateCountries({...form, countryArray: [...form.countryArray, e.target.value] })
    setForm({ ...form, countryArray: [...form.countryArray, e.target.value] });
  };

  const handleCountryUnselect = (e) => {
    const arr = form.countryArray.filter(
      (country) => country !== e.target.value
    );
    
    validateCountries({...form, countryArray: arr })
    setForm({ ...form, countryArray: arr });
  };

  // const filteredCountries = countries.filter((country)=>{
  //   country.id ===
  //  }
  //   )

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Activity Name: </label>
        <input type="text" name="name" onChange={changeHandler} />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>Difficulty: </label>
        <select name="difficulty" onChange={changeHandler}>
          <option value="">-select difficulty-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {errors.difficulty && <span>{errors.difficulty}</span>}
      </div>
      <div>
        <fieldset>
          <legend>Duration: </legend>
          <label>Hours: </label>
          <input
            type="number"
            min="0"
            max="12"
            name="hours"
            onChange={changeTime}
          />
          <label>Minutes:</label>
          <input
            type="number"
            min="0"
            max="59"
            name="minutes"
            onChange={changeTime}
          />
        </fieldset>
      </div>

      <div>
        <label>Season: </label>
        <select name="season" onChange={changeHandler}>
          <option value="">-select season-</option>
          <option value="Primavera">Spring</option>
          <option value="Verano">Summer</option>
          <option value="Otoño">Fall</option>
          <option value="Invierno">Winter</option>
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
