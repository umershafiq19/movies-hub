import { useContext, useEffect } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import { ThemeContext } from '@/contexts/ThemeContext';

export async function getStaticProps() {
  const [moviesRes, genresRes, directorsRes] = await Promise.all([
    fetch('http://localhost:3000/api/movies'),
    fetch('http://localhost:3000/api/genres'),
    fetch('http://localhost:3000/api/directors'), // fetch directors here
  ]);

  const moviesData = await moviesRes.json();
  const genresData = await genresRes.json();
  const directorsData = await directorsRes.json();

  return {
    props: {
      movies: moviesData.movies || [],
      genres: genresData.genres || [],
      directors: directorsData.directors || [],
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
