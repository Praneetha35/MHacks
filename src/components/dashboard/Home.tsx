import { UserModelSchemaType } from "@/schema/UserSchema";
import React, { useState } from "react";
import { Container, Paper, Button as MuiButton } from "@mui/material";
import { Form, Input, Button, Modal } from "antd";

// const {  Form, Input  } = antd;

interface IProps {
  user: Omit<UserModelSchemaType, "password">;
}

const Home = ({ user }: IProps) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <Paper
      sx={{
        flexGrow: 1,
        py: 5,
        marginTop: 10,
      }}
    >
      <Container maxWidth={false}>
        <h1>Welcome to your dashboard: {user.name}</h1>
        <MuiButton
          onClick={showModal}
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            padding: "10px 0",
            backgroundColor: "#4caf50",
            "&:hover": {
              backgroundColor: "#388e3c",
            },
            marginBottom: 2,
          }}
        >
          ADD GOAL
        </MuiButton>
        <Modal
          title="Add you Goal"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form
            name="layout-multiple-horizontal"
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              label="horizontal"
              name="horizontal"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              layout="vertical"
              label="vertical"
              name="vertical"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>
          </Form>
          <br />
          <Form
            name="layout-multiple-vertical"
            layout="vertical"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              label="vertical"
              name="vertical"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              layout="horizontal"
              label="horizontal"
              name="horizontal"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </Paper>
  );
};

export default Home;
