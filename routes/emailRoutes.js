const express = require('express');
const router = express.Router();

const{generate, send}=require('../controller/email');

router.post('/generate', generate);
router.post('/send', send);

module.exports = router ;