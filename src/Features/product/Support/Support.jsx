import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import './Support.css'; // Add this file

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const onFinish = values => {
  console.log(values);
};

const Support = () => (
  <div className="support-container">
    <h2 className="form-title">Support Form</h2>
    <Form
      {...layout}
      name="support-form"
      onFinish={onFinish}
      className="support-form"
      validateMessages={validateMessages}
    >
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'Number']} label="Phone Number" rules={[{ type: 'Number', required: true  }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'Query']} label="Query" rules={[{required: true  }]}> 
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default Support;
