import { Button, Tooltip } from "antd";
import "../../../src/style/footer.scss";
import React from "react";
type ChildComponentProps = {
  stepNum: number;
  handleStateChange: () => void;
  handleStateChangeback?: () => void;
  showError: boolean;
};
export const Footer: React.FC<ChildComponentProps> = ({
  handleStateChange,
  handleStateChangeback,
  stepNum,
  showError,
}) => {
  return (
    <div className="div-footer" style={{ width: stepNum > 0 ? 612 : "177px" }}>
      {stepNum > 0 && (
        <Button className="back-btn" onClick={handleStateChangeback}>
          BACK
        </Button>
      )}
      <Tooltip
        title={
          showError
            ? "Please fill the fields first to continue."
            : "Click to next page."
        }
      >
        <Button
          className="next-btn"
          disabled={showError}
          onClick={handleStateChange}
        >
          NEXT
        </Button>
      </Tooltip>
    </div>
  );
};
