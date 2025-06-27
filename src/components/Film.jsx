import { Card } from 'react-bootstrap';

const Film = ({ movie }) => {
  if (!movie) return null;

  return (
    <Card>
      <Card.Img variant="top" src={movie.poster_path} alt={movie.original_title} />
      <Card.Body>
        <Card.Title>{movie.original_title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Sortie le {new Date(movie.release_date).toLocaleDateString('fr-FR')}
        </Card.Subtitle>
        <Card.Text>{movie.overview}</Card.Text>
        <Card.Text>
          Note moyenne : {movie.vote_average} ({movie.vote_count} votes)
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Film;
