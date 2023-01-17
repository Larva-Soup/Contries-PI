import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "", 
    season: "",
  });

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
  });

  /* const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "", 
    season: "",
  }); */

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
      duration: `${hours || time.hours} hours and ${
        minutes || time.minutes
      } minutes`,
    });
  };

  const changeHandler = (e) => {
    const prop = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [prop]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/activities", form)
      .then((res) => alert(res))
      .catch((err) => alert(err));
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Activity Name: </label>
        <input type="text" name="name" onChange={changeHandler} />
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
      </div>
    </form>
  );
};

export default Form;
