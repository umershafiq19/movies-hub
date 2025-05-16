// pages/movies/[id].js
// inside getStaticProps, getServerSideProps, or API route

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/movies/${params.id}`);
  if (!res.ok) return { notFound: true };

  const movie = await res.json();
  return {
    props: { movie },
  };
}

export default function MoviePage({ movie }) {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
    </div>
  );
}
