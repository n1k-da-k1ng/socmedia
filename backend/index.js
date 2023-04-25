const express=require("express");
const app = express();
const mongoose =require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute= require("./routes/users");
const authRoute= require("./routes/auth");
const pinRoute = require("./routes/pins");

dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to Mongo!');
})
.catch((error) => {
  console.error('Error connecting to Mongo!', error);
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users" , userRoute);
app.use("/api/auth" , authRoute);
app.use("/api/pins", pinRoute);
// app.use("/api/conversations", conversationRoute);
// app.use("/api/messages", messageRoute);

app.listen(8800,()=>{
    console.log("Backend server is runing!")
})