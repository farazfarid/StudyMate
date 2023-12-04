function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let time = "";
  time += hours;
  time += ":";
  time += minutes < 10 ? "0" + minutes : minutes;

  return time;
}

const Clock = () => {
  return (
    <div className="flex py-2">
      <div className="text-9xl text-white dark:text-black">
        {getCurrentTime()}
      </div>
    </div>
  );
};

export default Clock;
