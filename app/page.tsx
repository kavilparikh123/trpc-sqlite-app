import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to the tRPC SQLite App</h1>
      <Link href="/posts" className="text-blue-600 underline">
        Go to Posts
      </Link>
    </div>
  );
}
