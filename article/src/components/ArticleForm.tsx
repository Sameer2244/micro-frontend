import { useGlobalState } from "host-app/GlobalContext";
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
      style={{
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
        width: "40rem",
      }}
    >
      <input
        value={articles.title}
        onChange={(e) => setArticles({ ...articles, title: e.target.value })}
        type="text"
        placeholder="Enter article title"
      />
      <textarea
        value={articles.content}
        onChange={(e) => setArticles({ ...articles, content: e.target.value })}
        placeholder="Enter article content"
      />
      <button type="submit">Add article</button>
      {articles.error}
    </form>
  );
}
