require('dotenv').config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const corsOrigin = process.env.CORSORIGIN || 'http://54.86.172.9:4200';
const enarmStundetsRouter = require("./routes/enarmStudents"); 
const authRouter = require("./routes/auth"); 
const questionsRouter = require("./routes/questions-route.js");
const examRouter = require("./routes/exam-route.js");
const othersRouter = require("./routes/others.js"); 
const paymentRouter = require("./routes/payment.js"); 

const cors = require('cors');
const corsOptions ={
    origin: 'http://localhost:4200', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json({limit: '25mb'}));
app.use(
  express.urlencoded({
    extended: true,
    limit: '25mb'
  })
);

app.get("/", (req, res) => {
  console.log(process.env.STRIPE_SECRET_KEY_TEST);
  
  res.json({ version: "0.0.1", prosess: process.env.STRIPE_SECRET_KEY_TEST });
});

app.use("/enarm-students", enarmStundetsRouter);
app.use("/auth", authRouter);
app.use("/questions", questionsRouter);
app.use("/exam", examRouter);
app.use("/others", othersRouter);
app.use("/payment", paymentRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at YOUR_IP_INSTANCE:${port}`);
});
