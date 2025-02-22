require("dotenv").config();
require("express-async-errors");   
const express = require("express");
const axios = require("axios");

//for security, using helmet package
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors());

const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./database/connect.js");
const authenticateUser = require("./middlewares/authentication");


app.get('/', (_, res) => {
  res.send("hello!");
})

app.use(morgan("tiny"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/profiles", express.static(path.join(__dirname, "Profiles")));

app.set("trust proxy", 1);
app.use(
   rateLimiter({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100000, // limit each IP to 100 requests per windowMs
   })
 );

app.use(express.json());
 app.use(
   helmet({
     crossOriginResourcePolicy: false,
   })
 );
 app.use(xss());  

//routers
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const adminRouter = require("./routes/admin.js");
const adoptionRouter = require("./routes/Adoptions.js");
const messageRouter = require("./routes/messages.js");
const serviceRouter = require("./routes/serviceRequests.js");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profiles", authenticateUser, profileRouter);
app.use("/api/v1/admins", authenticateUser, adminRouter);
app.use("/api/v1/adoptions", authenticateUser, adoptionRouter);
app.use("/api/v1/messages", authenticateUser, messageRouter);
app.use("/api/v1/services", authenticateUser, serviceRouter);

//establishing a port
const port = process.env.PORT || 8080;

//creating a function to start the connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server started. Listening on port ${port} ...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
