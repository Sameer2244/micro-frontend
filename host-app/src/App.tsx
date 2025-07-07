import { Link } from "react-router-dom";
import { useGlobalState } from "./context/GlobalContext";
import LoggedInWrapper from "./components/LoggedInWrapper";
import ErrorBoundary from "./components/ErrorBoundary";
import React from "react";
const LikesComments = React.lazy(() => {
  return import("comments-likes/LikesComments");
});

function App() {
  const { publicArticles } = useGlobalState();
  return (
    <div>
      <LoggedInWrapper
        LoggedInComponent={
          <>
            <h1>Logged in</h1>
            <Link to="/add-article">add article</Link>
            <button
              onClick={() => {
                localStorage.removeItem("loggedIn");
              }}
            >
              logout
            </button>
          </>
        }
      >
        <Link to="/login">go to Login</Link>
      </LoggedInWrapper>
      <div className="flex flex-col justify-center items-center">
        {publicArticles.length > 0 ? (
          publicArticles?.map((article) => {
            return (
              <div key={article.id}>
                <h1 className="text-2xl font-medium">{article.title}</h1>
                <p className="text-base">{article.content}</p>

                {/* comments and likes from other app */}
                <ErrorBoundary>
                  <LikesComments article={article} />
                </ErrorBoundary>
              </div>
            );
          })
        ) : (
          <h1 className="text-2xl">No articles</h1>
        )}
      </div>
    </div>
  );
}

export default App;
