import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import "../style/summary.scss";
import down from "../assets/Summary/download.svg";
import { Button, Checkbox, Tooltip } from "antd";
interface props {
  handleDownload: () => void;
  divId: any;
  printRef: any;
  check: boolean;
  setCheck: Dispatch<SetStateAction<boolean>>;
  handleStateChangeback: () => void;
  handleStateChange: () => void;
  file: any;
  basicForm: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  userAllSkill: { name: string; experience: string }[];
  educations: {
    degree: string;
    university: string;
    startYear: string;
    endYear: string;
  }[];
}
export const Summery = ({
  handleDownload,
  divId,
  printRef,
  check,
  setCheck,
  handleStateChangeback,
  handleStateChange,
  file,
  basicForm,
  userAllSkill,
  educations,
}: props) => {
  useEffect(()=>setCheck(true),[])
  return (
    <div className="summary-container" id={divId}>
      <h4 className="title">Summary</h4>
      <hr className="hr-tag" />
      <h5 className="title-all">Resume</h5>
      <p className="que">File Name</p>

      <div className="down-div">
        <h5 className="ans">{file?.name}</h5>
        <img src={down} alt="" onClick={handleDownload} />
      </div>
      <hr className="hr-tag" />
      <div ref={printRef}>
        <h5 className="title-all">Basic Information</h5>
        <div className="info-div-basic">
          <div>
            <p className="que">First Name</p>
            <h5 className="ans">{basicForm.firstName}</h5>
          </div>
          <div>
            <p className="que">Last Name</p>
            <h5 className="ans">{basicForm.lastName}</h5>
          </div>
          <div>
            <p className="que">Email id</p>
            <h5 className="ans">{basicForm.email}</h5>
          </div>
          <div>
            <p className="que">Phone Number</p>
            <h5 className="ans">{basicForm.phoneNumber}</h5>
          </div>
        </div>
        <hr className="hr-tag" />
        <h5 className="title-all">Skill Sets</h5>
        <div className="info-div-skill">
          {userAllSkill?.length > 0 &&
            userAllSkill?.map((item, index) => {
              return (
                <Fragment key={item.name}>
                  <div>
                    <p className="que">Skill-{index + 1}</p>
                    <h5 className="ans">{item.name}</h5>
                  </div>
                  <div>
                    <p className="que">Experience Level</p>
                    <h5 className="ans">{item?.experience}</h5>
                  </div>
                </Fragment>
              );
            })}
        </div>
        <hr className="hr-tag" />
        <h5 className="title-all">Education</h5>
        {educations?.length > 0 &&
          educations?.map((item, index) => {
            return (
              <div className="info-div-edu" key={index}>
                <div>
                  <p className="que">Degree Name</p>
                  <h5 className="ans">{item.degree}</h5>
                </div>
                <div>
                  <p className="que">University</p>
                  <h5 className="ans">{item.university}</h5>
                </div>
                <div>
                  <p className="que">Year of Starting</p>
                  <h5 className="ans">{item.startYear}</h5>
                </div>
                <div>
                  <p className="que">Year of completion</p>
                  <h5 className="ans">{item.endYear}</h5>
                </div>
              </div>
            );
          })}
      </div>
      <hr className="hr-tag" />
      <p className="terms">
        By submitting this form, you confirm that all information provided is
        accurate and complete to the best of your knowledge. Any false orF
        misleading information may result in disqualification from the
        recruitment process or termination of employment if discovered later.
      </p>
      <p className="terms">
        Submission of this form does not guarantee an interview or employment.
        Your personal data will be handled confidentially and used solely for
        recruitment purposes in accordance with Beyonds Labs LLC Privacy Policy.
      </p>
      <Checkbox className="custom-checkbox" onChange={() => setCheck(!check)}>
        By submitting, you agree to our Terms & Conditions.
      </Checkbox>
      <div className="div-footer">
        <Button className="back-btn" onClick={handleStateChangeback}>
          EDIT
        </Button>
        <Tooltip
          title={
            check
              ? "Please aggree terms & condition to submit."
              : "Click to submit"
          }
        >
          <Button
            className="next-btn"
            onClick={handleStateChange}
            disabled={check}
          >
            CONFIRM
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
