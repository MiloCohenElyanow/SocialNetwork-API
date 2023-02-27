const router = require("express").Router();
const { getAllThoughts, getAThought, createNewThought, updateThought,
  addNewReaction, rmReaction, rmThought } = require("../../controllers/thoughtsController");


// /api/thought
router.route('/').get(getAllThoughts).post(createNewThought);

// /api/thought/:id
router.route('/:id').get(getAThought).put(updateThought).delete(rmThought);

// /api/thought/:id/reactions
router.route('/:id/reactions').post(addNewReaction);

// /api/thought/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(rmReaction);


module.exports = router;