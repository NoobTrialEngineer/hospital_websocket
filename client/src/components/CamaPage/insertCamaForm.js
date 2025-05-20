import { Select, Form, Input, DatePicker, Checkbox, Button } from "antd";
import { tailFormItemLayout, formItemLayout } from "../../utils/formLayout";
import React from "react";
const { Option } = Select;

const InsertCamaForm = (props) => {
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
        name="idCama"
        label="Codigo"
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese un codigo para la cama!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="espeNombre"
        label="Especialidad"
        rules={[
          {
            required: true,
            message: "Seleccione una especialidad!",
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
            <Option key={item[0]} value={item[0]}>{`${item[0]}`}</Option>
          ))}
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

export default InsertCamaForm;