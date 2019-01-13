const nextRoutes = require('next-routes');

const routes = nextRoutes();
routes.add('index', '/:name?');

module.exports = routes;
