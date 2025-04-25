import { errorMsg, successMsg } from "@/components/hooks";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/apis/users";
import { setToken } from "@/features/slices/app";
import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      if (isRegisterMode) {
        await registerUser(values).unwrap();
        successMsg("Registration successful. Please log in.");
        setIsRegisterMode(false);
      } else {
        const token = await loginUser(values).unwrap();
        dispatch(setToken(token));
        successMsg("Login successful");
        navigate("/");
      }
    } catch (error) {
      errorMsg((error as any)?.data?.detail || "Operation failed");
    }
  };

  return (
    <Card
      title={isRegisterMode ? "Register" : "Login"}
      style={{ width: 300, margin: "auto", marginTop: 100 }}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Enter email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Enter password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoggingIn || isRegistering}
            block
          >
            {isRegisterMode ? "Register" : "Login"}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="link"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            block
            {...{ "data-testid": "toggle-mode" }}
          >
            {isRegisterMode
              ? "Already have an account? Login"
              : "New user? Register"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
