const Clock = () => {
  const date = new Date().toDateString().split(" ");
  const weekday = date[0];
  const month = date[1];
  const day = date[2];

  return (
    <p className="grid grid-cols-2 grid-rows-2 dark:text-neutral-300">
      <span className="row-span-2 font-semibold text-4xl mr-1">{day}</span>
      <span className="text-sm">{weekday}</span>
      <span className="text-sm">{month}</span>
    </p>
  );
};

export default Clock;
