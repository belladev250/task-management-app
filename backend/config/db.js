// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect("mongodb://localhost:27017/user");
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose')
mongoose.pluralize()
  mongoose.connect(
    "mongodb://0.0.0.0:27017/Tasks",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
   
    }
).then(()=>console.log("connected to the database successfully"))
.catch((err)=>console.log(err))

