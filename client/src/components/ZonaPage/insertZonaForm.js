import { Select, Form, Input, DatePicker, Checkbox, Button } from "antd";
import { tailFormItemLayout, formItemLayout } from "../../utils/formLayout";
import React from "react";
const { Option } = Select;

const InsertZonaForm = (props) => {
  const { form, onFinish, running } = props;

  const handleFinish = (values) => {
    onFinish(values, running);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={handleFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="ID_ZONA"
        label="ID Zona"
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese una zona!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ZONA_CALLE_PRINCIPAL"
        label="Calle Principal"
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese una calle principal!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ZONA_CALLE_SECUNDARIA"
        label="Calle Secundaria"
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese una calle secundaria!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ZONA_REFERENCIA"
        label="Referencia"
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese una referencia!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ZONA_PARROQUIA"
        label="Parroquia"
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese una parroquia!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InsertZonaForm;