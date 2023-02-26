const {connect, connection} = requier("mongoose");


const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkApiDB"

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology:true, // apparently this removes depreciated connection options 
});

module.exports = connection;