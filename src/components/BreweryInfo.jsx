import { Link } from "react-router";

const BreweryInfo = ({ id, type, name, address, city, website }) => {
  return (
    <li className="main-list" key={id}>
      <p>
        <Link
          to={`/breweryDetails/${id}`}
          style={{
            color: "#646cff",
            textDecoration: "none",
          }}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        >
          {name}
        </Link>
      </p>
      <p>{type}</p>
      <p>{address}</p>
      <p>{city}</p>
      <p>{website}</p>
    </li>
  );
};

export default BreweryInfo;
