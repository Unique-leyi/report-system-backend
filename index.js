const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const config = require("./config/index.js");

connectDB();

const app = express();
const { port, allowedDomains  } = config

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: allowedDomains,
}))

require("./routes/auth.routes.js")(app);
require("./routes/report.routes.js")(app);
require("./routes/report.routes.js")(app);

app.get("/", (req, res) => {
  res.send({ message: "Hello from an Express API!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
