require("dotenv").config();

const express = require("express");
const Hackle = require("@hackler/javascript-sdk");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Server SDK Key
const hackleClient = Hackle.createInstance(process.env.HACKLE_SERVER_KEY);

hackleClient.onReady(() => {
  console.log("Hackle Ready");

  app.post("/track", (req, res) => {
    const { userId, eventName, properties } = req.body;

    console.log("EVENT:", eventName, properties);

    // 이벤트 객체
    const event = {
      key: eventName,
      properties: properties || {}
    };

    // 사용자 객체 
    const user = {
      userId: userId
    };

    try {
      hackleClient.track(event, user);
    } catch (err) {
      console.error("Hackle Track Error:", err);
    }

    res.sendStatus(200);
  });

  app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
  });
});

// 서버 종료 시 남은 이벤트 flush
process.on("SIGINT", function () {
  console.log("Closing Hackle...");
  hackleClient.close();
  process.exit();
});
