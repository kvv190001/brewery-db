import { useEffect, useState } from "react";
import { useParams } from "react-router"

const BreweryDetail = () => {
    const { id } = useParams();

    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const getBreweryDetail = async () => {
            const details = await fetch(
                `https://api.openbrewerydb.org/v1/breweries/${id}`
            )

            const detailsJson = await details.json()

            setFullDetails(detailsJson)
            console.log(fullDetails)
        }

        getBreweryDetail().catch(console.error);
    }, [id])

    return (
        <div className="brewery-detail-page">
            <div className="brewery-detail-card">
                <h1 className="brewery-detail-name">{fullDetails?.name}</h1>
                <p className="brewery-detail-type">
                    {fullDetails?.brewery_type?.toUpperCase()} BREWERY
                </p>

                <div className="brewery-detail-info">
                    <div className="info-section">
                        <h3>📍 Address</h3>
                        <p>
                            {fullDetails?.street}, {fullDetails?.city}, {fullDetails?.state}{" "}
                            {fullDetails?.postal_code}
                        </p>
                        <p>{fullDetails?.country}</p>
                    </div>

                    {fullDetails?.phone && (
                        <div className="info-section">
                            <h3>📞 Phone</h3>
                            <p>{fullDetails?.phone}</p>
                        </div>
                    )}

                    {fullDetails?.website_url && (
                        <div className="info-section">
                            <h3>🌐 Website</h3>
                            <a
                                href={fullDetails?.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="brewery-detail-link"
                            >
                                Visit Website
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BreweryDetail