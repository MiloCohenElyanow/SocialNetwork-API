const {Schema, Types} = require("mongoose");
const dayjs = require("dayjs");

const ReactionsSchema = new Schema(
  {
    reactionId:{
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId()
    },
    reactionContent:{
      type:String,
      required:true,
      maxLength: 292, // setting byte limit to 2mb or 2048b 292 is rounded down.
    },
    username: {
      type:String,
      required:true
    },
    createdAt:{
      type:Date,
      default: Date.now,
      get: value => dayjs(value).format("MM DD, YYYY hh:mm")
    }
  },
  {
    toJSON: {
      getters:true
    },
    id:false
  }
);

module.exports = ReactionsSchema;