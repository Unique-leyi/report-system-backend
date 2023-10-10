
module.exports = app => {
    const report = require("../controller/report.controller.js");
  
  
    var router = require("express").Router();
    
    router.post("/create", report.createReport);
    router.put("/:id", report.updateReport);
    router.delete("/:id", report.deleteReport)
    router.get("/", report.getReports);
    router.get("/:id", report.getReports);

    
    app.use('/api/report', router);
  };
  