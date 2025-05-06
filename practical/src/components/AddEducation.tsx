import { SetStateAction, useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Col,
  Tag,
  ConfigProvider,
  message,
} from "antd";
import { Footer } from "./common/Footer";
import "../style/education.scss";
import cal from "../assets/Education/calendar-edu.svg";
import left from "../assets/Education/Chevron-left.svg";
import right from "../assets/Education/Chevron-right.svg";
import plus from "../assets/Skill/Vector.svg";
import sixDot from "../assets/Education/sixDot.svg";

import dayjs from "dayjs";
interface props {
  setEducations: SetStateAction<any>;
  educations: any;
  // handleSKilSelect: (value: string) => void;
  handleStateChangeback: () => void;
  handleStateChange: () => void;
  stepNum: number;
}
export const AddEducation = ({
  handleStateChangeback,
  handleStateChange,
  stepNum,
  setEducations,
  educations,
}: props) => {
  const [showError, setshowError] = useState(true);
  const [showDisable, setshowDisable] = useState(true);

  const [formField, setformField] = useState({
    startDate: "",
    endDate: "",
    degree: "",
    college: "",
  });

  const [form] = Form.useForm();

  const checkErrors = () => {
    if (
      formField.college &&
      formField.degree &&
      formField.endDate &&
      formField.startDate
    ) {
      setshowDisable(false);
    } else {
      setshowDisable(true);
    }
  };
  const disabilityNextBtn = () => {
    if (educations?.length > 0) {
      setshowError(false);
    } else {
      setshowError(true);
    }
  };
  useEffect(checkErrors, [formField]);
  useEffect(disabilityNextBtn, [educations]);
  const onAdd = () => {
    form.validateFields().then((values) => {
      const { degree, university, dateStart, dateEnd } = values;
      const newEntry = {
        degree,
        university,
        startYear: dateStart.format("DD/MM/YYYY"),
        endYear: dateEnd.format("DD/MM/YYYY"),
      };
      if (
        !educations.some(
          (item: {
            degree: string;
            university: string;
            startYear: string;
            endYear: string;
          }) =>
            item.degree === newEntry.degree &&
            item.university === newEntry.university &&
            item.startYear === newEntry.startYear &&
            item.endYear === newEntry.endYear
        )
      ) {
        let newArr = [...educations,newEntry] as any
        localStorage.setItem('educationData',JSON.stringify(newArr))
        setEducations(newArr);
      } else {
        message.error("Already exists in list below.");
      }
      
    });
  };

  const onRemove = (indexToRemove: any) => {
    let newArr = educations.filter((_: any, i: any) => i !== indexToRemove)
    setEducations(newArr);
    if(newArr?.length===0){
      localStorage.removeItem("educationData");
     }else if(newArr?.length > 0){
       localStorage.setItem("educationData", JSON.stringify(newArr));
     }
  };

  const startDateChange = (value: any) => {
    setformField({ ...formField, startDate: value });
    form.setFieldsValue({
      dateStart: dayjs(value),
    });
  };
  const endDateChange = (value: any) => {
    form.setFieldsValue({
      dateEnd: dayjs(value),
    });
    setformField({ ...formField, endDate: value });
  };
  const degreeChange = (e: any) => {
    setformField({ ...formField, degree: e.target.value });
  };
  const collegeChange = (e: any) => {
    setformField({ ...formField, college: e.target.value });
  };
  return (
    <div className="edu-container">
      <h3 className="title">Add Education</h3>

      <Form form={form} layout="vertical" className="form">
        <Col>
          <Form.Item
            name="degree"
            label="Add Degree"
            rules={[{ required: true, message: "Please enter a degree" }]}
          >
            <Input
              onChange={degreeChange}
              placeholder="e.g. BSC, MBA"
              value={formField.degree}
            />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="university"
            label="University/College"
            rules={[
              {
                required: true,
                message: "Please enter a university or college",
              },
            ]}
          >
            <Input
              onChange={collegeChange}
              value={formField.college}
              placeholder="e.g. Stanford University"
            />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="dateStart"
            label="Starting Year"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#f66135",
                  fontSize: 16,
                  fontWeightStrong: 400,
                  colorText: "#484848",
                  padding: 20,
                },
                components: {
                  DatePicker: {
                    cellHoverBg: "#f66135",
                    activeBorderColor: "#f66135",
                    activeBg: "#f66135",
                  },
                },
              }}
            >
              <DatePicker
                format="DD/MM/YYYY"
                value={formField.startDate}
                onChange={startDateChange}
                superNextIcon={false}
                superPrevIcon={false}
                showToday={false}
                showNow={false}
                prevIcon={<img src={left} alt="" />}
                nextIcon={<img src={right} alt="" />}
                showWeek={false}
                suffixIcon={<img src={cal} style={{ width: 25, height: 26 }} />}
              />
            </ConfigProvider>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="dateEnd"
            label="Ending Year"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#f66135",
                  fontSize: 16,
                  fontWeightStrong: 400,
                  colorText: "#484848",
                  padding: 20,
                },
                components: {
                  DatePicker: {
                    cellHoverBg: "#f66135",
                    activeBorderColor: "#f66135",
                    activeBg: "#f66135",
                  },
                },
              }}
            >
              <DatePicker
                value={formField.endDate}
                onChange={endDateChange}
                format="DD/MM/YYYY"
                superNextIcon={false}
                superPrevIcon={false}
                showToday={false}
                showNow={false}
                prevIcon={<img src={left} alt="" />}
                nextIcon={<img src={right} alt="" />}
                showWeek={false}
                suffixIcon={<img src={cal} style={{ width: 25, height: 26 }} />}
              />
            </ConfigProvider>
          </Form.Item>
        </Col>
      </Form>
      <div className="edu-list">
        {educations.map(
          (
            edu: {
              degree: string;
              university: string;
              startYear: string;
              endYear: string;
            },
            index: number
          ) => (
            <Tag
              key={index}
              style={{
                padding: "8px 12px",
                marginBottom: 8,
                display: "clock",
                alignItems: "center",
              }}
              closable
              onClose={() => onRemove(index)}
              icon={<img src={sixDot} />}
            >
              {edu.degree}- {edu.university} ({edu.startYear.slice(-4)}–
              {edu.endYear.slice(-4)})
            </Tag>
          )
        )}
      </div>
      <div className="div-btn">
        <Button
          type="primary"
          className="btn-add"
          onClick={onAdd}
          disabled={showDisable}
        >
          Add
          <img src={plus} alt="" />
        </Button>
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
