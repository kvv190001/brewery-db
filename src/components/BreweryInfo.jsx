
const BreweryInfo = ({ id, type, name, address, city, website }) => {
    return (
        <div>
            <li className= "main-list" key={id}>
                <h3>{name}</h3>
                <p>{type}</p>
                <p>{address}</p>
                <p>{city}</p>
                <p>{website}</p>
            </li>
        </div>
    )
}

export default BreweryInfo