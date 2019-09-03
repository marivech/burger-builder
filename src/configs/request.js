import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-reactapp.firebaseio.com',
});

export default instance;