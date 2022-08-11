import CrewMember from "./CrewMember";

const CrewDetails = ({ crewMembers }) => {

    return (
        <div className="crew-details">
            {crewMembers.map((member, key) => (
                <div className="crew-detail" key={key}>
                    <CrewMember crewMember={member} />
                </div>
            ))}
        </div>
    );
}

export default CrewDetails;