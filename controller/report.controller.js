const Report = require("../model/report.model");
const User = require("../model/user.model");

const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
};

exports.createReport = async (req, res) => {
  try {
    const { task_headline, task_author, task_summary, task_tags, task_images, task_date, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newReport = new Report({
      task_headline, 
      task_author,
      task_summary,
      task_tags,
      task_images,
      task_date,
      user: user._id,
    });

    const savedReport = await newReport.save();

    // Update the user's reportIds array
    user.reportIds.push(savedReport._id);
    await user.save();

    res.status(200).json({ message: "Report uploaded successfully", report: savedReport });
  } catch (err) {
    handleError(res, err);
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("user"); // Populate the user field
    res.json(reports);
  } catch (err) {
    handleError(res, err);
  }
};

exports.getReportsById = async (req, res) => {
  const { userId } = req.params;

  try {
    const reports = await Report.find({ user: userId }).populate("user");
    res.json(reports);
  } catch (err) {
    handleError(res, err);
  }
};

exports.getReport = async (req, res) => {
  try {
    const { userId, reportId } = req.params;
    const report = await Report.findOne({ _id: reportId, user: userId }).populate("user");

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(report);
  } catch (err) {
    handleError(res, err);
  }
};


exports.updateReport = async (req, res) => {
  try {
    const { task_headline, task_author, task_summary, task_tags, task_images, task_date } = req.body;
    const updatedReport = {
      task_headline, 
      task_author,
      task_summary,
      task_tags,
      task_images,
      task_date,
    };

    const report = await Report.findByIdAndUpdate(req.params.id, updatedReport, {
      new: true,
    }).populate("user"); // Populate the user field

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(report);
  } catch (err) {
    handleError(res, err);
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndRemove(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ message: "Report deleted" });
  } catch (err) {
    handleError(res, err);
  }
};
