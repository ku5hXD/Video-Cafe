const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoute = require("./routers/userRouter");
const Auth = require("./middleware/Auth");
dotenv.config();

const connectionURL = process.env.MONGODB_SERVER_URI;

// model
var VideoDetails = require("./models/videoDetails");
var User = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(cookieParser());
app.use(express.static("public")); // this let's the front end (react) code to access the files that are on back end (node) server (not from the database)

mongoose.connect(connectionURL, { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));

app.post("/submit", Auth, async (req, res) => {
  var video_details = new VideoDetails({
    videoLink: req.query.videolink,
    videoName: req.query.videoname,
    description: req.query.videodescription,
    category: req.query.videocategory,
    uploadDate: new Date(),
    thumbnailPath: "https://i.ytimg.com/vi/AwhyFo5N0cg/maxresdefault.jpg",
    owner: req.user._id,
  });
  video_details.save(function (err, videodetail) {
    if (err) return console.error(err);
    // console.log(videodetail.videoname + " saved to video-details collection.");
    res.send("video details stored in DB")
  });
});

app.get("/details2", async (req, res) => {
  if (req.query.id) {
    await VideoDetails.findOne({ _id: mongoose.Types.ObjectId(req.query.id) })
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    if (!req.query.category) {
      var tempArr;
      await VideoDetails.find({})
        .then((arr) => {
          tempArr = arr;
        })
        .catch((err) => {
          console.log(err);
        });

      // for adding video owner name and picture to the fetched data
      var finalArr = [];
      var tempArrLength = tempArr.length;
      tempArr.forEach(async (element, index) => {
        await User.findOne({ _id: element.owner })
          .then((data) => {
            element = { ...element._doc, ownerName: data.name, ownerAvatar: data.avatar }
            finalArr = [...finalArr, element]
            tempArrLength--;
            if (tempArrLength === 0) {
              res.status(201).send(finalArr);
            }
          })
      });
    } else {
      var tempArr;
      await VideoDetails.find({ category: req.query.category })
        .then((arr) => {
          tempArr = arr;
        })
        .catch((err) => {
          console.log(err);
        });

      // for adding video owner name and picture to the fetched data
      var finalArr = [];
      var tempArrLength = tempArr.length;
      tempArr.forEach(async (element, index) => {
        await User.findOne({ _id: element.owner })
          .then((data) => {
            element = { ...element._doc, ownerName: data.name, ownerAvatar: data.avatar }
            finalArr = [...finalArr, element]
            tempArrLength--;
            if (tempArrLength === 0) {
              res.status(201).send(finalArr);
            }
          })
      });

    }
  }
});

app.get("/date", async (req, res) => {
  await VideoDetails.find({})
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getName", Auth, async (req, res) => {
  res.send(req.user.name);
});



app.get("/getVideoById", Auth, async (req, res) => {
  await VideoDetails.find({ owner: req.user._id })
    .then((arr) => {
      res.status(201).send(arr);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8000, function () {
  console.log("server is running");
});
