import { useState } from "react";

export type MassiveActionsMenuProps = {
  deleteAll: () => void;
  doneAll: () => void;
  toggleDone: () => void;
  hideDone: boolean;
};

const MassiveActionsMenu = ({
  deleteAll,
  doneAll,
  toggleDone,
  hideDone,
}: MassiveActionsMenuProps) => {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  return (
    <div className="relative">
      <button
        onClick={() => toggleMenu()}
        className={
          "text-xs text-gray-600 dark:text-neutral-500 rounded-md p-2 border" +
          (open
            ? " border-indigo-500 ring-1 ring-indigo-500"
            : " border-transparent hover:border-gray-300 dark:hover:border-neutral-600")
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
          className="absolute right-0 top-12 bg-white dark:bg-neutral-900 shadow-sm border border-gray-300 dark:border-neutral-600 rounded-md"
        >
          <li className="p-2 border-b border-gray-300 dark:border-neutral-600 min-w-[9rem] dark:hover:bg-neutral-800">
            <button
              type="button"
              onClick={() => deleteAll()}
              className="flex items-center justify-around gap-2 text-gray-600 dark:text-neutral-500 w-full hover:text-indigo-500 dark:hover:text-neutral-500"
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
          <li className="p-2 border-b border-gray-300 dark:border-neutral-600 dark:hover:bg-neutral-800">
            <button
              type="button"
              onClick={() => doneAll()}
              className="flex items-center justify-around gap-2 text-gray-600 dark:text-neutral-500 w-full hover:text-indigo-500 dark:hover:text-neutral-500"
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
          <li className="p-2 px-4 dark:hover:bg-neutral-800">
            <label className="flex items-center justify-around gap-2 text-gray-600 dark:text-neutral-500 w-full hover:text-indigo-500 dark:hover:text-neutral-500 group cursor-pointer">
              Hide done
              <input
                onChange={() => toggleDone()}
                defaultChecked={!hideDone}
                type="checkbox"
                name="toggleDone"
                id="toggle_done"
                className="rounded border-2 dark:bg-neutral-600 dark:group-hover:border-neutral-500 group-hover:border-indigo-500 checked:border-indigo-500 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
              />
            </label>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MassiveActionsMenu;
