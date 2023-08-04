import createHTTPService from "./httpService";
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const postService = createHTTPService("posts");
export default postService;
