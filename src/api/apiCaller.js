import axios from 'axios';

const API_URL = 'https://suaxe-api.herokuapp.com/';

export default function callApi(endpoint, method = 'GET', body, Token) {
  return axios({
    method: method,
    url: `${API_URL}${endpoint}?limit=100`,
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
