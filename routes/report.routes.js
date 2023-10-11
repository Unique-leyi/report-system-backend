
module.exports = app => {
    const report = require("../controller/report.controller.js");
    const verifyToken = require("../middleware/verifyToken");
  
    var router = require("express").Router();
    
    router.post("/create", verifyToken,  report.createReport);
    router.put("/:id", verifyToken,  report.updateReport);
    router.delete("/:id", verifyToken, report.deleteReport)
    router.get("/", verifyToken, report.getReports);
    router.get("/:id", verifyToken, report.getReports);

    
    app.use('/api/report', router);
  };
  