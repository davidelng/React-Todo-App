import { useState } from "react";

export type TaskItemProps = {
  id: number;
  title: string;
  completed: boolean;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (title: string, id: number) => void;
};

const TaskItem = ({
  id,
  title,
  completed,
  completeTask,
  deleteTask,
  updateTask,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  function toggleEditMode() {
    setIsEditing((prev) => !prev);
  }

  function editTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    if (data.newTodoInput === "") return;
    updateTask(data.newTodoInput as string, id);
    e.currentTarget.reset();
    (e.currentTarget.childNodes[1] as HTMLElement).blur();
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="flex items-center gap-2 my-2 p-2 md:pr-0">
        <form
          action="#"
          onSubmit={(e) => editTask(e)}
          className="flex items-center gap-2 w-full"
        >
          <label htmlFor="newTodoInput" className="sr-only">
            Edit task
          </label>
          <input
            className="bg-white dark:bg-neutral-800 dark:text-neutral-500 p-2 flex-1 rounded-md shadow-sm border border-gray-300 dark:border-neutral-600"
            type="text"
            id="newTodoInput"
            name="newTodoInput"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="ml-auto flex items-center rounded p-2 text-gray-500 dark:text-neutral-500 border border-transparent hover:border-gray-300 dark:hover:border-neutral-500"
          >
            <span className="sr-only">Edit</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </form>
      </li>
    );
  } else {
    return (
      <li className="flex items-center gap-2 my-2 p-2 md:pr-0">
        <input
          className="rounded border-2 border-indigo-500 text-indigo-500 focus:ring-indigo-500 dark:bg-neutral-700 dark:border-neutral-600"
          type="checkbox"
          title={"task_" + id}
          name={"task_" + id}
          id={"task_" + id}
          defaultChecked={completed}
          onChange={() => completeTask(id)}
        />
        <span className="text-gray-600 dark:text-neutral-300 break-all">
          {title}
        </span>
        <button
          onClick={() => toggleEditMode()}
          type="button"
          className="ml-auto flex items-center rounded p-2 text-gray-500 dark:text-neutral-500 border border-transparent hover:border-gray-300 dark:hover:border-neutral-600"
        >
          <span className="sr-only">Edit</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button
          onClick={() => deleteTask(id)}
          type="button"
          className="flex items-center rounded p-2 text-gray-500 dark:text-neutral-500 border border-transparent hover:border-gray-300 dark:hover:border-neutral-600"
        >
          <span className="sr-only">Delete</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </li>
    );
  }
};

export default TaskItem;
