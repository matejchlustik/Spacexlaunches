import LaunchFeed from "./LaunchFeed";
import useFetch from "./useFetch";
import UpcomingLaunch from './UpcomingLaunch';

const Home = () => {
    const { data: launches, isPending, error } = useFetch("https://api.spacexdata.com/v5/launches");
    let filteredLaunches;
    if (launches) {
        filteredLaunches = launches.filter((launch) => launch.details);
    }

    return (
        <div className="home">
            <UpcomingLaunch />
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {launches && <LaunchFeed launches={filteredLaunches} />}
        </div>
    );
}

export default Home;