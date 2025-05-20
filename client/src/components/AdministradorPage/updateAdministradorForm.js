import { Form, Select, Input, DatePicker, Button } from "antd";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { formItemLayout, tailFormItemLayout } from "../../utils/formLayout";
const { Option } = Select;

const UpdateAdministradorForm = (props) => {
  const { onFinishUpdate, selectedRow, form2, running, data, data2 } = props;

  const handleFinish = (values) => {
    onFinishUpdate(values, selectedRow, running);
  };

  useEffect(() => {
    form2.setFieldsValue({
      PER_CEDULA: selectedRow[0],
      ADM_USUARIO: selectedRow[1],
      ADM_CONTRASENA: selectedRow[2],
      ADM_CARGO: selectedRow[3],
      HOS_NOMBRE: selectedRow[4],
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
        name="ADM_USUARIO"
        label="Nombre de Usuario"
        rules={[
          {
            required: true,
            message: "Seleccione un codigo de zona!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ADM_CONTRASENA"
        label="Contraseña"
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese una contraseña!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="ADM_CARGO"
        label="Rol"
        rules={[
          {
            required: true,
            message: "Ingrese un cargo!",
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
          <Option key={1} value={"GESTOR"}>
            {"GESTOR"}
          </Option>
          <Option key={2} value={"ADMIN"}>
            {"ADMIN"}
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="HOS_NOMBRE"
        label="Hospital"
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
            >{`${item[0]}: ${item[1]}`}</Option>
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

export default UpdateAdministradorForm;
