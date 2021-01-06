import axios from "axios";

const fetchData = (url) => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export { fetchData };
