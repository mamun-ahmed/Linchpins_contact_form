const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

const {forwardAuthenticated} = require('../config/auth');

/* GET users listing. */
router.get('/login', forwardAuthenticated ,UserController.landing);

router.post('/login', UserController.login);

router.get('/logout', UserController.logout);

router.post('/signup', UserController.signup);

module.exports = router;
