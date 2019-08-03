/* eslint-disable */
import axios from 'axios';
const API_URL = 'http://mydailyupdate.herokuapp.com'; /* http://groyce.pythonanywhere.com/ or http://localhost:8000 */
const NEWS_API = '5e1e0ae2beea466f8673c0ab1ae181f8';

export class APIService {
  constructor() {

  }

  getUser(param_pk) {
    const url = `${API_URL}/api/users/${param_pk}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.get(url, { headers: { Authorization: `jwt ${jwtToken}` } });
  }

  getUserList() {
    const url = `${API_URL}/api/users/`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.get(url, { headers: headers });

  }

  addNewUser(user) {
    const url = `${API_URL}/api/users/`;
    let jwtToken = localStorage.getItem('token');
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.post(url, user, { headers: headers });
  }

  updateUser(user) {
    const url = `${API_URL}/api/users/${user.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = { Authorization: `jwt ${jwtToken}` };
    console.log(user);
    return axios.put(url, user, { headers: headers });
  }

  deleteUser(user_pk) {
    const url = `${API_URL}/api/user/${user_pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.delete(url, { headers: headers });
  }

  getNewsForPage(user) {
    return axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API}`);
  }

  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    const response = axios.post(url, credentials);
    return response;
  }
}
