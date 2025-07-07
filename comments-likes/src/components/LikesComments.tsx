import { useGlobalState } from "host-app/GlobalContext";
import { useState, type FormEvent } from "react";

export default function LikesComments({
  article,
}: Readonly<{
  article: {
    addedby: string;
    id: string;
    likes: string[];
    comments: { id: number; comment: string; addedby: string }[];
  };
}>) {
  const { addComment, toggleArticleLike, users } = useGlobalState();
  const [commentinput, setCommentinput] = useState("");
  return (
    <div>
      <p>
        Article Added by <span>{article.addedby}</span>
      </p>
      <button
        onClick={() => {
          if (localStorage.getItem("loggedIn")) {
            toggleArticleLike(localStorage.getItem("loggedIn"), article.id);
          } else {
            alert("You are not logged in");
          }
        }}
      >
        likes <span>{article.likes.length}</span>
      </button>
      <div>
        comments
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!localStorage.getItem("loggedIn")) {
              alert("You are not logged in");
              return;
            }
            const user = users.find(
              (user: any) => user.id === localStorage.getItem("loggedIn")
            );
            addComment(article.id, commentinput, user.name);
            setCommentinput("");
          }}
        >
          <input
            type="text"
            value={commentinput}
            onChange={(e) => setCommentinput(e.target.value)}
            placeholder="add comment"
          />
          <button type="submit">Add comment</button>
        </form>
        {article.comments.map((comment) => {
          return (
            <div key={comment.id}>
              <span>{comment.addedby}: </span>
              {comment.comment}
            </div>
          );
        })}
      </div>
    </div>
  );
}
