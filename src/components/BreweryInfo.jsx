const BreweryInfo = ({ id, type, name, address, city, website }) => {
    return (
        <li className="main-list" key={id}>
            <p>{name}</p>
            <p>{type}</p>
            <p>{address}</p>
            <p>{city}</p>
            <p>
                <a href={website} target="_blank" rel="noopener noreferrer">
                    {website.replace(/^https?:\/\//, "")}
                </a>
            </p>
        </li>
    )
}

export default BreweryInfo
