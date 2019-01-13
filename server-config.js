if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

require('dotenv').config({
  path: process.env.NODE_ENV.startsWith('prod')
    ? '.env.production'
    : '.env.development',
});

const { PORT } = process.env;

module.exports = {
  PORT,
};
