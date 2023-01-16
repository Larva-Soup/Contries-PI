import {useSelector} from "react-redux"
import Card from "../Card/Card"

const CardContainer = () => {
    const countries = useSelector(state => state.countries)
    return(<div>
        {countries.map(country => {
            return <Card
                key={country.id}
                name={country.name}
                flags={country.flags}
                continents={country.continents}
            />
        })}
    </div>)
}

export default CardContainer;