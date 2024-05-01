const router = require('express').Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { register, login, checkAuth } = require('../controller/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/check-auth', verifyToken, checkAuth);

module.exports = router;