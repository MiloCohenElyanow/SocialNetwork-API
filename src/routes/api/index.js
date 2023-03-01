const router = require("express").Router();
const userRoutes = require("./usersRoutes");
const thoughtRoutes = require("./thoughtsRoutes");


router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;