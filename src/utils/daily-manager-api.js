import axios from 'axios';
import { getIdToken } from './AuthService';

var connectionString = '';

const BASE_URL = 'http://localhost:3001';

export function getDailySchedule() {
  console.log(process.env.DATABASE_URL);
  console.log(connectionString);

  const url = `${BASE_URL}/api/todos`;
  console.log('url: ' + url);
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}` }}).then(response => response.data);
}
