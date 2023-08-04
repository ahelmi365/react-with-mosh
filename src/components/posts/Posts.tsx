import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<IPost[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        setError((error as AxiosError).message);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <ul>
          {posts.map((post: IPost) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
