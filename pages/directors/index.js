import useSWR from 'swr';
import DirectorList from '@/components/DirectorList';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Directors</h1>
      <DirectorList directors={data} />
    </div>
  );
}
