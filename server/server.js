const express = require("express");
const ffmpeg = require("fluent-ffmpeg");
const { path } = require("@ffmpeg-installer/ffmpeg");
const cors = require("cors");
const busboy = require("busboy");
ffmpeg.setFfmpegPath(path);

const app = express();
const PORT = process.env.PORT;
app.use(cors()); // TODO improve

const convertFile = (file, output, onError) => {
  ffmpeg(file)
    .toFormat("mp3")
    .output(output, { end: true })
    .on("error", onError)
    .run();
};

// TODO to separate router file
app.post("/api/file", function (req, res) {
  // TODO improve overall structure, add proper error handling

  const bb = busboy({
    headers: req.headers,
    limits: {
      files: 1,
      fileSize: 1024 * 1024 * 10, // 10 MB
    },
  });

  let hasFile = false;

  bb.on("file", (_name, file) => {
    hasFile = true;
    convertFile(file, res, (err) => {
      // TODO improve

      res.status(500).send(err.message);
    });
  })
    .on("end", () => {
      if (!hasFile) {
        res.status(400).send("No file provided");
      }
    })
    .on("error", (err) => {
      // TODO improve
      res.status(500).send(err.message);
    });

  req.pipe(bb);
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
