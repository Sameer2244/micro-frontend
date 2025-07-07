export interface ArticleType {
  id: string;
  title: string;
  content: string;
  addedby: string;
  likes: string[];
  comments: { id: string; comment: string; addedby: string }[];
}
