var express = require('express');
var router = express.Router();

const SettingController = require('../controllers/SettingsController');
const SmtpSettingsController = require('../controllers/SmtpSettingsController');
const MailSettingsController = require('../controllers/MailSettingsController');

const {ensureAuthenticated} = require('../config/auth');

router.get('/index',ensureAuthenticated, SettingController.index);
router.get('/mail', ensureAuthenticated, SettingController.mail);
router.get('/user', ensureAuthenticated, SettingController.user);

router.post('/smtp', ensureAuthenticated, SmtpSettingsController.update);
router.post('/mail', ensureAuthenticated, MailSettingsController.update);


module.exports = router;
