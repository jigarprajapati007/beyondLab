import { Button } from "antd";
import "../style/thank.scss";

export const ThankYou = () => {
  return (
    <div className="thank-container">
      <div className="title">
        <h3>Greate!</h3>
        <h4>Thank You For Applying</h4>
      </div>
      <p>
        We appreciate your application. Our team will review it, and we’ll reach
        out soon if there’s a match. Stay tuned!
      </p>
      <div>
        <Button>TRACK APPLICATION</Button>
      </div>
    </div>
  );
};
