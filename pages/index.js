import { useContext, useEffect } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import { ThemeContext } from '@/contexts/ThemeContext';
import clientPromise from '@/lib/mongodb';

export async function getStaticProps() {
  const client = await clientPromise;
  const db = client.db('movies-hub');

  const [movies, genres, directors] = await Promise.all([
    db.collection('movies').find({}).toArray(),
    db.collection('genres').find({}).toArray(),
    db.collection('directors').find({}).toArray(),
  ]);

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
      genres: JSON.parse(JSON.stringify(genres)),
      directors: JSON.parse(JSON.stringify(directors)),
    },
    revalidate: 10,
  };
}

export default function Home({ movies, genres, directors }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="container">
      <header className="header">
        <h1>All Movies</h1>
        <button onClick={toggleTheme} className="toggle-btn">
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <h2>Genres</h2>
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>
                <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
              </li>
            ))}
          </ul>

          <h2>Directors</h2>
          <ul>
            {directors.map((director) => (
              <li key={director.id}>
                <Link href={`/directors/${director.id}`}>{director.name}</Link>
              </li>
            ))}
          </ul>
        </aside>

        <main className="main">
          <div className="grid">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
