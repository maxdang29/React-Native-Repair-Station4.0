import axios from 'axios';

const API_URL = 'https://api-vrs.herokuapp.com/';

export default function callApi(
  endpoint,
  method = 'GET',
  body,
  Token,
  pageIndex = 1,
  limit = 100,
) {
  return axios({
    method: method,
    url: `${API_URL}${endpoint}?isDesc=true&limit=${limit}&offset=${pageIndex}`,
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
