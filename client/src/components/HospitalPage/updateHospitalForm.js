import { Form, Select, Input, DatePicker, Button } from "antd";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { formItemLayout, tailFormItemLayout } from "../../utils/formLayout";
const { Option } = Select;

const UpdateHospitalForm = (props) => {
  const { onFinishUpdate, selectedRow, form2, running, data } = props;

  const handleFinish = (values) => {
    onFinishUpdate(values, selectedRow, running);
  };

  useEffect(() => {
    form2.setFieldsValue({
      HOS_NOMBRE: selectedRow[0],
      ID_ZONA: selectedRow[1],
      HOS_TELEFONO: selectedRow[2],
      HOS_CORREO: selectedRow[3],
      HOS_SITIO_WEB: selectedRow[4],
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
        name="HOS_NOMBRE"
        label="Nombre"
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
        <Input />
      </Form.Item>

      <Form.Item
        name="ID_ZONA"
        label="Zona"
        initialValue={selectedRow[1]}
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
        initialValue={selectedRow[2]}
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
        label="Referencia"
        initialValue={selectedRow[3]}
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
        initialValue={selectedRow[4]}
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
          Actualizar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateHospitalForm;
