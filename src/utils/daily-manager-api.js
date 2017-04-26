import axios from 'axios';
import { getIdToken } from './AuthService';

var connectionString = '';

const BASE_URL = 'http://time-manager-emery.herokuapp.com';

export function getDailySchedule() {
  const url = `${BASE_URL}/api/todos`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}` }}).then(response => response.data);
}
