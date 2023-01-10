export type TaskListProps = {
  title: string;
  list: JSX.Element[];
};

const TaskList = ({ title, list }: TaskListProps) => {
  return (
    <div
      className="p-4 pr-3 md:pr-0 max-w-xl mx-auto"
      id={title + "_tasks_list"}
    >
      <h3 className="text-gray-700 dark:text-neutral-300 font-semibold">
        {title} ({list.length})
      </h3>
      <ul>{list}</ul>
    </div>
  );
};

export default TaskList;
