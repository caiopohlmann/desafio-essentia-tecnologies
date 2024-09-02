const express = require('express');
const userController = require('../controllers/usercontroller');
const listController = require('../controllers/listcontroller');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.signin);

router.post('/add-list', validateToken.validateToken, listController.createList);
router.get('/get-list/:id', validateToken.validateToken, listController.getList);
router.delete('/delete-list/:id', validateToken.validateToken, listController.deleteList);
router.post('/add-task', validateToken.validateToken, listController.createTask);
router.delete('/delete-task/:id', validateToken.validateToken, listController.deleteTask);

module.exports = router;
