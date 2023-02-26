const {Schema, Types, model} = require("mongoose");
const dayjs = require("dayjs");
const ReactionSchema = require("./Reaction");

const ThoughtsSchema = new Schema(
  {

    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    thoughtText: {
      type:String,
      required:true,
      minLength:8,
      maxLength: 292, // setting byte limit to 2mb or 2048b 292 is rounded down.
    },
    createdAt:{
      type:Date,
      default:Date.now,
      get: value=> dayjs(value).format("MM DD, YYYY hh:mm")
    },
    username: {
      type:String,
      required:true,
    },
    reactions: [ReactionSchema]
  },
  {

    toJSON: {
      virtuals: true,
      getters: true
    },
    id:false
  }
);

ThoughtsSchema.virtual("reactions").get(function (){
  return this.reactions.length;
});

const Thoughts = model("Thought", ThoughtsSchema);

module.exports = Thoughts;