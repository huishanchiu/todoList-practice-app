const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("hello"));

let todos = [];
let nextId = 1;

app.get("/todos", (req, res) => res.json(todos));

app.post("/todos", (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim) {
    return res.status(400).json({ message: "Todo name is required" });
  }
  const newTask = {
    id: nextId++,
    name,
  };

  todos.push(newTask);
  res.status(201).json(newTask);
});
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const todo = todos.find((task) => task.id === Number(id));
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.name = name;
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === Number(id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(todoIndex, 1);
  res.status(200).json({ message: "Delete Seccessfully" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 5001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
