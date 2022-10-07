const express = require("express");
const morgan = require('morgan');
const app = express();
const port = 3000;
const enarmStundetsRouter = require("./routes/enarmStudents"); 

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