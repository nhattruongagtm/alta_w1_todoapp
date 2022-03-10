import { Divider, List } from "antd";
import React, { useEffect, useState } from "react";
import TaskListItem from "./TaskListItem";
import { Task } from "../models/Task";
import { useSelector } from "react-redux";
import { RootState } from "../store";
interface Props {}

const TaskList = (props: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const taskFromStore = useSelector((state: RootState) => state.tasks.taskList);

  useEffect(() => {
    setTasks(taskFromStore);
  }, [taskFromStore]);

  return (
    <List
      size="large"
      // bordered
      dataSource={tasks}
      renderItem={(item) => <TaskListItem task={item}/>}
    />
  );
};

export default TaskList;
