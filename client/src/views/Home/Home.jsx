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
    <h1>Esto es Home</h1>
    <CardContainer loading={loading} />

    </div>)
}

export default Home;