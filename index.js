const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const config = require("./config/index.js");
const uploadImage = require("./middleware/uploadimage");

connectDB();

const app = express();
const { port, allowedDomains  } = config

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: allowedDomains,
}))

app.post("/api/uploadImage", (req, res) => {
  uploadImage(req.body.images)
    .then((url) => res.status(200).json({ message: url }))
    .catch((err) => res.status(500).json({ error: err }))
});


require("./routes/auth.routes.js")(app);
require("./routes/report.routes.js")(app);
require("./routes/report.routes.js")(app);

app.get("/", (req, res) => {
  res.send({ message: "Hello from an Express API!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
