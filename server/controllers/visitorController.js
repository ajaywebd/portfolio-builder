const Visitor = require("../models/Visitor");

// CREATE
exports.createVisitor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const newVisitor = new Visitor({ name });
    await newVisitor.save();

    res.status(201).json({ message: "Visitor saved", visitor: newVisitor });
  } catch (err) {
    console.error("❌ Error saving visitor:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// READ
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ timestamp: -1 });
    res.status(200).json(visitors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch visitors" });
  }
};

// UPDATE
exports.updateVisitor = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const updated = await Visitor.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Visitor not found" });

    res.status(200).json({ message: "Visitor updated", visitor: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update visitor" });
  }
};

// DELETE
exports.deleteVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Visitor.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Visitor not found" });

    res.status(200).json({ message: "Visitor deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete visitor" });
  }
};
