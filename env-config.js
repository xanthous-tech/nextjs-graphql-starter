if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

require('dotenv').config({
  path: process.env.NODE_ENV.startsWith('prod') ? '.env.production' : '.env',
});

module.exports = {
  'process.env.PORT': process.env.PORT,
};
