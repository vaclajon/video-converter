const express = require("express");
const ffmpeg = require("fluent-ffmpeg");
const { path } = require("@ffmpeg-installer/ffmpeg");
const cors = require("cors");
const busboy = require("busboy");
ffmpeg.setFfmpegPath(path);

const app = express();

app.use(cors()); // TODO improve

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

  bb.on("file", (name, file, info) => {
    ffmpeg(file)
      .toFormat("mp3")
      .on("error", (err) => {
        // TODO improve

        res.status(500).send(err.message);
      })
      .on("end", () => {
        hasFile = true;
      })
      .pipe(res, { end: true });
  }).on("end", () => {
    if (!hasFile) {
      res.status(400).send("No file provided");
    }
  });

  req.pipe(bb);
});

app.listen(process.env.PORT || 3005);
