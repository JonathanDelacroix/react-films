import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
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
              <Card.Img variant="top" src={movie.poster_path} alt={movie.original_title}/>
              <Card.Body>
                <Card.Title>{movie.original_title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Sortie le {new Date(movie.release_date).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})}
                </Card.Subtitle>
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
              <Card className="mb-2 noComment">
                <Card.Body>
                  <Card.Text className="mb-1">Aucun commentaire pour le moment.</Card.Text>
                </Card.Body>
              </Card>
          ) : (
            <ListGroup>
              {comments.map((c) => (
                <ListGroup.Item key={c.id} >
                  <div className="mb-1">
                    <strong>Note: {c.note}/5</strong>
                  </div>
                  <div className="mb-2">
                    {c.comment}
                  </div>
                  <div className="text-end">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}>
                      Supprimer
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default App