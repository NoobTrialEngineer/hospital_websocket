import { Select, Form, Input, DatePicker, Checkbox, Button } from "antd";
import { tailFormItemLayout, formItemLayout } from "../../utils/formLayout";
import React from "react";
const { Option } = Select;

const InsertHospitalForm = (props) => {
  const { form, onFinish, running, data } = props;

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
        name="HOS_NOMBRE"
        label="Nombre"
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
        name="ID_ZONA"
        label="Zona"
        rules={[
          {
            required: true,
            message: "Seleccione un codigo de zona!",
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="Selecciona una opción"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {data.map(item => (
            <Option key={item[0]} value={item[0]}>{`${item[1]} y ${item[2]}`}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="HOS_TELEFONO"
        label="Telefono"
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese un telefono!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="HOS_CORREO"
        label="Correo"
        rules={[
          {
            type: "email",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese un correo!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="HOS_SITIO_WEB"
        label="Sitio Web"
        rules={[
          {
            type: "url",
            message: "Ingrese un sitio web valido!",
          },
          {
            required: true,
            message: "Ingrese un sitio Web!",
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

export default InsertHospitalForm;