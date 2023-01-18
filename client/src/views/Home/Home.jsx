import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardContainer from "../../components/CardContainer/CardContainer";
import {getCountries} from "../../redux/actions"


const Home = () => {

    const [loading, setLoading] = useState(false);
    

    const dispatch = useDispatch();

    useEffect(()=>{
        setLoading(true)
        dispatch(getCountries());
        setLoading(false)
    }, [dispatch])

    

    return(<>
    <h1>Esto es Home</h1>
    <CardContainer loading={loading} />

    </>)
}

export default Home;