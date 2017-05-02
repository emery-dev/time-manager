import axios from 'axios';
import { getIdToken } from './AuthService';

//add process.env.PORT || before localhost
const BASE_URL = process.env.PORT || 'http://localhost:3001';

export function getDailySchedule() {
  const url = `${BASE_URL}/api/todos`;
  console.log('url: ' + url);
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}` }}).then(response => response.data);
}
