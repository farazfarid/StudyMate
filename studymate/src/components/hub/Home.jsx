import Clock from "./Clock";
import Day from "./Day";
import Weather from "../weather/Weather";
import { styles } from "../../styles";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex py-4 px-2">
        <h2
          className={`${styles.heroHeadText} text-center drop-shadow-glow dark:text-slate-100`}
        >
          Welcome to StudyMate!
        </h2>
      </div>
      <Clock />
      <Day />
      <Weather />
    </div>
  );
};

export default Home;
