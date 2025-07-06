'use client';

import { trpc } from '@/utils/trpc';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const utils = trpc.useUtils();

  const postQuery = trpc.post.getAll.useQuery(); // fetch all, or use a separate getOne
  const updatePost = trpc.post.update.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate();
      router.push('/posts');
    },
  });

  const post = postQuery.data?.find(p => p.id === Number(id));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (!post) return <div>Loading...</div>;

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Post</h1>

      <input
        className="border p-2 mb-2 block"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        className="border p-2 mb-4 block"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2"
        onClick={() => updatePost.mutate({ id: Number(id), title, content })}
      >
        Save Changes
      </button>
    </main>
  );
}
