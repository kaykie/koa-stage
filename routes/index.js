const router = require('koa-router')();
const article_controller = require('../app/controllers/article_controller');


router.get('/api/article/get', article_controller.getArticle);

router.post('/api/article/delete', article_controller.deleteArticle);



module.exports = router;
