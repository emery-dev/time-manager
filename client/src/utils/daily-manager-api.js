import axios from 'axios';
import { getIdToken } from './AuthService';

//const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'http://localhost:3000';

export function getDailySchedule() {
  const url = `${BASE_URL}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}` }}).then(response => response.data);
}
