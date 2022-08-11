import { useParams } from "react-router";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import CrewDetails from "./CrewDetails";
import CommentSection from "./CommentSection";

const LaunchDetails = () => {
    const { id } = useParams();
    const { data: launch, isPending, error } = useFetch("https://api.spacexdata.com/v5/launches/" + id);
    const [wider, setWider] = useState(false);

    // Ziskame širku a vyšku obrazku z url a v callback možeme s nimi niečo robiť
    function getMeta(url, callback) {
        let img = new Image();
        img.src = url;
        img.onload = function () { callback(this.width, this.height); }
    }

    useEffect(() => {
        if (launch && launch.links.flickr.original.length !== 0) {
            getMeta(launch.links.flickr.original[0], (width, height) => { if (width / height > 1) setWider(true) })
        }
    }, [launch])


    return (
        <div className="launch-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {launch && (
                <div>
                    <article>
                        <h1>{launch.name}</h1>
                        <h4>{launch.date_utc.substring(0, 10)}</h4>
                        <p>{launch.details}</p>
                        {launch.links.flickr.original.length !== 0 && wider &&
                            <img className="rocket-image-h" src={launch.links.flickr.original[0]} alt="launch" ></img>}
                        {launch.links.flickr.original.length !== 0 && !wider &&
                            <img className="rocket-image-w" src={launch.links.flickr.original[0]} alt="launch" ></img>}
                        {launch.crew.length !== 0 &&
                            <>
                                <h2>Crew</h2>
                                <CrewDetails crewMembers={launch.crew} />
                            </>
                        }
                    </article>
                    <CommentSection post_id={id} />
                </div>
            )}
        </div>
    );
}

export default LaunchDetails;