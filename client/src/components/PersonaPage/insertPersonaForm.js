import { Select, Form, Input, DatePicker, Checkbox, Button } from "antd";
import { tailFormItemLayout, formItemLayout } from "../../utils/formLayout";
import React from "react";
const { Option } = Select;

const InsertPersonaForm = (props) => {
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
        name="PER_CEDULA"
        label="Cedula"
        rules={[
          {
            type: "string",
            message: "Ingrese una cedula valida!",
          },
          {
            required: true,
            message: "Ingrese una cedula!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="PER_NOMBRES"
        label="Nombres"
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese un nombre!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="PER_APELLIDOS"
        label="Apellidos"
        rules={[
          {
            type: "string",
            message: "Ingrese un apellido valido!",
          },
          {
            required: true,
            message: "Ingrese un apellido!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="PER_TELEFONO"
        label="Telefono"
        rules={[
          {
            type: "string",
            message: "Ingrese un telefono valido!",
          },
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="PER_CORREO"
        label="Correo"
        rules={[
          {
            type: "email",
            message: "Ingrese un correo valido!",
          },
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      name="PER_GENERO"
      label="Genero"
      rules={[
        {
          required: true,
          message: "Seleccione un genero!",
        },
      ]}
      >
      <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Selecciona una opción"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
        <Option key={1} value={"Masculino"}>Masculino</Option>
        <Option key={2} value={"Femenino"}>Femenino</Option>
    </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InsertPersonaForm;