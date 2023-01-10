import { useState } from "react";

const Header = () => {
  return (
    <header className="p-2 border-b bg-white">
      <div className="max-w-xl mx-auto flex gap-2 justify-between items-center">
        <h1 className="uppercase font-semibold text-gray-500 hover:text-indigo-500">
          <a href="#">Tasky</a>
        </h1>
        <Clock />
      </div>
    </header>
  );
};

const Clock = () => {
  const date = new Date().toDateString().split(" ");
  const weekday = date[0];
  const month = date[1];
  const day = date[2];

  return (
    <p className="grid grid-cols-2 grid-rows-2">
      <span className="row-span-2 font-semibold text-4xl mr-1">{day}</span>
      <span className="text-sm">{weekday}</span>
      <span className="text-sm">{month}</span>
    </p>
  );
};

const Footer = () => {
  return (
    <footer className="p-2 my-4 text-gray-500">
      <p className="px-4 text-xs max-w-2xl mx-auto text-center">
        Powered by React, TypeScript and TailwindCSS
      </p>
    </footer>
  );
};

const TaskList = ({ title, list }: { title: string; list: JSX.Element[] }) => {
  return (
    <div
      className="p-4 pr-3 md:pr-0 max-w-xl mx-auto"
      id={title + "_tasks_list"}
    >
      <h3 className="text-gray-700 font-semibold">
        {title} ({list.length})
      </h3>
      <ul>{list}</ul>
    </div>
  );
};

const TaskItem = ({
  id,
  title,
  completed,
  completeTask,
  deleteTask,
}: {
  id: number;
  title: string;
  completed: boolean;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
}) => {
  return (
    <li className="flex items-center gap-2 my-2 p-2 md:pr-0">
      <input
        className="rounded border-2 border-indigo-500 text-indigo-500 focus:ring-indigo-500"
        type="checkbox"
        title={"task_" + id}
        name={"task_" + id}
        id={"task_" + id}
        defaultChecked={completed}
        onChange={() => completeTask(id)}
      />
      <span className="text-gray-600">{title}</span>
      <button
        onClick={() => deleteTask(id)}
        type="button"
        className="ml-auto flex items-center rounded p-2 text-gray-500 border border-transparent hover:border-gray-300"
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
};

const Searchbar = ({
  filterTasks,
}: {
  filterTasks: (query: string) => void;
}) => {
  return (
    <div className="flex-grow text-gray-500 bg-white shadow-sm border border-gray-300 my-2 rounded-md flex items-center focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
      <label htmlFor="filterTasks" className="px-2">
        <span className="sr-only">Search for tasks</span>
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
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </label>
      <input
        className="border-none focus-visible:outline-none bg-transparent p-2 flex-1 focus:ring-0"
        placeholder="Search for tasks.."
        type="text"
        id="filterTasks"
        name="filterTasks"
        onChange={(e) => filterTasks(e.target.value)}
      />
    </div>
  );
};

const AddTask = ({ addNewTask }: { addNewTask: (todo: string) => void }) => {
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
      className="mx-4 md:mx-auto max-w-xl text-gray-500 bg-white shadow-sm border border-gray-300 my-4 rounded-md flex items-center focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
    >
      <label htmlFor="newTodoInput" className="sr-only">
        Add todo
      </label>
      <input
        className="bg-transparent p-2 flex-1 focus-visible:outline-none focus:ring-0 border-none"
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

const MassiveActions = ({
  deleteAll,
  doneAll,
  toggleDone,
  hideDone,
}: {
  deleteAll: () => void;
  doneAll: () => void;
  toggleDone: () => void;
  hideDone: boolean;
}) => {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  return (
    <div className="relative">
      <button
        onClick={() => toggleMenu()}
        className={
          "text-xs text-gray-600 rounded-md p-2 border" +
          (open
            ? " border-indigo-500 ring-1 ring-indigo-500"
            : " border-transparent hover:border-gray-300")
        }
      >
        <span className="sr-only">Massive actions</span>
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {open && (
        <ul
          id="massive_actions"
          className="absolute right-0 top-12 bg-white shadow-sm border border-gray-300 rounded-md"
        >
          <li className="p-2 border-b border-gray-300 min-w-[9rem]">
            <button
              type="button"
              onClick={() => deleteAll()}
              className="flex items-center justify-around gap-2 text-gray-600 w-full hover:text-indigo-500"
            >
              <span>Delete all</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
          <li className="p-2 border-b border-gray-300">
            <button
              type="button"
              onClick={() => doneAll()}
              className="flex items-center justify-around gap-2 text-gray-600 w-full hover:text-indigo-500"
            >
              <span>Done all</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
          </li>
          <li className="p-2 px-4">
            <label className="flex items-center justify-around gap-2 text-gray-600 w-full hover:text-indigo-500 group cursor-pointer">
              Hide done
              <input
                onChange={() => toggleDone()}
                defaultChecked={!hideDone}
                type="checkbox"
                name="toggleDone"
                id="toggle_done"
                className="rounded border-2 group-hover:border-indigo-500 checked:border-indigo-500 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
              />
            </label>
          </li>
        </ul>
      )}
    </div>
  );
};

const App = () => {
  const mock = [
    { id: 1, title: "do stuff", completed: false },
    { id: 2, title: "do more stuff", completed: false },
    { id: 3, title: "walk dog", completed: true },
    { id: 4, title: "study react", completed: true },
  ];

  const [tasks, setTasks] = useState(mock);
  const [query, setQuery] = useState("");
  const [toggleDone, setToggleDone] = useState(true);

  const filtered = tasks.filter(({ title }) =>
    title.toLowerCase().includes(query)
  );

  const completedList: JSX.Element[] = [];
  const incompleteList: JSX.Element[] = [];

  filtered.map((item) => {
    let taskItem = (
      <TaskItem
        deleteTask={handleDeleteTask}
        completeTask={handleCompleteTask}
        key={item.id}
        id={item.id}
        title={item.title}
        completed={item.completed}
      />
    );
    if (item.completed) {
      completedList.push(taskItem);
    } else {
      incompleteList.push(taskItem);
    }
  });

  function handleAddTask(task: string) {
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks((prev) => [...prev, { id: id, title: task, completed: false }]);
  }

  function handleCompleteTask(id: number) {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  }

  function handleDeleteTask(id: number) {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSearch(query: string) {
    setQuery(query);
  }

  function handleDeleteAll() {
    setTasks([]);
  }

  function handleDoneAll() {
    setTasks((prev) =>
      prev.map((item) => {
        return { ...item, completed: true };
      })
    );
  }

  function handleToggleDone() {
    setToggleDone((prev) => !prev);
  }

  return (
    <div className="min-h-screen flex flex-col bg-indigo-50/10">
      <Header />
      <main className="flex-grow my-2">
        <AddTask addNewTask={handleAddTask} />
        <div className="max-w-xl mx-4 md:mx-auto flex items-center gap-2">
          {filtered.length > 0 && (
            <>
              <Searchbar filterTasks={handleSearch} />
              <MassiveActions
                deleteAll={handleDeleteAll}
                doneAll={handleDoneAll}
                toggleDone={handleToggleDone}
                hideDone={toggleDone}
              />
            </>
          )}
        </div>
        {filtered.length < 1 ? (
          <p className="text-center font-semibold text-gray-300 my-8">
            Wow so empty (・3・)
          </p>
        ) : (
          <>
            {incompleteList.length > 0 && (
              <TaskList title="To do" list={incompleteList} />
            )}
            {completedList.length > 0 && toggleDone ? (
              <TaskList title="Done" list={completedList} />
            ) : (
              ""
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
