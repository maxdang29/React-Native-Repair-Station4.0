import axios from 'axios';

const API_URL = 'https://api-vrs.herokuapp.com/';

export default function callApi(
  endpoint,
  method = 'GET',
  body,
  Token,
  pageIndex = 1,
  limit = 100,
  option
) {
  return axios({
    method: method,
    url: `${API_URL}${endpoint}?&limit=${limit}&offset=${pageIndex}${option}`,
    data: body,
    headers: {
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'application/json',
    },
  })
    .then(function(response) {
      return response;
    })
    .catch(err => {
      throw err.response;
    });
}
