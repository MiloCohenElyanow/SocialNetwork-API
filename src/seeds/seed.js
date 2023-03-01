const mongoose = require ("mongoose");
const {Thought, User } = require("../models");

const db = "mongodb://127.0.0.1:27017/socialNetworkApiDB"

mongoose
  .connect(db, {
useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log(`connection to database: '${db}' --- success\n`);
  })
  .catch((err) => {
    console.log("---ERROR---: \n", err);
  })

const seedUsers = [
  {
    username: "Katherine",
    email: "Ketherine1155@gmail.com",
  },
  {
    username: "Josh",
    email: "JoshWork@gmail.com",
  }
];

const seedThoughts = [
  {
    _id:1,
    thoughtText:"Im having a thought, a really cool one",
    Date: Date.now,
    username:"Josh",
    reaction:"3092rniodsf90p2io3n"
  },
  {
    _id:2,
    thoughtText:"this is a boring thought its not cool",
    Date: Date.now,
    username:"Katherine",
    reaction:"9032njfidksfn320ioewknf"
  }
];

const seedDB = async () => {
  //deleting everything in db first
  console.log("deleting from db")
  await User.deleteMany({seedUsers});
  await Thought.deleteMany({seedThoughts});

  //inserting seeds
  await User.insertMany(seedUsers);
  await Thought.insertMany(seedThoughts);
  // await reaction.insertMany(seedReactions);
}

seedDB().then (() => {
  mongoose.connection.close();
});