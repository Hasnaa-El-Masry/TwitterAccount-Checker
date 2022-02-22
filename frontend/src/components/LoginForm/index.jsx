import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button} from "antd";
import styles from "./styles.module.scss";
import { AuthContext } from "../../AuthContext/authContext";

// Global style to change antd Liberay style:
import "./styles.scss";

const phoneRegx = /^\d{11,}$/;

function LoginForm() {
  const history = useHistory();
  const [imageUpload, setImageUpload] = useState(null);
  const { login } = useContext(AuthContext);

  //Display Img function:

  const onUploadHandler = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageUpload(reader.result);
      console.log(imageUpload);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const onFinish = (values) => {
    history.push({
      pathname: "/welcome",
      state: { ...values, imageUpload },
    });
    login();
  };

  return (
    <div className={styles.loginForm}>
      <Form name="basic" onFinish={onFinish} layout="vertical">
        <header>
          <h2>Please fill this form:</h2>
        </header>
        <div className={styles["inputs-group"]}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className={styles["inputs-group"]}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your password!" },
            () => ({
              validator(_, value) {
                if (!value || phoneRegx.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("please enter an invalid phone number!")
                );
              },
            }),
          ]}
        >
          <Input placeholder="Number Filed" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <div className={styles.image_input}>
          <input
            type="file"
            accept="image/png, image/jpg"
            onChange={(e) => onUploadHandler(e)}
          />
          {imageUpload && (
            <div className={styles.image_input__image_upload}>
              <img src={`${imageUpload}`} alt="img" />
            </div>
          )}
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: ".5rem" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
