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
    <div className="py-5 px-4 border border-[#D9A299] my-5 rounded-2xl">
      <p>
        Article Added by <span>{article.addedby}</span>
      </p>
      <button
        className="bg-[#FAF7F3] inline-block py-2 px-4 rounded-[4px]"
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
            className="p-2 border border-[#D9A299] bg-white rounded-[.25rem]"
            type="text"
            value={commentinput}
            onChange={(e) => setCommentinput(e.target.value)}
            placeholder="add comment"
          />
          <button type="submit">Add comment</button>
        </form>
        {article.comments.map((comment) => {
          return (
            <div className="p-2 my-1" key={comment.id}>
              <span>{comment.addedby}: </span>
              {comment.comment}
            </div>
          );
        })}
      </div>
    </div>
  );
}
