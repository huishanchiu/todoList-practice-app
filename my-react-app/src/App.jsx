import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #fef7a3;
  padding: 20px;
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 4px;
  border: #646cffaa solid 1px;
`;
const Input = styled.input`
  height: 100%;
  font-size: 30px;
  caret-color: #646cffaa;
  outline-color: none;
  padding-left: 10px;
  flex: 1;
  border: 0;
  padding-right: 4px;
  background: #fef7a3;
  color: grey;
  &::placeholder {
    color: pink;
  }
`;

const Button = styled.button`
  outline: #646cffaa solid 1px;
  height: 100%;
  background: #646cffaa;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.25s;
  &:hover {
    background: #4d55f8c7;
  }
`;
const ListItem = styled.div`
  height: 45px;
  border-bottom: #646cffaa solid 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DeleteButton = styled.button`
  outline: #646cffaa solid 1px;
  background: #646cffa0;
  font-size: 1em;
  cursor: pointer;
  transition: border-color 0.25s;
`;
const TodoInput = styled.input`
  height: 100%;
  width: 50%;
  font-size: 20px;
  background-color: #fef7a3;
  border: 0;
  color: grey;
  flex: 1;
`;

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const getProductList = async () => {
    try {
      console.log("here");
      const response = await axios.get("http://localhost:5001/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo) {
      alert("Please enter a todo");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5001/todos/", {
        name: newTodo,
      });
      setNewTodo("");
      getProductList();
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value); // 更新输入框的值
  };

  useEffect(() => {
    getProductList();
  }, []);

  const handleInputUpdate = async (e, todoId) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/todos/${todoId}`,
        {
          name: e.target.value,
        }
      );
      getProductList();
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/todos/${todoId}`
      );
      getProductList();
    } catch (error) {
      console.error("Error delete todo:", error);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Input value={newTodo} onChange={handleInputChange} />
        <Button onClick={addTodo}>Add Todo</Button>
      </Header>
      {todos.map((todo) => {
        return (
          <ListItem>
            <TodoInput
              type="text"
              value={todo.name}
              onChange={(e) => handleInputUpdate(e, todo.id)}
            />
            <DeleteButton onClick={() => handleDeleteTodo(todo.id)}>
              delete
            </DeleteButton>
          </ListItem>
        );
      })}
    </Wrapper>
  );
}

export default App;
