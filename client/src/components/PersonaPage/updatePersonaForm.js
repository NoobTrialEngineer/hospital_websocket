import { Form, Select, Input, DatePicker, Button } from "antd";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { formItemLayout, tailFormItemLayout } from "../../utils/formLayout";
const { Option } = Select;

const UpdatePersonaForm = (props) => {
  const { onFinishUpdate, selectedRow, form2, running } = props;

  const handleFinish = (values) => {
    onFinishUpdate(values, selectedRow, running);
  };

  useEffect(() => {
    form2.setFieldsValue({
      PER_CEDULA: selectedRow[0],
      PER_NOMBRES: selectedRow[1],
      PER_APELLIDOS: selectedRow[2],
      PER_TELEFONO: selectedRow[3],
      PER_CORREO: selectedRow[4],
      PER_GENERO: selectedRow[5],
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
        name="PER_CEDULA"
        initialValue={selectedRow[0]}
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
        <Input disabled={true} />
      </Form.Item>

      <Form.Item
        name="PER_NOMBRES"
        label="Nombres"
        initialValue={selectedRow[1]}
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
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
        name="PER_APELLIDOS"
        label="Apellidos"
        initialValue={selectedRow[2]}
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
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
        initialValue={selectedRow[3]}
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
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
        name="PER_CORREO"
        label="Correo"
        initialValue={selectedRow[4]}
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
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
      name="PER_GENERO"
      label="Genero"
      initialValue={selectedRow[5]}
      rules={[
        {
          required: true,
          message: "Seleccione un autor!",
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
          Actualizar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdatePersonaForm;