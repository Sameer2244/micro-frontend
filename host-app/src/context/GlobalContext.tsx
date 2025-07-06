import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { GlobalContextType } from "../types/context";
import type { ArticleType } from "../types/article";
import type { UserType } from "../types/user";
import {
  clearStorage,
  getArticleFromLocal,
  getFromLocal,
  loginUser,
  logoutUser,
  syncPublicArticles,
  syncWithLocal,
} from "../utilities/persistData";

const GlobalContext = createContext<GlobalContextType | null>(null);
export default function GlobalContextWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [publicArticles, setPublicArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    setUsers(getFromLocal());
    setPublicArticles(getArticleFromLocal());
  }, []);
  useEffect(() => {
    if (users.length > 0) {
      syncWithLocal(users);
    }
    console.log("saving...");
    if (publicArticles.length > 0) {
      syncPublicArticles(publicArticles);
    }
  }, [users, publicArticles]);
  const addUser = (user: UserType): void => {
    console.log("adding user...", user);
    setUsers((prevData) => {
      return prevData.map((user) => user).concat(user);
    });
  };

  const addPublicArticle = (article: ArticleType): void => {
    setPublicArticles((prevData) => {
      return prevData.map((article) => article).concat(article);
    });
  };

  const addArticle = (userId: string, article: ArticleType): void => {
    setUsers((prevData) => {
      return prevData.map((user) => {
        if (user.id === userId) {
          return { ...user, articles: user.articles.concat(article) };
        }
        return user;
      });
    });
  };
  const removeArticle = (userId: string, articleId: string): void => {
    setUsers((prevData) => {
      return prevData.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            articles: user.articles.filter(
              (article) => article.id !== articleId
            ),
          };
        }
        return user;
      });
    });
  };
  const loginUserHandler = (id: string): void => {
    loginUser(id);
  };
  const logoutUserHandler = () => {
    logoutUser();
  };
  const clearData = () => {
    clearStorage();
    setUsers([]);
  };
  const contextValue = useMemo(() => {
    return {
      users,
      addArticle,
      addUser,
      clearData,
      publicArticles,
      addPublicArticle,
      removeArticle,
      loginUserHandler,
      logoutUserHandler,
    };
  }, [
    users,
    addArticle,
    addUser,
    addPublicArticle,
    publicArticles,
    removeArticle,
  ]);
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalState = () => {
  const state = useContext(GlobalContext);
  if (!state) {
    console.log("Invalid Context state");
  }
  return state as GlobalContextType;
};
