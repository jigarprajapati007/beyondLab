import { Steps } from "antd";
import done from "../../../src/assets/Header/done.svg";
import progress from "../../../src/assets/Header/progress.svg";
import will from "../../../src/assets/Header/willbe.svg";
import empty from "../../../src/assets/Header/empty.svg";
import "../../../src/style/steps.scss";
interface props {
  stepNum: any;
}
export const Stepper = ({stepNum }: props) => {
  return (
    <Steps
      current={stepNum}
      labelPlacement="vertical"
      items={[
        {
          icon: <img src={stepNum===0?progress:done} alt="done" />,
          title: "Upload Resume",
        },
        {
          icon: <img src={stepNum===1?progress:stepNum>1?done:will} alt="progress" />,
          title: "Basic Information",
        },
        {
          icon: <img src={stepNum===2?progress:stepNum>2?done:stepNum<1?empty:will} alt="will" />,
          title: "Skill Set",
        },
        {
          icon: <img src={stepNum===3?progress:stepNum>3?done:stepNum<2?empty:will} alt="will" />,
          title: "Education",
        },
        {
          icon: <img src={stepNum===4?progress:stepNum>4?done:stepNum<3?empty:will} alt="will" />,
          title: "Summary",
        },
        {
          icon: <img src={stepNum===5?done:stepNum<5&&stepNum===4?will:stepNum<4?empty:will} alt="will" />,
          title: "Completed",
        },
      ]}
    />
  );
};
