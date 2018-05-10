const FRONTEND_DEV_URLS = [ 'http://localhost:3000' ];
const FRONTEND_PROD_URLS = [ 'https://grace-shopper-j2a2.herokuapp.com/' ];

const FRONTEND_URLS = process.env.NODE_ENV === 'production'
  ? FRONTEND_DEV_URLS
  : FRONTEND_PROD_URLS;

module.exports = FRONTEND_URLS;
