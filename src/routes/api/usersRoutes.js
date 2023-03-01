const router = require("express").Router();
const { getAllUsers, getUserById, createNewUser, updateUser,
  addFriend, rmUser, rmFriend } = require('../../controllers/usersController');

// /api/user
router.route('/').get(getAllUsers).post(createNewUser);

// /api/user/?id
router.route('/:id').get(getUserById).put(updateUser).delete(rmUser);

// /api/user/:id/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(rmFriend);


module.exports = router;