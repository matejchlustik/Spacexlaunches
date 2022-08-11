import { Link } from "react-router-dom";

const LaunchFeed = ({ launches }) => {

    return (
        <div className="launch-feed">
            {launches.slice(0).reverse().map((launch, key) => (
                <div className="launch-preview" key={key}>
                    <Link to={`/launch/${launch.id}`}>
                        <h2>{launch.name}</h2>
                        <h4>{launch.date_utc.substring(0,10)}</h4>
                        <p>{launch.details.substring(0,200) + "..."}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default LaunchFeed;