import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p className="meta">🕒 {new Date(post.created_at).toLocaleString()}</p>
      <p className="meta">👍 {post.upvotes} upvotes</p>
    </div>
  );
}