import { useState } from "react";
import { supabase } from "../client";

export default function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("discussion") // Your posts table
      .insert({
        title,
        image_url: imageUrl,
        upvotes: 0,
      });

    setLoading(false);

    if (error) {
      console.error("Insert error:", error);
      alert("Failed to create post: " + error.message);
      return;
    }

    setTitle("");
    setImageUrl("");

    if (onPostCreated) onPostCreated();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Post</h3>

      <input
        type="text"
        placeholder="Post title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        disabled={loading}
      />

      <input
        type="url"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
