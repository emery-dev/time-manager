import axios from 'axios';
import { getIdToken } from './AuthService';

var connectionString = 'postgres://rdcawzijsxueem:3d77bbab43a20d514b12f8481d322e830989fc94e4b83b2b76fc3155feb26cd0@ec2-54-204-0-88.compute-1.amazonaws.com:5432/d3kfgj5g8ds1fn';

const BASE_URL = connectionString || 'http://localhost:3001';

export function getDailySchedule() {
  console.log(process.env.DATABASE_URL);
  console.log(connectionString);

  const url = `${BASE_URL}/api/todos`;
  console.log('url: ' + url);
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}` }}).then(response => response.data);
}
