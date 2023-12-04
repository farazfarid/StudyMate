import { styles } from "../../styles";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDay() {
  const day = new Date().getDay();

  return DAYS[day];
}

const Day = () => {
  return (
    <div className="flex py-4 px-2">
      <h4
        className={`${styles.heroSubText} text-center drop-shadow-glow dark:text-slate-100`}
      >
        Today is {getDay()}
      </h4>
    </div>
  );
};

export default Day;
