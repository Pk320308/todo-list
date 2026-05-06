const express = require("express");

const {
  showHome,
  createTodo,
  showEditPage,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

// Home Page
router.get("/", showHome);

// Add Todo
router.post("/add", createTodo);

// Edit Page
router.get("/edit/:id", showEditPage);

// Update Todo
router.put("/update/:id", updateTodo);

// Delete Todo
router.delete("/delete/:id", deleteTodo);

module.exports = router;