// import logo from './logo.svg';

import { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";

function App() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  useEffect( () => {
    async function getPopularMovies () {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=` + page.toString())
      const json = await res.json()
      setMovies(old => old.concat(json['results']))
    }
    getPopularMovies()
  }, [page])
  return (
    <div className="App">
      <h1 style={{marginTop: "50px", marginBottom: "50px"}} className="text-center">Popular Movies</h1>
      <Container>
      <Row xs={1} md={2} className="g-4">
      {movies.map((movie, idx) => 
        <Card key={idx}>
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie['poster_path']}`} />
          <Card.Body>
            <Card.Title>{movie['title']}</Card.Title>
            <Card.Text>
              {movie['overview']}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      </Row>
      </Container>
      <Container className="justify-content-md-center">
        <Col xs="auto" className="text-center">
          <Button style={{marginTop: "50px", marginBottom: "50px"}} xs="auto" onClick={() => setPage(page +1)}>Show More</Button>
        </Col>
      </Container>
    </div>
  );
}

export default App;
