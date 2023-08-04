import apiClient from "./apiClient";
// interfaces:
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

class PostService {
  // get all posts
  getAllPosts() {
    const controller = new AbortController();
    const request = apiClient.get<IPost[]>("/posts", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  // delete post
  deletePost(id: number) {
    return apiClient.delete("/posts/" + id);
  }

  // addpost
  addPost(newPost:IPost) {
    return apiClient.post("/posts", newPost);
  }

  // updatePost
  updatePost(post: IPost) {
    return apiClient.patch("/posts/" + post.id, {
      title: post.title + "!!!",
    });
  }
}

export default new PostService();
