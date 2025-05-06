import { FileUploader } from "react-drag-drop-files";
import "../style/upload.scss";
import { Button, Flex, Progress, Spin } from "antd";
import upload from "../assets/Upload-resume/cloud-add.svg";
import pdf from "../assets/Upload-resume/pdf.svg";
import loading from "../assets/Upload-resume/Loading.svg";
import close from "../assets/Upload-resume/close.svg";
import tick from "../assets/Upload-resume/tick-circle.svg";
import trash from "../assets/Upload-resume/trash.svg";
import { useEffect, useState } from "react";
import { Footer } from "./common/Footer";
interface props {
  handleStateChange: () => void;
  stepNum: number;
  handleChange: (file: any) => void;
  isUploading: boolean;
  file: any;
  deleteFile: () => void;
}
export const UploadResume = ({
  handleStateChange,
  stepNum,
  handleChange,
  isUploading,
  file,
  deleteFile,
}: props) => {
  const fileTypes = ["PDF", "DOCX"];
  const [count, setCount] = useState(0);
  const [showError, setshowError] = useState(true);
  const getCountMemory = () => {
    if(file?.name){
      setshowError(false)
    }else{
      setshowError(true)
    }
    setCount(0);
    setTimeout(() => setCount(count + file?.size / 3), 300);
    setTimeout(() => setCount(count + file?.size / 1.5), 300);
    setTimeout(() => setCount(file?.size), 400);
  };
  useEffect(getCountMemory, [file]);
  return (
    <div className="upload-container">
      <h2 className="title">Upload resume</h2>
      <FileUploader handleChange={handleChange} types={fileTypes}>
        <div className="cnt-div">
          <img src={upload} alt="" className="img-upload" />
          <h4 className="h4-text">Choose a file or drag & drop it here</h4>
          <p className="p-tag">
            Please Upload Your Resume (PDF, DOC formats only)
          </p>
          <Button>Browse File</Button>
        </div>
      </FileUploader>
      <div
        className="footer-div"
        style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
      >
        {isUploading && (
          <div className="div-main-file">
            <div className="div-file">
              <img src={pdf} alt="" />
              <div style={{ marginTop: 10 }}>
                <div className="close-div">
                  <h4 className="file-h4">{file?.name}</h4>
                  <img
                    onClick={deleteFile}
                    src={count === file?.size ? trash : close}
                    alt=""
                  />
                </div>
                <div className="div-load">
                  <p>
                    {count} B of {file?.size} B
                  </p>
                  <div style={{ color: "#a9acb4", marginTop: -15 }}>•</div>
                  {count === file?.size ? (
                    <img src={tick} style={{ marginTop: -15 }}></img>
                  ) : (
                    <Spin
                      indicator={
                        <img
                          src={loading}
                          style={{
                            animation: "spin 1s linear infinite",
                            marginTop: -15,
                          }}
                        />
                      }
                    />
                  )}
                  <h6>{count === file?.size ? "Completed" : "Uploading..."}</h6>
                </div>
              </div>
            </div>
            <Flex gap="small" vertical>
              <Progress
                percent={count}
                strokeColor="#f66135"
                trailColor="#CBD0DC"
                showInfo={false}
              />
            </Flex>
          </div>
        )}
        <Footer
          stepNum={stepNum}
          handleStateChange={handleStateChange}
          showError={showError}
        />
      </div>
    </div>
  );
};
