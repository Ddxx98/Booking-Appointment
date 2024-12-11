const express = require('express');
const userController = require('../controllers/user')

const router = express.Router();

router.get('/',userController.getUser);

router.post('/',userController.createUser)

router.delete('/:email',userController.deleteUser)

router.put('/:email',userController.editUser)

router.get('/email/:email',userController.getUserByEmail)

module.exports = router;