import { useGlobalState } from "host-app/GlobalContext";
import Link from "host-app/Link";
import { useState } from "react";

export default function ArticleForm() {
  const { users, addArticle } = useGlobalState();
  const [articles, setArticles] = useState({
    title: "",
    content: "",
    error: "",
  });
  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localStorage.getItem("loggedIn")) {
      setArticles({
        ...articles,
        error: "You are not logged in",
      });
      return;
    }
    if (articles.title.length > 0 && articles.content.length > 0) {
      const user = users.find(
        (user: any) => user.id === localStorage.getItem("loggedIn")
      );
      addArticle(localStorage.getItem("loggedIn"), {
        title: articles.title,
        content: articles.content,
        id: Date.now().toString(),
        likes: [],
        comments: [],
        addedby: user.name,
      });
      setArticles({
        title: "",
        content: "",
        error: "",
      });
    } else {
      setArticles({
        ...articles,
        error: "All fields are required",
      });
    }
  };
  return (
    <form
      onSubmit={handleAddArticle}
      className="flex gap-10 py-10 px-5 flex-col bg-[#E5E0D8] items-stretch w-[30rem] m-auto border border-[#D9A299] rounded-2xl text-center"
    >
      <h2 className="text-2xl">Create an article</h2>
      <input
        value={articles.title}
        className="p-2 border border-[#D9A299] bg-white rounded-[.25rem]"
        onChange={(e) =>
          setArticles({ ...articles, title: e.target.value, error: "" })
        }
        type="text"
        placeholder="Enter article title"
      />
      <textarea
        value={articles.content}
        className="p-2 border border-[#D9A299] bg-white rounded-[.25rem] min-h-[10rem]"
        onChange={(e) =>
          setArticles({ ...articles, content: e.target.value, error: "" })
        }
        placeholder="Enter article content"
      />
      <button
        type="submit"
        className="bg-[#FAF7F3] inline-block mx-4 py-2 px-4 rounded-[4px]"
      >
        Add article
      </button>
      <p className="text-[red]">{articles.error}</p>
      <Link>
        <span className="bg-[#FAF7F3] inline-block mx-4 py-2 px-4 rounded-[4px]">
          To Dashboard
        </span>
      </Link>
    </form>
  );
}
