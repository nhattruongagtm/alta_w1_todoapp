import { Button, Form } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask as create, updateTaskFS } from "../api/firestore";
import { Task } from "../models/Task";
import { createTask, updateTask } from "../slide/TaskSlice";
import { RootState } from "../store";

interface Props {}

const TaskInput = (props: Props) => {
  const taskStore = useSelector((state: RootState) => state.tasks);
  const { edit } = taskStore;

  const [task, setTask] = useState<string>(edit.title);
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    if(edit.id === ""){
      // tạo mới
      if (task.trim().length > 0) {
        const isCreated = await create(task);
        if (isCreated) {
          dispatch(createTask(isCreated));
          setTask("");
        } else {
          alert("Thêm công việc thất bại!");
        }
      }
    }
    else{
      // cập nhật
      const newData = {...edit,title: task}
      dispatch(updateTask(newData));
      setTask("");
      
    }
  };

  useEffect(() => {
    setTask(edit.title);
  }, [edit]);

  return (
    <Form className="add__container" onFinish={handleAddTask}>
      <Input
        className="add__input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button type="primary" htmlType="submit">
        {edit.id !== "" ? "Cập nhật" : "Thêm công việc"}
      </Button>
    </Form>
  );
};

export default TaskInput;
