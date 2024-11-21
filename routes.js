var express = require('express');
var router = express.Router();
var controller = require('./controller.js');

router.get('/index', controller.get_index);
router.get('/login', controller.get_login);
router.get('/signup', controller.get_signup);

router.post('/login', controller.post_login);
router.post('/signup', controller.post_signup);

module.exports = router;