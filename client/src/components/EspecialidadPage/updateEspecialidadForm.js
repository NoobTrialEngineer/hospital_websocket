import { Form, Select, Input, DatePicker, Button } from "antd";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { formItemLayout, tailFormItemLayout } from "../../utils/formLayout";
const { Option } = Select;

const UpdateEspecialidadForm = (props) => {
  const { onFinishUpdate, selectedRow, form2, running } = props;

  const handleFinish = (values) => {
    onFinishUpdate(values, selectedRow, running);
  };

  useEffect(() => {
    form2.setFieldsValue({
      ID_ZONA: selectedRow[0],
      ZONA_CALLE_PRINCIPAL: selectedRow[1],
      ZONA_CALLE_SECUNDARIA: selectedRow[2],
      ZONA_REFERENCIA: selectedRow[3],
      ZONA_PARROQUIA: selectedRow[4],
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
        name="nombre"
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
        <Input disabled={true} />
      </Form.Item>

      <Form.Item
        name="descripcion"
        label="Descripción"
        initialValue={selectedRow[1]}
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese una descripción!",
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

export default UpdateEspecialidadForm;
