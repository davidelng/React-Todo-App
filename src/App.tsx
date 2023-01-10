import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NewTaskForm from "./NewTaskForm";
import Searchbar from "./Searchbar";
import MassiveActionsMenu from "./MassiveActionsMenu";
import TaskList from "./TaskList";
import TaskItem from "./TaskItem";
import mock from "./mock-tasks.json";

const App = () => {
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
        updateTask={handleEditTask}
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

  function handleEditTask(title: string, id: number) {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, title: title };
        }
        return item;
      })
    );
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
    <div className="min-h-screen flex flex-col bg-indigo-50/10 dark:bg-black">
      <Header />
      <main className="flex-grow my-2">
        <NewTaskForm addNewTask={handleAddTask} />
        <div className="max-w-xl mx-4 md:mx-auto flex items-center gap-2">
          <Searchbar filterTasks={handleSearch} />
          <MassiveActionsMenu
            deleteAll={handleDeleteAll}
            doneAll={handleDoneAll}
            toggleDone={handleToggleDone}
            hideDone={toggleDone}
          />
        </div>
        {filtered.length < 1 ? (
          <p className="text-center font-semibold text-gray-300 dark:text-neutral-500 my-8">
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
