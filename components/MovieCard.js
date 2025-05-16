import Link from 'next/link';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={styles.text}>Year: {movie.releaseYear}</p>
      <p className={styles.text}>Rating: {movie.rating}</p>
      <Link href={`/movies/${movie._id}`} className={styles.button}>
        View Details
      </Link>
    </div>
  );
}
