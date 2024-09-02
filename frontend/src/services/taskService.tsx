import { api, requestConfig } from "../utils/config";

const addTask = async (data: any, token: any) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/tasks", config).then((res) =>
      res.json().catch((err) => err)
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUserTasks = async (token: any) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/tasks/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (id: any, token: any) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await fetch(api + "/tasks/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (data: any, id: any, token: any) => {
  const config = requestConfig("PUT", data, token);
  try {
    const res = await fetch(api + "/tasks/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const taskService = {
  addTask,
  getUserTasks,
  deleteTask,
  updateTask,
};
export default taskService;
