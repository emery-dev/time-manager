import axios from 'axios';
import { getIdToken } from './AuthService';

//const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'ec2-54-204-0-88.compute-1.amazonaws.com';

export function getDailySchedule() {
  const url = `${BASE_URL}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}` }}).then(response => response.data);
}
