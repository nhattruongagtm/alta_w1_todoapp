import { Button } from "antd";
import React from "react";
import { Typography, Space } from "antd";
import { Checkbox } from "antd";
import { Task } from "../models/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { chooseItem, deleteTask, updateTask } from "../slide/TaskSlice";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface Props {
    task: Task;
}
const TaskListItem = ({task}: Props) => {
  const { Text } = Typography;
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState)=>state.tasks.taskList);

  const handleEdit = () =>{
    dispatch(chooseItem(task));
  }
  const handleDelete = () =>{
    dispatch(deleteTask(task.id))
  }
  const handleChangeStatus = (e: CheckboxChangeEvent) =>{
    const checked = e.target.checked;

    dispatch(updateTask({...task,status: checked}))

  }
  return (
    <div className="task__list__item">
      <Text className={task.status ? "task__item__content task--complete": "task__item__content"}>
        <Checkbox checked={task.status} onChange={handleChangeStatus}></Checkbox> {task.title}  
      </Text>
      <Button className="task__item__btn task--edit" onClick={handleEdit}>Sửa</Button>
      <Button danger type="primary" className="task__item__btn task--delete" onClick={handleDelete}>Xóa</Button>
    </div>
  );
};

export default TaskListItem;
