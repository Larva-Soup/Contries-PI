import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Countries App</h1>
      <Link to="/home">
        <button className={style.button}>Home</button>
      </Link>
    </div>
  );
};

export default Landing;
