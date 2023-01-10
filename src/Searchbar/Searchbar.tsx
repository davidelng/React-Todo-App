const Searchbar = ({
  filterTasks,
}: {
  filterTasks: (query: string) => void;
}) => {
  return (
    <div className="flex-grow text-gray-500 dark:text-neutral-500 bg-white dark:bg-neutral-800 shadow-sm border border-gray-300 dark:border-neutral-600 my-2 rounded-md flex items-center focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
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
        className="border-none focus-visible:outline-none bg-transparent p-2 flex-1 focus:ring-0 dark:placeholder-neutral-500"
        placeholder="Search for tasks.."
        type="text"
        id="filterTasks"
        name="filterTasks"
        onChange={(e) => filterTasks(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
