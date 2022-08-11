import { useContext, useState } from "react";
import useFetch from "./useFetch";
import { UserContext } from "./UserContext";

const CommentSection = ({ post_id }) => {

    const { data: comments, isPending, error } = useFetch("http://localhost:8000/comment/" + post_id);
    const [content, setContent] = useState("");
    const { user } = useContext(UserContext);

    const getDateTime = (comment) => {
        const date = comment.createdAt.substring(0, 10);
        const fullDate = new Date(comment.createdAt);
        let minutes = "" + fullDate.getMinutes();
        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        const time = `${fullDate.getHours()}:${minutes}`;
        const dateTime = `${date} ${time}`;
        return dateTime;
    }

    const handleClick = async () => {
        const payload = { content, user, post_id }
        try {
            const res = await fetch("http://localhost:8000/comment", {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            if (data.comment) {
                comments.push(data.comment);
            }
        } catch (err) {
            console.log(err);
        }
        setContent("");
    }

    return (
        <div className="comment-section">
            {user && (
                <div className="text-field-container">
                    <h2>Discussion</h2>
                    <div className="text-field">
                        <textarea
                            rows="5"
                            placeholder="Write a comment"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="text-field-footer">
                            <button className="btn" onClick={handleClick}>Comment</button>
                        </div>
                    </div>
                </div>
            )}
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {comments && (
                <div className="comments">
                    {comments.map((comment, key) => (
                        <div className="comment" key={key}>
                            <p className="comment-user">{comment.user}</p>
                            <p className="comment-date-time">{getDateTime(comment)}</p>
                            <p className="comment-content">{comment.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentSection;