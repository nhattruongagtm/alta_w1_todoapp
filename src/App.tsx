import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { Button, Divider, Input, Space } from "antd";
import "./App.scss";
import TaskList from "./components/TaskList";
import { useDispatch } from "react-redux";
import { loadTaskByID } from "./slide/TaskSlice";
import { getTasks, getTasks2 } from "./api/firestore";
import TaskInput from "./components/TaskInput";
import { Task } from "./models/Task";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {

    let isCancel = false;
    const getTaskList = async () => {
      try {
        const tasks = await getTasks();
        if (tasks) {

          !isCancel && dispatch(loadTaskByID(tasks));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTaskList();

    return () => {
      isCancel = true;
    };
  },[]);
  return (
    <div className="app">
      <div className="container">
        <Divider className="app__header">To Do App</Divider>
        <TaskInput/>
        <Space className="task__list">
          <TaskList />  
        </Space>
      </div>
    </div>
  );
}

export default App;
