import Clock from "./Clock";

const Header = () => {
  return (
    <header className="p-2 border-b bg-white dark:bg-black dark:border-b-neutral-900">
      <div className="max-w-xl mx-auto flex gap-2 justify-between items-center">
        <h1 className="uppercase font-semibold text-gray-500 dark:text-neutral-300 hover:text-indigo-500">
          <a href="#">Tasky</a>
        </h1>
        <Clock />
      </div>
    </header>
  );
};

export default Header;
