const NewTaskForm = ({
  addNewTask,
}: {
  addNewTask: (todo: string) => void;
}) => {
  const addTodoToList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    if (data.newTodoInput === "") return;
    addNewTask(data.newTodoInput as string);
    e.currentTarget.reset();
    (e.currentTarget.childNodes[1] as HTMLElement).blur();
  };

  return (
    <form
      action="#"
      onSubmit={(e) => addTodoToList(e)}
      className="mx-4 md:mx-auto max-w-xl text-gray-500 dark:text-neutral-500 bg-white dark:bg-neutral-800 shadow-sm border border-gray-300 dark:border-neutral-600 my-4 rounded-md flex items-center focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
    >
      <label htmlFor="newTodoInput" className="sr-only">
        Add todo
      </label>
      <input
        className="bg-transparent p-2 flex-1 focus-visible:outline-none focus:ring-0 border-none dark:placeholder-neutral-500"
        type="text"
        id="newTodoInput"
        name="newTodoInput"
        placeholder="Add a new task.."
      />
      <button type="submit" className="p-2">
        <span className="sr-only">Add</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </form>
  );
};

export default NewTaskForm;
