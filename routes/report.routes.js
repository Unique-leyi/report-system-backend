module.exports = (app) => {
  const report = require("../controller/report.controller");
  const verifyToken = require("../middleware/verifyToken");

  const router = require("express").Router();

  router.post("/:userId/create", verifyToken, report.createReport);
  router.put("/:userId/:reportId", verifyToken, report.updateReport);
  router.delete("/:userId/:reportId", verifyToken, report.deleteReport);
  router.get("/:userId", verifyToken, report.getReportsById);
  router.get("/", report.getReports);
  router.get("/:userId/:reportId", verifyToken, report.getReport);

  app.use("/api/report", router);
};
