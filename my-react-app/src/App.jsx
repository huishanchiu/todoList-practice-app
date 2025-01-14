import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div``;
const ListItem = styled.p``;

const Input = styled.input``;
const AddTaskWrapper = styled.div`
  outline: red solid 1px;
`;
const Button = styled.button``;

function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const getProductList = async () => {
    try {
      console.log("here");
      const response = await axios.get("http://localhost:5001/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    try {
      const response = await axios.post("http://localhost:5001/tasks/", {
        name: newTask,
      });
      setNewTask("");
      getProductList();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value); // 更新输入框的值
  };

  console.log("newTask", newTask);

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <AddTaskWrapper>
        <Input value={newTask} onChange={handleInputChange} />
        <Button onClick={addTask}>Add Task</Button>
      </AddTaskWrapper>
      <Wrapper>
        {tasks.map((task) => (
          <ListItem>{task.name}</ListItem>
        ))}
      </Wrapper>
    </>
  );
}

export default App;
