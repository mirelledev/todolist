import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout, reset } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { getUserTasks, addTask, deleteTask } from "../slices/taskSlice";
import { getUserInfo } from "../slices/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TaskModal from "../components/TaskModal";
import { Task } from "../components/TaskModal";
import Message from "../components/Message";

const Home = () => {
  const navigate = useNavigate();

  const [isTaskUpdated, setIsTaskUpdated] = useState<boolean>(false);
  const {
    tasks,
    loading,
    message: messagem,
  } = useSelector((state: RootState) => state.task);

  const [task, setTask] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskSent = { title: task };
    dispatch(addTask(taskSent));
    setTask("");
    dispatch(getUserTasks());

    setIsTaskUpdated(true);
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: any) => {
    await dispatch(deleteTask(id));
    setIsTaskUpdated(true);
  };

  useEffect(() => {
    if (isTaskUpdated) {
      dispatch(getUserTasks());
      setIsTaskUpdated(false);
    }
  }, [dispatch, isTaskUpdated]);

  useEffect(() => {
    dispatch(getUserTasks());
    dispatch(getUserInfo());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      <div className=" h-[50px] text-right">
        <button
          className="mr-4 mt-2 bg-red-600 p-2 w-20 font-semibold text-white rounded-md hover:bg-red-800"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>

      <div className="flex justify-center items-center mt-[140px] flex-col">
        <p>
          Bem vindo{" "}
          <span className="font-bold">{(user as { name: string }).name}</span>
        </p>
        <h2 className="text-3xl text-blue-800 mt-1">Criar tarefa</h2>
        <p className="mt-[10px] text-slate-500 ">
          Adicione um item a sua lista de tarefas
        </p>
        <form onSubmit={handleAddTask} className="pt-3">
          <input
            className="w-[300px] xl:w-[600px] h-[40px] sm:w-[500px] focus:outline-none rounded-xl border-gray-400 border-[1px] pl-2"
            type="text"
            value={task}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTask(e.target.value)
            }
          />
          <button className="p-2  ml-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-900">
            Adicionar
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center mt-[50px] flex-col">
        {tasks?.length === 0 && <p>Você ainda não adicionou nenhuma tarefa.</p>}
        {tasks && !loading ? (
          tasks.map((task, index) => (
            <div
              key={task._id || index}
              className="w-[400px] xl:w-[700px] h-[80px] md:w-[600px] sm:w-[500px] text-center bg-slate-50 m-3 rounded-md"
            >
              <h2
                key={task._id || index}
                className="text-[17px] mt-5 truncate text-left ml-4"
              >
                {task.title}
              </h2>
              <button className="relative bottom-[-1px] left-[160px] xl:left-[310px] lg:left-[260px] md:left-[260px] sm:left-[210px]">
                <MdEdit
                  className="size-6"
                  onClick={() => handleEditClick(task)}
                />
              </button>
              <button className="relative bottom-[px] left-[170px] xl:left-[320px] lg:left-[270px] md:left-[270px] sm:left-[220px]">
                <FaTrash
                  className="size-5"
                  onClick={() => handleDelete(task._id)}
                />
              </button>
            </div>
          ))
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        <Message
          messagem={typeof messagem === "string" ? messagem : null}
          isTaskUpdated={isTaskUpdated}
        />
      </div>
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isTaskUpdated={isTaskUpdated}
      />
    </>
  );
};

export default Home;
