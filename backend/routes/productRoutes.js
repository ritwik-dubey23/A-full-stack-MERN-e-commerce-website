const router = require('express').Router();
const c = require('../controllers/productController');

router.get('/categories', c.categories);
router.get('/', c.list);
router.get('/:id', c.getOne);

module.exports = router;
