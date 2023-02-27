const router = require("express").Router();
const userRoutes = require("./usersRoutes");
const thoughtRoutes = require("./thoughtsRoutes");


router.use('/User', userRoutes);
router.use('/Thought', thoughtRoutes);

module.exports = router;