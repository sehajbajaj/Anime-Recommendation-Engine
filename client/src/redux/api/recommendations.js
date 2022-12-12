import axios from "axios";

/* Recommendations from the Django Framework */
/* For deployment purposes add the link to your website instead */
// const url = "http://127.0.0.1:8000/api/v1/anime";
const url = "https://animeculture.up.railway.app/api/v1/anime";
export const recommendAnime = (animeId) =>
  axios.get(`${url}/${animeId}/recommend/`);
