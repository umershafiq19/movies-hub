import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-6">Sorry, we couldn't find the page you're looking for.</p>
      <button onClick={() => router.push('/')} className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700">
        Go Home
      </button>
    </div>
  );
}