import { useEffect, useState } from "react";
import postService, { IPost } from "../services/postService";
import { CanceledError } from "../services/apiClient";

const usePosts = () => {
  //states
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return { posts, error, isLoading, setPosts, setError, setIsLoading };
};

export default usePosts;
