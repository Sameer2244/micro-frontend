import type { ArticleType } from "./article";
import type { UserType } from "./user";

export interface GlobalContextType {
  users: UserType[];
  publicArticles: ArticleType[];
  addUser: (user: UserType) => void;
  addArticle: (userId: string, article: ArticleType) => void;
  clearData: () => void;
  addPublicArticle: (article: ArticleType) => void;
  removeArticle: (userId: string, articleId: string) => void;
  loginUserHandler: (user: string) => void;
  logoutUserHandler: () => void;
}
