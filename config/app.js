require('dotenv').config();
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

const DOMAIN = process.env.DOMAIN || `http://${HOST}${PORT !== 80 ? `:${PORT}` : ''}`;

module.exports = {
  port: PORT,
  host: HOST,
  domain: DOMAIN,
  maxBodySize: process.env.MAX_BODY || 2 * 1024 * 1024,
  images: {
    dirname: path.join(__dirname, '../images'),
  },
  crypto: {
    iterations: (process.env.NODE_ENV !== 'production' ? 1 : 12000),
    length: 64,
    digest: 'sha512',
  },
  logger: {
    level: (process.env.NODE_ENV !== 'production' ? 'verbose' : 'info'),
  },
};
