import React, { useEffect, useState } from "react";
import axios, { AxiosError, CanceledError } from "axios";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const deletePost = (id: number) => {
    // const originalPosts = [...posts];
    axios
      .delete("https://jsonplaceholder.typicode.com/xposts/" + id)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        setError(error.message);
        // setPosts(originalPosts);
      });
  };

  const addPost = () => {
    const newPost = {
      userId: 0,
      id: 0,
      title: "new post",
      body: "new post body",
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then(({ data: savedPost }) => {
        setPosts([savedPost, ...posts]);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    // 1. using async-await
    // const getData = async () => {
    //   try {
    //     const response = await axios.get<IPost[]>(
    //       "https://jsonplaceholder.typicode.com/posts"
    //     );
    //     setPosts(response.data);
    //   } catch (error) {
    //     setError((error as AxiosError).message);
    //   }
    // };
    // getData();

    // 2. using .then().cathc()
    const controller = new AbortController();
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        signal: controller.signal,
      })
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
    return () => {
      console.log("cleanup");
      controller.abort();
      setPosts([]);
      setError("");
      return;
    };
  }, []);
  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={addPost}>
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
            <button
              className="btn btn-outline-danger"
              key={post.id}
              onClick={() => deletePost(post.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
