const router = require('express').Router();
const c = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', c.get);
router.post('/', c.add);
router.delete('/', c.clear);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
