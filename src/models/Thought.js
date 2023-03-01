const {Schema, Types, model} = require("mongoose");
const dayjs = require("dayjs");
const ReactionSchema = require("./Reaction");

const ThoughtSchema = new Schema(
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

ThoughtSchema.virtual("reactionsCount").get(function (){
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;