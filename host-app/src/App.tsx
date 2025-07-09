import { Link } from "react-router-dom";
import { useGlobalState } from "./context/GlobalContext";
import LoggedInWrapper from "./components/LoggedInWrapper";
import ErrorBoundary from "./components/ErrorBoundary";
import React from "react";
import { loadRemoteCss } from "./utilities/loadcss";

const LikesComments = React.lazy(() => {
  return import("comments-likes/LikesComments");
});
const remoteCssPath = [
  "http://localhost:4175/assets/tailwind.css",
  "http://localhost:4174/assets/tailwind.css",
  "http://localhost:4176/assets/tailwind.css",
];

//loading required css of all remote apps
try {
  Promise.all(loadRemoteCss(remoteCssPath));
} catch (error) {
  console.log(error);
}

function App() {
  const { publicArticles } = useGlobalState();
  return (
    <div>
      <div className="bg-[#D9A299] py-4">
        <LoggedInWrapper
          LoggedInComponent={
            <div className="flex justify-between px-10">
              <Link
                to="/add-article"
                className="bg-[#FAF7F3] inline-block mx-4 py-2 px-4 rounded-[4px]"
              >
                add article
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("loggedIn");
                  window.location.reload();
                }}
                className="bg-[#FAF7F3] inline-block mx-4 py-2 px-4 rounded-[4px]"
              >
                logout
              </button>
            </div>
          }
        >
          <Link
            to="/login"
            className="bg-[#FAF7F3] inline-block mx-4 py-2 px-4 rounded-[4px]"
          >
            go to Login
          </Link>
        </LoggedInWrapper>
      </div>
      <div className="flex flex-col justify-center items-center w-[70vw] mx-auto py-5">
        {publicArticles.length > 0 ? (
          publicArticles?.map((article) => {
            return (
              <div
                key={article.id}
                className="border border-[#D9A299] p-5 rounded-2xl w-full my-2"
              >
                <h1 className="text-2xl font-medium pb-2">{article.title}</h1>
                <p className="text-base">{article.content}</p>

                {/* comments and likes from other app */}
                <ErrorBoundary>
                  <LikesComments article={article} />
                </ErrorBoundary>
              </div>
            );
          })
        ) : (
          <h1 className="text-2xl">No articles found.</h1>
        )}
      </div>
    </div>
  );
}

export default App;
