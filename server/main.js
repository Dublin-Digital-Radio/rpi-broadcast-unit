const { exec } = require("child_process");
const express = require("express");
const app = express();
const router = express.Router();

const path = __dirname + "/views/";
const port = 8080;

router.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

router.get("/start", function (req, res) {
  console.log("start");
  const darkice = exec("darkice", (error) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  darkice.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send(data);
  });

  // If after 100ms no error responses have been sent, assume it's all good
  setTimeout(() => {
    if (!res.writableFinished) {
      darkice.stderr.removeAllListeners();
      res.sendStatus(200);
    }
  }, 100);
});

router.get("/stop", function (req, res) {
  console.log("stop");
  exec("killall darkice");
  res.sendStatus(200);
});

app.use(express.static(path));
app.use("/", router);

app.listen(port, function () {
  console.log("Example app listening on port 8080!");
});
