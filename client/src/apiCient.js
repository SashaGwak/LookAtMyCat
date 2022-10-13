import axios from 'axios';

const apiCient = axios.create({
    baseURL: '/api'
});

export default apiCient;