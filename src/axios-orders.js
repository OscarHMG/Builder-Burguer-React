import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-builder-burguer.firebaseio.com/'
});

export default instance;