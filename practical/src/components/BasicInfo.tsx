import { useEffect, useState } from "react";
import { Footer } from "./common/Footer";
import { Select, Space, Form, Input } from "antd";
import indFlag from "../assets/BasicInfo/India Flag.svg";
import arrow from "../assets/BasicInfo/Vector (Stroke).svg";
import "../style/basicinfo.scss";
interface props {
  setbasicForm: any;
  basicForm: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  handleStateChangeback: () => void;
  handleStateChange: () => void;
  stepNum: number;
}
export const BasicInfo = ({
  handleStateChangeback,
  handleStateChange,
  stepNum,
  basicForm,
  setbasicForm,
}: props) => {
  const [showError, setshowError] = useState(true);
  const [form] = Form.useForm();
  const countryCodes = [
    { label: <img src={indFlag} style={{ marginTop: 10 }} />, value: "+91" },
    // Add more as needed
  ];
  useEffect(()=>{
    form.setFieldValue("firstName",basicForm.firstName)
    form.setFieldValue("lastName",basicForm.lastName)
    form.setFieldValue("email",basicForm.email)
    form.setFieldValue("phoneNumber",basicForm.phoneNumber)
  },[basicForm])
  const handleSelect = (value: any) => {
    let contact = value + basicForm.phoneNumber;
    setbasicForm({
      ...basicForm,
      phoneNumber: contact,
    });
  };

  const handleChangeContact = (e: any) => {
    setbasicForm({
      ...basicForm,
      phoneNumber: e.target.value,
    });
  };
  const handleChangeFirstName = (e: any) => {
    setbasicForm({
      ...basicForm,
      firstName: e.target.value,
    });
  };
  const handleChangeLastName = (e: any) => {
    setbasicForm({
      ...basicForm,
      lastName: e.target.value,
    });
  };
  const handleChangeEmail = (e: any) => {
    setbasicForm({
      ...basicForm,
      email: e.target.value,
    });
  };
  const testValues = () => {
    const hasErrors = form
      .getFieldsError()
      .some((field) => field.errors.length > 0);
    if (
      basicForm.email &&
      basicForm.firstName &&
      basicForm.lastName &&
      basicForm.phoneNumber &&
      !hasErrors
    ) {
      localStorage.setItem('basicInfo',JSON.stringify(basicForm))
      setshowError(false);
    } else {
      setshowError(true);
    }
  };
  useEffect(testValues, [basicForm]);
  return (
    <div className="basic-container">
      <h4 className="title">Basic information</h4>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="vertical"
        autoComplete="off"
        validateTrigger="onChange"
        className="form"
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            { required: true, message: "Please enter first name" },
            { min: 3, message: "First Name must be 3 char long" },
          ]}
        >
          <Input placeholder="First Name" value={basicForm.firstName} onChange={handleChangeFirstName} />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            { required: true, message: "Please enter last name" },
            { min: 3, message: "Last Name must be 3 char long" },
          ]}
        >
          <Input placeholder="Last Name" value={basicForm.lastName} onChange={handleChangeLastName} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter valid address." },
          ]}
        >
          <Input placeholder="Email" value={basicForm.email} onChange={handleChangeEmail} />
        </Form.Item>

        <Form.Item label="Contact">
          <Space.Compact style={{ width: "100%" }}>
            <Form.Item noStyle>
              <Select
                onChange={handleSelect}
                style={{ width: "30%" }}
                options={countryCodes}
                value="+91"
                suffixIcon={<img src={arrow} />}
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              validateTrigger="onChange"
              noStyle
              rules={[
                { required: true, message: "Please enter contact number" },
                { min: 10, message: "Please enter atleast 10 number" },
              ]}
            >
              <Input
                placeholder="Phone number"
                value={basicForm.phoneNumber}
                onChange={handleChangeContact}
                style={{ width: "100%" }}
                type="number"
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Form>
      <Footer
        stepNum={stepNum}
        handleStateChangeback={handleStateChangeback}
        handleStateChange={handleStateChange}
        showError={showError}
      />
    </div>
  );
};
