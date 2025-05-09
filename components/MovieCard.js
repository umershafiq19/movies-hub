import Link from 'next/link';

export default function MovieCard({ movie }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <p className="mb-2">Year: {movie.releaseYear}</p>
      <p className="mb-2">Rating: {movie.rating}</p>
      <Link href={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
        View Details
      </Link>
    </div>
  );
}