import axios from 'axios';
import { getIdToken } from './AuthService';

var connectionString = '';

//Uncomment here for production
const BASE_URL = 'http://time-manager-emery.herokuapp.com';
//const BASE_URL = 'http://localhost:3001';

export function getDailySchedule() {
  const url = `${BASE_URL}/api/todos`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}` }}).then(response => response.data);
}
