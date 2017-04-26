import axios from 'axios';
import { getIdToken } from './AuthService';

const BASE_URL = process.env.DATABASE_URL || 'http://localhost:3000';

export function getDailySchedule() {
  console.log(process.env.DATABASE_URL);
  const url = `${BASE_URL}/api/todos`;
  console.log('url: ' + url);
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}` }}).then(response => response.data);
}
