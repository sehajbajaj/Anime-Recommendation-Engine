import axios from "axios";

/* For deployment purposes add the link to your website instead */
// const url = "http://127.0.0.1:8000/api/v1/anime";
const url = "https://animesculture.up.railway.app/api/v1/anime";
export const recommendAnime = (animeId) =>
  axios.get(`${url}/${animeId}/recommend/`);
