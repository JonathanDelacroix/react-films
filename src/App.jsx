import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Film from './components/Film';
import CommentForm from './components/CommentForm';
import Comments from './components/Comments';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch('https://jsonfakery.com/movies/random');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setMovie(data);
      } catch {
        setError('Erreur lors du chargement du film');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Film movie={movie} />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <CommentForm />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Comments />
        </Col>
      </Row>
    </Container>
  );
}

export default App;