import { useEffect, useState } from 'react';
import { supabase } from '../client';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('discussion')  // Your table name
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching posts:', err);
    }
  }

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <CreatePost onPostCreated={fetchPosts} />

      {posts.length === 0 && <p>No posts found.</p>}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
