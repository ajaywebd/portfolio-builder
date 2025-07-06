const express = require("express");
const router = express.Router();
const {
  createVisitor,
  getAllVisitors,
  updateVisitor,
  deleteVisitor,
} = require("../controllers/visitorController");

router.post("/", createVisitor); // Create
router.get("/", getAllVisitors); // Read all
router.put("/:id", updateVisitor); // Update by ID
router.delete("/:id", deleteVisitor); // Delete by ID

module.exports = router;
