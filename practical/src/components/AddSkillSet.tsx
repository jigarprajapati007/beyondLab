import { SetStateAction, useEffect, useState } from "react";
import { Input, Select, Tag, Button, Tooltip, Form } from "antd";
import "../style/skill.scss";
import plus from "../assets/Skill/Vector.svg";
import arrow from "../assets/BasicInfo/Vector (Stroke).svg"
import { Footer } from "./common/Footer";
const { Option } = Select;
interface props {
  removeSkill: (skill: any) => void;
  addSkill: () => void;
  addedInputField: string;
  experience: string;
  userAllSkill: any;
  handleInputSkilChange: (e: {
    target: { value: SetStateAction<string> };
  }) => void;
  handleSKilSelect: (value: string) => void;
  handleStateChangeback: () => void;
  handleStateChange: () => void;
  stepNum: number;
}
export const AddSkillSet = ({
  removeSkill,
  addSkill,
  addedInputField,
  experience,
  userAllSkill,
  handleInputSkilChange,
  handleSKilSelect,
  handleStateChangeback,
  handleStateChange,
  stepNum,
}: props) => {
  const [showError, setshowError] = useState(true);

  const detectValue = () =>{
    if(userAllSkill?.length>0){
      setshowError(false)
    }else{
      setshowError(true)
    }
  }
  useEffect(detectValue,[userAllSkill])
  return (
    <div className="skill-container">
      <h3 className="title">Add Skill Sets</h3>

      <div className="space-div">
        {/* <h5 className="h5-tag">Add skill</h5> */}
        <Form className="space-div" layout="vertical">
        <Form.Item className="h5-tag" name="skill" validateTrigger="onChange" label='Add skill'  rules={[
            { min: 2, message: "Skill must be 2 char long" },
          ]}>
        <Input
          placeholder="Add Skill"
          value={addedInputField}
          onChange={handleInputSkilChange}
        />
        </Form.Item>
        {/* <h5 className="h5-tag">Experience level</h5> */}
        <Form.Item className="h5-tag" label='Experience level'>
        <Select value={experience} placeholder="level" onChange={handleSKilSelect} suffixIcon={<img src={arrow} />}>
          <Option value="Beginner">Beginner</Option>
          <Option value="Intermediate">Intermediate</Option>
          <Option value="Expert">Expert</Option>
        </Select>
        </Form.Item>
        </Form>
        <div className="div-skill" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {userAllSkill?.map((skill: any,index:number) => (
            <Tag
              key={index}
              closable
              onClose={() => removeSkill(skill?.name)}
            >
              {skill?.name} ({skill?.experience})
            </Tag>
          ))}
        </div>
      </div>
      <div className="btn-div">
        <Tooltip
          title={
            !addedInputField
              ? "Please fill the in input first to add."
              : "Click to add."
          }
        >
          <Button
            // disabled={addedInputField?.length>=2 ? false : true}
            onClick={addSkill}
            className="btn-add"
          >
            Add
            <img src={plus} alt="" />
          </Button>
        </Tooltip>
      </div>
      <Footer
        stepNum={stepNum}
        handleStateChangeback={handleStateChangeback}
        handleStateChange={handleStateChange}
        showError={showError}
      />
    </div>
  );
};
