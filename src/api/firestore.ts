import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { callbackify } from "util";
import { Task } from "../models/Task";
import db from "../services/firebaseConfig";

const USER_DOC = "test";
const TASK_DOC = "tasks";

export const getUsers = (): Promise<any> => {
  const userRef = collection(db, USER_DOC);
  let result: any[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      const dataSnapshot = await getDocs(userRef);

      dataSnapshot.forEach((doc) => {
        result.push(doc.data());
        console.log(result);
        if (dataSnapshot.size === result.length) {
          resolve(result);
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const getTasks = (): Promise<Task[]> => {
  const userRef = collection(db, TASK_DOC);
  let result: Task[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      const dataSnapshot = await getDocs(userRef);

      dataSnapshot.forEach((doc) => {
        const data = doc.data() as Task;
        result.push({ ...data, id: doc.id });
        console.log(result);
        if (dataSnapshot.size === result.length) {
          resolve(result);
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const getTasks2 = (): Promise<Task[]> => {
  const userRef = collection(db, TASK_DOC);
  let result: Task[] = [];
  return new Promise(async (resolve, reject) => {
    try {

      // const dataSnapshot = await getDocs(userRef);

      // dataSnapshot.forEach((doc) => {
      //   const data = doc.data() as Task;
      //   result.push({ ...data, id: doc.id });
      //   console.log(result);
      //   if (dataSnapshot.size === result.length) {
      //     resolve(result);
      //   }
      // });

      onSnapshot(userRef, (doc) => {
        doc.forEach((d) => {
          const data = d.data() as Task;
          result = [...result,{ ...data, id: d.id }]

          if (doc.size === result.length) {
            resolve(result);
          }
        });
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const createTask = async (title: string) => {
  const taskRef = collection(db, TASK_DOC);

  const task: Omit<Task, "id"> = {
    title,
    status: false,
  };

  try {
    const rs = await addDoc(taskRef, task);
    if (rs) {
      return {
        ...task,
        id: rs.id,
      } as Task;
    }
  } catch (error) {
    return false;
  }
};

export const updateTaskFS = async (task: Task) =>{
  const taskRef = doc(db,TASK_DOC,task.id);

  updateDoc(taskRef,{
    ...task
  });
}
export const deleteTaskFS = async (id: string) =>{
  const taskRef = doc(db,TASK_DOC,id);

  await deleteDoc(taskRef);

}