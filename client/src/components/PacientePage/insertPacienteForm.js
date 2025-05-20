import { Select, Form, Input, DatePicker, Checkbox, Button } from "antd";
import { tailFormItemLayout, formItemLayout } from "../../utils/formLayout";
import React from "react";
const { Option } = Select;

const InsertPacienteForm = (props) => {
  const { form, onFinish, running, data, data2} = props;

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
        name="cedula"
        label="Cedula"
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
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="Selecciona una opción"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {data.map((item) => (
            <Option
              key={item[0]}
              value={item[0]}
            >{`${item[0]}: ${item[1]} ${item[2]}`}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="idZona"
        label="Zona"
        rules={[
          {
            required: true,
            message: "Ingrese el nombre de un hospital!",
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
          {data2.map((item) => (
            <Option
              key={item[0]}
              value={item[0]}
            >{`${item[0]}: ${item[1]} y ${item[2]}`}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="historial"
        label="Historial Medico"
        rules={[
          {
            required: true,
            message: "Ingrese el historial medico!",
          },
        ]}
      >
        <Input.TextArea autoSize />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InsertPacienteForm;