import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../slices/taskSlice";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { getUserTasks } from "../slices/taskSlice";

export type Task = {
  _id?: string;
  title: string;
};

type Props = {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  isTaskUpdated: boolean;
};

const TaskModal = ({ task, isOpen, onClose }: Props) => {
  const [newTitle, setNewTitle] = useState<string>(task ? task.title : "");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setNewTitle(task.title);
    }
  }, [task]);

  const handleSave = async () => {
    if (task) {
      console.log("Saving task:", { title: newTitle, id: task._id });
      const updatedTask = { title: newTitle, id: task._id };
      await dispatch(updateTask(updatedTask));

      onClose();
      dispatch(getUserTasks());
    }
  };
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          Editando sua tarefa..
        </h2>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          value={newTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewTitle(e.target.value)
          }
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-600 text-white p-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 text-white p-2 rounded-md"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
