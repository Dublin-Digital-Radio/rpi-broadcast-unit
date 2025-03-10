const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const { exec } = require("child_process");
const express = require("express");
const app = express();
const router = express.Router();

const staticPath = __dirname + "/views/";
const port = 8080;

router.get("/", function (req, res) {
  res.sendFile(staticPath + "index.html");
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
  setTimeout(async () => {
    if (!res.writableFinished) {
      darkice.stderr.removeAllListeners();

      const liveEventStreamConfig = await fetch(
        "https://ddr-cms.fly.dev/api/live-stream-config"
      ).then((response) => response.json());

      if (
        !liveEventStreamConfig.data.attributes.playerEnabled &&
        process.env.DDR_CMS_API_TOKEN
      ) {
        console.log("Updating live stream config");
        try {
          await fetch("https://ddr-cms.fly.dev/api/live-stream-config", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${process.env.DDR_CMS_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                playerEnabled: true,
              },
            }),
          }).then(async (response) => {
            if (!response.ok) {
              console.error(await response.text());
            }
          });
        } catch (error) {
          console.error(error);
        }
      }

      res.sendStatus(200);
    }
  }, 100);
});

router.get("/stop", async function (req, res) {
  console.log("stop");
  exec("killall darkice");
  const liveEventStreamConfig = await fetch(
    "https://ddr-cms.fly.dev/api/live-stream-config"
  ).then((response) => response.json());

  if (
    liveEventStreamConfig.data.attributes.playerEnabled &&
    process.env.DDR_CMS_API_TOKEN
  ) {
    try {
      await fetch("https://ddr-cms.fly.dev/api/live-stream-config", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.DDR_CMS_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            playerEnabled: false,
          },
        }),
      }).then(async (response) => {
        if (!response.ok) {
          console.error(await response.text());
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  res.sendStatus(200);
});

app.use(express.static(staticPath));
app.use("/", router);

app.listen(port, function () {
  console.log("Example app listening on port 8080!");
});
