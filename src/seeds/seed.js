const mongoose = require ("mongoose");
const {Thought, User, Reaction } = require("../models");

const db = "mongodb://127.0.0.1:27017/socialNetworkApiDB"

mongoose
  .connect(db, {
useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log(`connection to database: '${db}' --- success\n`);
  })
  .catch((err) => {
    console.log("---ERROR---: \n", err);
    console.log("make sure your not seeding this database twice, copies are not allowed!")
  })

const seedUsers = [
  {
    username: "Katherine",
    email: "Ketherine1155@gmail.com",
  },
  {
    username: "Josh",
    email: "JoshWork@gmail.com",
  },
  {
    username: "EpicGamerXx",
    email: "EpicGamer@hotmail.com",
  },
  {
    username:"BananaMan47",
    email: "MrBananaMan@gmail.com",
  }
];

const seedThoughts = [
  {
    thoughtText:"Im having a thought, a really cool one",
    username:"Josh",
  },
  {
    thoughtText:"this is a boring thought its not cool",
    username:"Katherine",
  },
  {
    thoughtText:"I love gaming so much!!!",
    username:"EpicGamerXx"
  },
  {
    thoughtText:"Eating banana's is super fun, its my favorite passtime!",
    username:"BananaMan47"
  }
];

const seedReactions = [
  {
    reactionContent: " holy cow this is so amazing thanks for making this thought!",
    username:"Katherine"
  },
  {
    reactionContent:"so sorry to hear you made a boring thought, better luck next time!",
    username:"Josh"
  },
  {
    reactionContent:"oh wow I like gaming too",
    username:"Josh"
  },
  {
    reactionContent:"I also like gaming lets play games together!",
    username:"Katherine"
  },
  {
    reactionContent:"I dont like bananas, stop eating bananas...",
    username:"EpicGamerXx"
  },
]

const seedDB = async () => {
  //deleting everything in db first
  console.log("deleting from db")
  // await User.deleteMany(UserSchema);
  // await Thought.deleteMany(seedThoughts);

  //inserting seeds
  await User.insertMany(seedUsers);
  await Thought.insertMany(seedThoughts);
  // await reaction.insertMany(seedReactions);
}

seedDB().then (() => {
  mongoose.connection.close();
  console.log("seeding completed succesfully");
});