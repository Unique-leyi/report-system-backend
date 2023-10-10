const Report = require("../model/report.model");

// Create a new Report
exports.createReport =  async (req, res) => {
    try {
      const { title, tags, images, date, author } = req.body;
      const newReport = new Report({
        task_title: title,
        task_tags: tags,
        task_images: images,
        task_date: date,
        task_author: author,
      });
      await newReport.save();
      res.json(newReport);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
  
  // Read all Reports

 exports.getReports = async (req, res) => {
    try {
      const reports = await Report.find();
      res.json(reports);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  
  // Read a single Report by ID
  exports.getReport =  async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.json(report);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  
  // Update a Report by ID

  exports.updateReport =  async (req, res) => {
    try {
      const { title, tags, images, date, author } = req.body;
      const updatedReport = {
        task_title: title,
        task_tags: tags,
        task_images: images,
        task_date: date,
        task_author: author,
      };
      const report = await Report.findByIdAndUpdate(req.params.id, updatedReport, { new: true });
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.json(report);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  


  exports.deleteReport = async (req, res) => {
    try {
      const report = await Report.findByIdAndRemove(req.params.id);
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.json({ message: 'Report deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  