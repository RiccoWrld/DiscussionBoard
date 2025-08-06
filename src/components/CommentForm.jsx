import { useState } from 'react';
import { supabase } from '../client';

export default function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content) return;
    await supabase.from('comments').insert({ post_id: postId, content });
    setContent('');
    onCommentAdded();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Leave a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Comment</button>
    </form>
  );
}