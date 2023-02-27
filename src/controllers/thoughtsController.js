const mongoose = require("mongoose");
const {Thoughts, Users} = require("../models");

async function getAllThoughts(req,res){
  try {
    const groupthoughts = await Thoughts.find()
    .populate({path: "reactions"});

    res.status(200).json(groupthoughts);
  } catch (error) {
    res.status(500).json(error);
  };
};

async function getAThought(req,res){
  try{
    const thought = await Thoughts.findOne({_id: req.params.id})
    .populate({path: "reactions"}); // this will get a thought by id

    if(!thought){
      res.status(500).json({message:"no thoughts found with id provided"});
    }else{
      res.status(200).json(thought);
    }
  }catch (error){
    res.status(500).json(error);
  };
};

async function createNewThought(req,res){
  try{
    const thought = await Thoughts.create(req.body);
    const updateUser = await Users.findOneAndUpdate(
      {username:req.body.username},
      {$push: {thoughts: thought._id}}, // refering to the user thoughts here, all these thoughts getting a bit confusing 
      {new: true}
    );
    if(!updateUser){
      res.status(500).json({message:"no user found with specified username"});
      return;
    }else{
      res.status(200).json(updateUser)};
  }catch(error){
    res.status(500).json(err);
  }
}

async function updateThought(req,res){
  try{
    const updatedThought = await Thoughts.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      {runValidators: true, new:true}
    );
    if(!updatedThought) {
      res.status(500).json({message: "no thought found with id provided"});
    }else{
      res.status(200).json(updatedThought);
    }
  } catch (error){
    res.status(500).json(error);
  };
};

async function addNewReaction(req,res) {
  try{
    const reaction = await Thoughts.findOneAndUpdate(
      {_id: req.params.id},
      { $push: { reactions: req.body}}, // reference user reactions here
      { runValidators: true, new:true}
    );
    if(!reaction){
      res.status(500).json({message:"could not find thought with id provided"});
    }else{
      res.status(200).json(reaction);
    }
  } catch(error){
    res.status(500).json(error);
  };
};


async function rmReaction (req,res) {
  try{
    const reaction = await Thoughts.findOneAndUpdate(
      {_id: req.params.id},
      {$pull: { reactions: { reactionId: req.params.reactionId}}},
      {new:true}
    );
    if(!reaction){
      res.status(500).json({message:"could not find thought with id provided"});
    }else{
      res.status(200).json(reaction);
    }
  }catch(error){
    res.status(500).json(error)
  };
};

async function rmThought(req,res){
  try{
    const removedThought = await Thoughts.findOneAndDelete({_id: req.params.id});

    if(!removedThought){
      res.status(500).json({message:"cannot delete thought with provided id, thought not found"});
    }else{
      res.status(200).json(removedThought);
    }
  }catch(error){
    res.status(500).json(error)
  };
};

module.exports = {
  getAllThoughts,
  getAThought,
  createNewThought,
  updateThought,
  addNewReaction,
  rmReaction,
  rmThought
};