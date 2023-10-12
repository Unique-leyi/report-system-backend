const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const config = require("./config/index.js");
const uploadImage = require("./middleware/uploadimage");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();
const { port, allowedDomains  } = config;

app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.json({ limit: "25mb" }));

app.use(
  cors({
    origin: allowedDomains,
    credentials: true,
  })
);
app.use(cookieParser());

app.post("/api/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.status(200).json({ message: url }))
    .catch((err) => res.status(500).json({ error: err }))
});

app.post("/api/uploadImages", (req, res) => {
  uploadImage.uploadMultipleImages(req.body.images)
    .then((urls) => res.status(200).json({ message: urls }))
    .catch((err) => res.status(500).json({ error: err }))
});


require("./routes/auth.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/report.routes.js")(app);

app.get("/", (req, res) => {
  res.send({ message: "Hello from an Express API!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
