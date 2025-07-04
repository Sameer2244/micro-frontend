import type { ArticleType } from "./article";

export interface UserType {
  id: string;
  name: string;
  password: string;
  articles: ArticleType[];
}
