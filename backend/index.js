const express = require("express");
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const corsOrigin = process.env.CORSORIGIN || 'http://54.86.172.9:4200';
const enarmStundetsRouter = require("./routes/enarmStudents"); 
const authRouter = require("./routes/auth"); 
const questionsRouter = require("./routes/questions-route.js");
const examRouter = require("./routes/exam-route.js");
const othersRouter = require("./routes/others.js"); 

const cors = require('cors');
const corsOptions ={
    origin: 'http://54.86.172.9:4200', 
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
  res.json({ message: "ok" });
});

app.use("/enarm-students", enarmStundetsRouter);
app.use("/auth", authRouter);
app.use("/questions", questionsRouter);
app.use("/exam", examRouter);
app.use("/others", othersRouter);
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
