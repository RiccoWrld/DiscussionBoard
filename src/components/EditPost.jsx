import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "../styles.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("discussion")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setPost(data);
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("discussion").update({
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
    }).eq("id", id);

    navigate(`/post/${id}`);
  };

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={post.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          value={post.content}
          placeholder="Content"
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="imageUrl"
          value={post.imageUrl}
          placeholder="Image URL"
          onChange={handleChange}
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;