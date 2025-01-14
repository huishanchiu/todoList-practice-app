const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("hello"));

let tasks = [
  { id: 1, name: "洗衣服" },
  { id: 2, name: "煮飯" },
];
app.get("/tasks", (req, res) => res.json(tasks));
app.post("/tasks", (req, res) => {
  console.log("req.body", req.body);
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 5001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
