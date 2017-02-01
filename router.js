const router          = require('express').Router();

const BaseController  = require('./controllers/base');

router.get('/', BaseController.root);

module.exports = router;
