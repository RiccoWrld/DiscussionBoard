import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import CommentForm from '../components/CommentForm';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  async function fetchPost() {
    const { data, error } = await supabase.from('discussion').select('*').eq('id', id).single();
    if (error) {
      console.error('Error fetching post:', error);
      return;
    }
    setPost(data);
  }

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching comments:', error);
      return;
    }
    setComments(data);
  }

  async function handleUpvote() {
    // Assuming you have a Supabase RPC function called increment_upvotes
    const { error } = await supabase.rpc('increment_upvotes', { post_id: id });
    if (error) {
      console.error('Error upvoting:', error);
      return;
    }
    fetchPost();
  }

  async function handleDelete() {
    const { error } = await supabase.from('discussion').delete().eq('id', id);
    if (error) {
      console.error('Error deleting post:', error);
      return;
    }
    navigate('/');
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} alt="Post visual" />}
      <p className="meta">🕒 {new Date(post.created_at).toLocaleString()}</p>
      <p className="meta">👍 {post.upvotes} upvotes</p>

      <div className="actions">
        <button className="upvote" onClick={handleUpvote}>Upvote</button>
        <button className="delete" onClick={handleDelete}>Delete</button>
      </div>

      <CommentForm postId={id} onCommentAdded={fetchComments} />

      <h3>Comments:</h3>
      {comments.map((comment) => (
        <p key={comment.id} className="comment">{comment.content}</p>
      ))}
    </div>
  );
}

