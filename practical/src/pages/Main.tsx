import {
  Fragment,
  SetStateAction,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Header } from "../components/common/Header";
import { Stepper } from "../components/common/Stepper";
import { UploadResume } from "../components/UploadResume";
import { BasicInfo } from "../components/BasicInfo";
import { AddSkillSet } from "../components/AddSkillSet";
import { AddEducation } from "../components/AddEducation";
import { Summery } from "../components/Summery";
import { ThankYou } from "../components/ThankYou";
import { message } from "antd";

export default function Main() {
  //steper state
  const [stepNum, setStepNum] = useState<number>(localStorage.getItem("stepNum")&&JSON.parse(localStorage.getItem("stepNum") as any||'0'));
  //upload states
  const [file, setFile] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);
  //Basic information states
  const [basicForm, setbasicForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  //Skill user states
  const [userAllSkill, setUserAllSKills] = useState<any>([]);
  const [addedInputField, setaddedInputField] = useState("");
  const [experience, setExperience] = useState("Intermediate");
  //education state
  const [educations, setEducations] = useState<any>([]);
  //Summary state
  const [check, setCheck] = useState(true);
  //steper handle function
  const detectstepNum = () => {
    if(!stepNum){
      setStepNum(0)
    }
    localStorage.setItem("stepNum", JSON.stringify(stepNum));
  };
  const handleStateChange = () => {
    setStepNum(stepNum+ 1);
  };
  const handleStateChangeback = () => {
    if (stepNum !== 0) {
      setStepNum(stepNum- 1);
    }
  };
  useEffect(detectstepNum, [stepNum]);
  //handle upload file function
  const handleChange = async (file: any) => {
    setFile(file);
    const reader = new FileReader();

    reader.onload = () => {
      const base64String: any = reader.result;
      const fileData = {
        name: file.name,
        size: file.size,
        type: file.type,
        data: base64String,
      };
      localStorage.setItem("uploadedFile", JSON.stringify(fileData));
    };

    reader.readAsDataURL(file);
    setIsUploading(true);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const deleteFile = () => {
    setIsUploading(false);
    setFile({});
    localStorage.removeItem("uploadedFile");
  };

  //skill set functions
  const addSkill = () => {
    if (!addedInputField.trim()) return;
    const newSkill = {
      name: addedInputField.trim(),
      experience,
    };
    if (
      !userAllSkill?.some(
        (item: any) =>
          item?.name === newSkill.name &&
          item?.experience === newSkill.experience
      )
    ) {
      let newArr = [...userAllSkill, newSkill];
      localStorage.setItem("skillData", JSON.stringify(newArr));
      setUserAllSKills(newArr);
    } else {
      message.error("Already exists in list below.");
    }
  };

  const removeSkill = (name: string) => {
    let newArr = userAllSkill.filter((item: any) => item.name !== name);
    setUserAllSKills(newArr);
    if (newArr?.length === 0) {
      localStorage.removeItem("skillData");
    } else if (newArr?.length > 0) {
      localStorage.setItem("skillData", JSON.stringify(newArr));
    }
  };

  const handleInputSkilChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setaddedInputField(e.target.value);
  };

  const handleSKilSelect = (value: string) => {
    setExperience(value);
  };

  //summary part
  const divId = useId(); // unique id
  const printRef = useRef(""); // reference
  const handleDownload = () => {
    const base64String = localStorage.getItem("uploadedFile") &&
    JSON.parse(localStorage.getItem("uploadedFile") || "");
  
    // Create a link and simulate a download
    const link = document.createElement('a');
    link.href = base64String?.data;
    link.download = base64String?.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const checkPersistData = () => {
    //Stepper
    const numStep =localStorage.getItem("stepNum") && JSON.parse(localStorage.getItem("stepNum") as any||'')
    if (numStep !== null) {
      setStepNum(numStep);
    }
    //Upload data
    const fileData =
      localStorage.getItem("uploadedFile") &&
      JSON.parse(localStorage.getItem("uploadedFile") || "");
    setFile(fileData);
    if (fileData) {
      setIsUploading(true);
    }

    //Basic info
    const basicInfo =
      localStorage.getItem("basicInfo") &&
      JSON.parse(localStorage.getItem("basicInfo") || "");
    setbasicForm({
      email: basicInfo?.email,
      firstName: basicInfo?.firstName,
      lastName: basicInfo?.lastName,
      phoneNumber: basicInfo?.phoneNumber,
    });

    //skill data
    const skillData =
      localStorage.getItem("skillData") &&
      JSON.parse((localStorage.getItem("skillData") as any) || []);
    if (skillData !== null) {
      setUserAllSKills(skillData);
    }

    //education
    const eduData =
      localStorage.getItem("educationData") &&
      JSON.parse((localStorage.getItem("educationData") as any) || []);
    if (eduData !== null) {
      setEducations(eduData);
    }
  };
  useEffect(checkPersistData, []);
  const getAllElement = () => {
    switch (stepNum) {
      case 0:
        return (
          <UploadResume
            handleStateChange={handleStateChange}
            stepNum={stepNum}
            isUploading={isUploading}
            handleChange={handleChange}
            file={file}
            deleteFile={deleteFile}
          />
        );
      case 1:
        return (
          <BasicInfo
            setbasicForm={setbasicForm}
            basicForm={basicForm}
            handleStateChangeback={handleStateChangeback}
            handleStateChange={handleStateChange}
            stepNum={stepNum}
          />
        );
      case 2:
        return (
          <AddSkillSet
            addedInputField={addedInputField}
            experience={experience}
            userAllSkill={userAllSkill}
            addSkill={addSkill}
            removeSkill={removeSkill}
            handleInputSkilChange={handleInputSkilChange}
            handleSKilSelect={handleSKilSelect}
            handleStateChangeback={handleStateChangeback}
            handleStateChange={handleStateChange}
            stepNum={stepNum}
          />
        );
      case 3:
        return (
          <AddEducation
            handleStateChangeback={handleStateChangeback}
            handleStateChange={handleStateChange}
            stepNum={stepNum}
            setEducations={setEducations}
            educations={educations}
          />
        );
      case 4:
        return (
          <Summery
            handleStateChangeback={handleStateChangeback}
            divId={divId}
            handleDownload={handleDownload}
            printRef={printRef}
            check={check}
            setCheck={setCheck}
            handleStateChange={handleStateChange}
            file={file}
            basicForm={basicForm}
            userAllSkill={userAllSkill}
            educations={educations}
          />
        );
      case 5:
        return <ThankYou />;
      default:
        break;
    }
  };
  return (
    <Fragment>
      <Header />
      <Stepper stepNum={stepNum} />
      {getAllElement()}
    </Fragment>
  );
}
