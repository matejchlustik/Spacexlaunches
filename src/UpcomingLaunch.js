import useFetch from "./useFetch";
import { useState, useEffect } from "react";


const UpcomingLaunch = () => {
    const { data: launch, isPending, error } = useFetch("https://api.spacexdata.com/v5/launches/upcoming");

    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            if (launch) {
                let now = new Date().getTime()
                let time = new Date(launch[0].date_utc);
                let distance = time.getTime() - now;
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (distance > 0) {
                    setCountdown(`${days} : ${hours} : ${minutes} : ${seconds}`);
                } else {
                    clearInterval(interval);
                    setCountdown("Already launched");
                }
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [launch])


    return (
        <div className="upcoming">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {launch && <div>
                <p className="countdown">{countdown}</p>
                <p>Days Hours Minutes Seconds</p>
                <p>Until {launch[0].name} mission</p>
            </div>}
        </div>
    );
}

export default UpcomingLaunch;