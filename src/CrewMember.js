import useFetch from "./useFetch";

const CrewMember = ({ crewMember }) => {
    const { data: member, isPending, error } = useFetch("https://api.spacexdata.com/v4/crew/" + crewMember.crew);

    return (
        <div className="crew-member">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {member &&
                <div>
                    <div className="member-image-container">
                        <img className="crew-image" src={member.image} alt={member.name}></img>
                    </div>
                    <p>{member.name}</p>
                    <p>{crewMember.role}</p>
                </div>}
        </div>
    );
}

export default CrewMember;