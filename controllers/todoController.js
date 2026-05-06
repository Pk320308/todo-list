const pool = require("../db/db");

const showHome = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");

    res.render("index", {
      todos: result.rows,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    await pool.query(
      "INSERT INTO todos (title, description) VALUES ($1, $2)",
      [title, description]
    );

    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const showEditPage = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Todo not found");
    }

    res.render("edit", {
      todo: result.rows[0],
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const is_completed = req.body.is_completed ? true : false;

    await pool.query(
      `UPDATE todos
       SET title = $1,
           description = $2,
           is_completed = $3,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4`,
      [title, description, is_completed, id]
    );

    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM todos WHERE id = $1", [id]);

    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  showHome,
  createTodo,
  showEditPage,
  updateTodo,
  deleteTodo,
};