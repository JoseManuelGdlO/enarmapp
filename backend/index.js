const express = require("express");
const morgan = require('morgan');
const app = express();
const port = 3000;
const enarmStundetsRouter = require("./routes/enarmStudents"); 
const authRouter = require("./routes/auth"); 
const questionsRouter = require("./routes/questions-route.js");
const examRouter = require("./routes/exam-route.js");
const othersRouter = require("./routes/others.js"); 

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
  console.log(`Example app listening at http://localhost:${port}`);
});