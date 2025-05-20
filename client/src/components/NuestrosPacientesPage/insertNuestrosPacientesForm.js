import { Select, Form, Input, DatePicker, Checkbox, Button } from "antd";
import { tailFormItemLayout, formItemLayout } from "../../utils/formLayout";
import React, { useEffect } from "react";
const { Option } = Select;

const InsertNuestrosPacientesForm = (props) => {
  const { form, onFinish, running, data, selectedRow } = props;

  const handleFinish = (values) => {
    onFinish(values, running);
  };

  useEffect(() => {
    form.setFieldsValue({
      idCama: selectedRow[0],
    });
  }, [selectedRow, form]);


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
        name="devFechaSalida"
        label="Fecha Salida"
        rules={[
          {
            required: true,
            message: "Seleccione una especialidad!",
          },
        ]}
      >
        <DatePicker
          showTime={{
            format: "HH:mm",
          }}
          format="YYYY-MM-DD HH:mm"
        />

      </Form.Item>



      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InsertNuestrosPacientesForm;
