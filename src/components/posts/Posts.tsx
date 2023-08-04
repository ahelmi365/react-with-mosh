// imports

import React, { useEffect, useState } from "react";
import { CanceledError } from "../../services/apiClient";
import postService, { IPost } from "../../services/postService";

const Posts = () => {
  //states
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // functions:
  // delete post
  const handleDeletePost = (id: number) => {
    // const originalPosts = [...posts];
    postService
      .delete(id)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        setError(error.message);
        // setPosts(originalPosts);
      });
  };

  // handleAddPost
  const handleAddPost = () => {
    const newPost = {
      userId: 0,
      id: 0,
      title: "new post",
      body: "new post body",
    };

    postService
      .create<IPost>(newPost)
      .then(({ data: savedPost }) => {
        setPosts([savedPost, ...posts]);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // handleUpdatePost
  const handleUpdatePost = (post: IPost) => {
    postService
      .update<IPost>(post)
      .then(({ data: updatedPost }) => {
        setPosts(
          posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
      })
      .catch(({ message }) => {
        setError(message);
      });
  };
  // useeffects:
  useEffect(() => {
    setIsLoading(true);

    const { request, cancel } = postService.getAll<IPost>();
    request
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // cleanup function
    return () => cancel();
  }, []);
  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={handleAddPost}>
        Add Usre
      </button>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && (
        <div className="w-100 text-center">
          <div className="spinner-border text-center text-primary"></div>
        </div>
      )}
      <ul className="list-group">
        {posts.map((post: IPost) => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between"
          >
            {post.id}. {post.title}
            <div className="control-btns d-flex gap-3">
              <button
                className="btn btn-warning"
                onClick={() => handleUpdatePost(post)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                key={post.id}
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
