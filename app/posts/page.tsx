'use client';

import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export default function PostPage() {
  const utils = trpc.useUtils();
  const posts = trpc.post.getAll.useQuery();
  const createPost = trpc.post.create.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate();
      setTitle('');
      setContent('');
    },
  });
  const deletePost = trpc.post.delete.useMutation({
    onSuccess: () => utils.post.getAll.invalidate(),
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = () => {
    if (title && content) {
      createPost.mutate({ title, content });
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Posts</h1>

      <div className="mb-6">
        <input
          className="border p-2 mr-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          className="border p-2 mr-2"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Content"
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleCreate}>
          Create
        </button>
      </div>

      {posts.data?.map(post => (
        <div key={post.id} className="border-b py-2 flex justify-between items-center">
          <div>
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
          <div className="space-x-2">
            <a href={`/posts/edit/${post.id}`} className="text-blue-500">Edit</a>
            <button onClick={() => deletePost.mutate({ id: post.id })} className="text-red-500">
              Delete
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
