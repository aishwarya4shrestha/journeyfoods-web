// import * as dotenv from 'dotenv';

// dotenv.config();

const api = '/api';

// let baseURI = 'http://172.16.5.202:5000/api/v1';
// let baseURI = 'http://localhost:5000/api/v1';
// let baseURI = 'http://35.184.127.217:5000/api/v1';
// let baseURI = 'http://35.224.47.226:80/api/v1';
let baseURI = 'http://127.0.0.1:5000/api/v1';
//demo@journeyfoods.com
//JF2019
// let baseURI = 'http://34.68.169.12:5000/api/v1';
// let baseURI = 'http://172.16.5.140:5000/api/v1';
// if (process.env.NODE_ENV === 'production') {
//   baseURI = ''; //TODO: Keep production url
// }

export default {
  baseURI: baseURI,
  app: {
    baseHref: '/',
    title: 'Nexxt portal'
  },
  api: {
    endpoints: {
      login: api + '/auth',
      product: api + '/projects/all'
    }
  }
};
