import type { ArticleType } from "../types/article";
import type { UserType } from "../types/user";

const LOCAL_STORAGE_KEY = "blogStorage";
const LOCAL_PUBLIC_ARTICLE = "publicArticles";
const LOCAL_LOGIN_KEY = "loggedIn";

export const syncWithLocal = (users: UserType[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
};
export const syncPublicArticles = (article: ArticleType[]) => {
  localStorage.setItem(LOCAL_PUBLIC_ARTICLE, JSON.stringify(article));
};

export const clearStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const getFromLocal = (): UserType[] => {
  if (localStorage.getItem(LOCAL_STORAGE_KEY) !== "undefined") {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]") as
      | UserType[];
  } else {
    return [];
  }
};

export const getArticleFromLocal = (): ArticleType[] => {
  if (localStorage.getItem(LOCAL_PUBLIC_ARTICLE) !== "undefined") {
    return JSON.parse(localStorage.getItem(LOCAL_PUBLIC_ARTICLE) ?? "[]") as
      | ArticleType[];
  } else {
    return [];
  }
};

export const loginUser = (userid: string) => {
  localStorage.setItem(LOCAL_LOGIN_KEY, userid);
};
export const logoutUser = () => {
  localStorage.removeItem(LOCAL_LOGIN_KEY);
};
