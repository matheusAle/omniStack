const routes = new require('express').Router();
const PostController = require('./controllers/post.controller');
const LikeController = require('./controllers/like.controller');
const multer = require('multer');

routes.get('/', (req, res) => res.send('Hello!'))
const upload = multer(require('./config/upload'));

routes.post('/posts', upload.single('image'), PostController.store)
routes.get('/posts',  PostController.index)
routes.post('/posts/:post/like',  LikeController.store)

module.exports = routes;