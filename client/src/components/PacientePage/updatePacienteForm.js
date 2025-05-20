import { Form, Select, Input, DatePicker, Button } from "antd";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { formItemLayout, tailFormItemLayout } from "../../utils/formLayout";
const { Option } = Select;

const UpdatePacienteForm = (props) => {
  const { onFinishUpdate, selectedRow, form2, running, data, data2 } = props;

  const handleFinish = (values) => {
    onFinishUpdate(values, selectedRow, running);
  };

  useEffect(() => {
    form2.setFieldsValue({
      cedula: selectedRow[0],
      idZona: selectedRow[1],
      historial: selectedRow[2],
    });
  }, [selectedRow, form2]);

  return (
    <Form
    {...formItemLayout}
    form={form2}
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
      initialValue={selectedRow[0]}
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
        disabled
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
      initialValue={selectedRow[1]}
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
      initialValue={selectedRow[2]}
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
          Actualizar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdatePacienteForm;
