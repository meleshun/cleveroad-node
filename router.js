const Router = require('koa-router');
const handleSequelizeValidationError = require('./middlewares/validationErrors');
const mustBeAuthenticated = require('./middlewares/mustBeAuthenticated');
const validationRouteParams = require('./middlewares/validationRouteParams');

const router = new Router({ prefix: '/api' });

router.use(require('./middlewares/session'));

// User
router.post('/register', handleSequelizeValidationError, require('./controllers/user').registration);
router.post('/login', require('./controllers/user').login);
router.get('/me', mustBeAuthenticated, require('./controllers/user').get);

// Items
router.get('/items', require('./controllers/product').getAll);
router.get('/items/:id', validationRouteParams, require('./controllers/product').getById);
router.put('/items/:id', validationRouteParams, mustBeAuthenticated, handleSequelizeValidationError, require('./controllers/product').update);
router.delete('/items/:id', validationRouteParams, mustBeAuthenticated, handleSequelizeValidationError, require('./controllers/product').remove);
router.post('/items', mustBeAuthenticated, handleSequelizeValidationError, require('./controllers/product').create);
router.post('/items/:id/images', validationRouteParams, mustBeAuthenticated, handleSequelizeValidationError, require('./controllers/product').updateImage);

module.exports = router;
