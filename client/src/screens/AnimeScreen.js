import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Container, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getRecommendations } from "../redux/actions/recommendations";
import axios from "axios";

const AnimeScreen = () => {
  const dispatch = useDispatch();
  const recommendations = useSelector(
    (state) => state.recommendations.recommendations
  );
  const params = useParams();
  const [currAnime, setCurrAnime] = useState(null); //Sets the current anime
  const [recAnime, setrecAnime] = useState([]); //Sets the recommended anime

  /* Getting Recommendations for Current Anime */
  useEffect(() => {
    dispatch(getRecommendations(params.id));
    console.log("recommendation", recommendations);
  }, [dispatch]);

  /* Fetching the Anime from Kitsu API */
  useEffect(() => {
    axios
      .get(`https://kitsu.io/api/edge/anime?filter%5Bid%5D=${params.id}`)
      .then((response) => {
        setCurrAnime(response.data.data[0]);
        console.log(response.data.data[0]);
        return axios.get(
          `https://kitsu.io/api/edge/anime?filter%5Btext%5D=${response.data.data[0].attributes.titles.en}?%5Blimit%5D=5`
        );
      })
      .then((response) => {
        setrecAnime(response.data);
      });

    console.log(recAnime);
    window.scroll(0, 0);
  }, [params]);

  return (
    <Container className="container">
      {/* Button to go back to previous page */}
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>
      <Row>
        {/* Displaying information of the current anime */}
        <Col md={4}>
          <Image src={currAnime?.attributes?.posterImage.medium} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{currAnime?.attributes?.titles.en}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Rated {currAnime?.attributes?.ageRating}</p>
              <p>{currAnime?.attributes?.ageRatingGuide}</p>
              <p>Episodes: {currAnime?.attributes?.episodeCount}</p>
              <p>Episode Length: {currAnime?.attributes?.episodeLength} min</p>
              <p>
                Status:{" "}
                {currAnime?.attributes?.status === "finished"
                  ? "finished"
                  : "Not Finished"}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Summary</h2>
              <p>{currAnime?.attributes?.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <br />
      <div>
        {/* ==== RECOMMENDATIONS ==== */}
        <h2>Similar Animes</h2>
        <Row>
          {recAnime?.data?.map((anime, index) =>
            index < 7 && index != 0 ? (
              <Col key={anime.id} sm={12} md={6} xl={3}>
                <Card className="my-3 p-3 rounded">
                  <Card.Img src={anime.attributes.posterImage.medium} />
                  <Card.Body>
                    <Card.Title as="h5">
                      <strong>{anime.attributes.titles.en}</strong>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ) : null
          )}

          {/* Mapping the recommendations */}
          {recommendations &&
            Object.values(recommendations).map((anime) => (
              <Col key={anime.id} sm={12} md={6} xl={3}>
                <Card className="my-3 p-3 rounded">
                  <Card.Img src={anime.poster_image} />
                  <Card.Body>
                    <Card.Title as="h5">
                      <strong>{anime.title_en}</strong>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </Container>
  );
};

export default AnimeScreen;
