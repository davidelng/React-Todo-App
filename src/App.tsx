import { useState } from "react";

const Header = () => {
  return(
    <header className="grid grid-cols-2 md:grid-cols-3 p-2 gap-2 border-b-2 border-dashed">
      {/* <h1 className="uppercase font-semibold text-gray-500">Tasky</h1> */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
      </svg>
      <Clock />
      <Toolbar />
    </header>
  )
}

const Clock = () => {
  // const time = `${new Date().getHours()}:${new Date().getMinutes()}`
  const date = new Date().toDateString().split(" ");
  const weekday = date[0];
  const month = date[1];
  const day = date[2];

  return(
    <div id="clock" className="md:text-center text-end uppercase font-semibold text-gray-900">{day} {weekday} {month}</div>
  )
  
}

const Toolbar = () => {
  return(
    <div id="toolbar" className="col-span-2 md:col-span-1 justify-self-end">
        <button type="button" className="p-2 rounded-full flex items-center gap-2 border-2">
            <span>New task</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    </div>
  )
}

const Footer = () => {
  return(
    <footer className="p-2 my-4 text-gray-500">
    <p className="px-4 text-xs max-w-2xl mx-auto text-center">Powered by React, TypeScript and TailwindCSS</p>
    </footer>
  )
}

const TaskList = ({title, list}: {title: string, list: JSX.Element[]}) => {
  return(
    <div className="p-4 max-w-xl mx-auto" id={title + "_tasks_list"}>
        <h3 className="uppercase text-gray-700 font-semibold">{title}</h3>
        <ul>{list}</ul>
    </div>
  )
}

const TaskItem = ({id, title, completed, completeTask, deleteTask}: {id: number, title: string, completed: boolean, completeTask: (id: number) => void, deleteTask: (id: number) => void}) => {
  return(
    <li className="flex items-center gap-2 my-2 p-2 border rounded">
      <input className="rounded border-2 border-blue-500 text-blue-500 focus:ring-blue-500" type="checkbox" title={"task_" + id} name={"task_" + id} id={"task_" + id} defaultChecked={completed} onChange={() => completeTask(id)}/>
      <span>{title}</span>
      <button onClick={() => deleteTask(id)} type="button" className="ml-auto flex items-center rounded border p-1 text-gray-500">
        <span className="sr-only">Delete</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </li>
  )
}

const Searchbar = ({filterTasks}: {filterTasks: (query: string) => void}) => {
  return(
      <div className="mx-4 md:mx-auto max-w-xl text-gray-500 bg-gray-100 my-2 rounded-md flex items-center focus-within:outline focus-within:outline-2">
          <label htmlFor="filterTasks" className="px-2">
              <span className="sr-only">Search for tasks</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
          </label>
          <input className="border-none focus-visible:outline-none bg-transparent p-2 flex-1 focus:ring-0" placeholder="Search for tasks.." type="text" id="filterTasks" name="filterTasks" onChange={(e) => filterTasks(e.target.value)}/>
      </div>
  )
}

const AddTask = ({addNewTask}: { addNewTask: (todo: string) => void }) => {
  const addTodoToList = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const data = Object.fromEntries(form.entries());
      if (data.newTodoInput === "") return;
      addNewTask(data.newTodoInput as string);
      e.currentTarget.reset();
      (e.currentTarget.childNodes[1] as HTMLElement).blur();
  }

  return(
      <form action="#" onSubmit={(e) => addTodoToList(e)} className="mx-4 md:mx-auto my-2 max-w-xl text-gray-500 bg-gray-100 rounded-md overflow-hidden flex focus-within:outline focus-within:outline-2">
          <label htmlFor="newTodoInput" className="sr-only">Add todo</label>
          <input className="bg-transparent p-2 flex-1 focus-visible:outline-none focus:ring-0 border-none" type="text" id="newTodoInput" name="newTodoInput" placeholder="Add a new task.."/>
          <button type="submit" className="p-2">
              <span className='sr-only'>Add</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
          </button>
      </form>
  )
}

const App = () => {
  const mock = [
    {id: 1, title: "do stuff", completed: false},
    {id: 2, title: "do more stuff", completed: false},
    {id: 3, title: "sleep less", completed: true},
    {id: 4, title: "play", completed: true}
  ];

  const [tasks, setTasks] = useState(mock);
  const [query, setQuery] = useState("");

  const filtered = tasks.filter(({title}) => title.toLowerCase().includes(query));

  const completedList: JSX.Element[] = [];
  const incompleteList: JSX.Element[] = [];

  filtered.map(item => {
    let taskItem = <TaskItem deleteTask={handleDeleteTask} completeTask={handleCompleteTask} key={item.id} id={item.id} title={item.title} completed={item.completed} />;
    if (item.completed) {
      completedList.push(taskItem);
    } else {
      incompleteList.push(taskItem);
    }
  })

  function handleAddTask(task: string) {
    const id = tasks.length > 0 ? (tasks[tasks.length - 1].id) + 1 : 1;
    setTasks(prev => [...prev, {id: id, title: task, completed: false}]);
  }

  function handleCompleteTask(id: number) {
    setTasks(prev => prev.map(item => {
      if (item.id === id) {
        return {...item, completed: !item.completed};
      }
      return item;
    }))
  }

  function handleDeleteTask(id: number) {
    setTasks(prev => prev.filter(item => item.id !== id));
  }

  function handleSearch(query: string) {
    setQuery(query);
  }

  function handleDeleteAll() {
    setTasks([]);
  }

  function handleDoneAll() {
    setTasks(prev => prev.map(item => { return {...item, completed: true} }));
  }

  return(
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AddTask addNewTask={handleAddTask}/>
        <Searchbar filterTasks={handleSearch} />
        { filtered.length < 1 ?
         <p className="text-center font-semibold text-gray-300 my-8">Wow so empty	(・3・)</p> :
         <>
          {
            filtered.length > 0 &&
            <div id="massive_actions" className="max-w-xl mx-auto p-4 flex gap-2 justify-end">
              <button type="button" onClick={() => handleDeleteAll()} className="flex items-center gap-2">
                <span>Delete All</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button type="button" onClick={() => handleDoneAll()} className="flex items-center gap-2">
                <span>Done All</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </button>
            </div>
          }
          { incompleteList.length > 0 && <TaskList title="To do" list={incompleteList} /> }
          { completedList.length > 0 && <TaskList title="Done" list={completedList} /> }
         </>
        }
      </main>
      <Footer />
    </div>
  )
}

export default App