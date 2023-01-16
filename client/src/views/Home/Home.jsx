import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardContainer from "../../components/CardContainer/CardContainer";
import {getCountries} from "../../redux/actions"


const Home = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountries())
    }, [dispatch])

    return(<>
    <h1>Esto es Home</h1>
    <CardContainer />

    </>)
}

export default Home;