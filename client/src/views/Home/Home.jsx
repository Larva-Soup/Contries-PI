import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardContainer from "../../components/CardContainer/CardContainer";
import {getActivities, getCountries, getActivitiesList} from "../../redux/actions";
import style from './Home.module.css'


const Home = () => {

    const [loading, setLoading] = useState(false);
    

    const dispatch = useDispatch();

    useEffect(()=>{
        setLoading(true)
        dispatch(getCountries());
        dispatch(getActivities());
        dispatch(getActivitiesList());
        setLoading(false)
    }, [dispatch])

    

    return(<div className={style}>
    <CardContainer loading={loading} />

    <div className={style.homefooter}></div>

    </div>)
}

export default Home;