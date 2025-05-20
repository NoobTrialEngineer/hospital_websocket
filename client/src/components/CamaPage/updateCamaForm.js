import { Form, Select, Input, DatePicker, Button } from "antd";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { formItemLayout, tailFormItemLayout } from "../../utils/formLayout";
const { Option } = Select;

const UpdateCamaForm = (props) => {
  const { onFinishUpdate, selectedRow, form2, running, data } = props;

  const handleFinish = (values) => {
    onFinishUpdate(values, selectedRow, running);
  };

  useEffect(() => {
    form2.setFieldsValue({
      idCama: selectedRow[0],
      espeNombre: selectedRow[1],
    });
  }, [selectedRow, form2]);

  return (
    <Form
      {...formItemLayout}
      form={form2}
      name="update"
      onFinish={handleFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
       <Form.Item
        name="idCama"
        label="Codigo"
        initialValue={selectedRow[0]}
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
        <Input disabled />
      </Form.Item>

      <Form.Item
        name="espeNombre"
        label="Especialidad"
        initialValue={selectedRow[1]}
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
          Actualizar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCamaForm;
