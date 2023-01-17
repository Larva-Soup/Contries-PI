import {useSelector} from "react-redux"
import Card from "../Card/Card"

const CardContainer = () => {
    const countries = useSelector(state => state.countriesDefault)
    return(<div>
        {countries.map(country => {
            return <Card
                key={country.id}
                name={country.name}
                flags={country.flags}
                continents={country.continents}
                id={country.id}
            />
        })}
    </div>)
}

export default CardContainer;