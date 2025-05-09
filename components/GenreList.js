import Link from 'next/link';

export default function GenreList({ genres }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {genres.map((genre) => (
        <Link key={genre.id} href={`/genres/${genre.id}`} className="block p-4 border rounded-lg shadow-md hover:bg-gray-100">
          {genre.name}
        </Link>
      ))}
    </div>
  );
}