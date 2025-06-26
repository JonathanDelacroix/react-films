import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from './store/commentSlice';
import CommentForm from './CommentForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("https://jsonfakery.com/movies/random");
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.statusText ? response.statusText + ' - ' : ''}${response.status}`);
        const data = await response.json();
        setMovie(data);
        console.log(data);
      } catch (err) {
        setError("Une erreur est survenue lors de la récupération des films.");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const handleDelete = id => {
    dispatch(deleteComment(id))
  };

  if (error) return <p>{error}</p>;
  if (loading) return <p>Chargement...</p>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          {movie && (
            <Card>
              <Card.Img variant="top" src={movie.poster_path}/>
              <Card.Body>
                <Card.Title>{movie.original_title}</Card.Title>
                <Card.Text>Sortie le {movie.release_date}</Card.Text>
                <Card.Text>{movie.overview}</Card.Text>
                <Card.Text>Note moyenne : {movie.vote_average} ({movie.vote_count} votes)</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <CommentForm />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          {comments.length === 0 ? (
            <p>Aucun commentaire pour l’instant.</p>
          ) : (
            comments.map(c => (
              <Card key={c.id} className="mb-2">
                <Card.Body>
                  <Card.Text>{c.comment}</Card.Text>
                  <Card.Text><strong>Note:</strong> {c.note}/5</Card.Text>
                  <Button variant="danger" onClick={() => handleDelete(c.id)}>Supprimer</Button>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default App