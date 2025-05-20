import React, { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, notification } from "antd";
import DataTable from "../components/PersonaPage/table";
import PersonaColumn from "../data/PersonaColumn";
import ModalOpen from "../components/Modal";

const { Option } = Select;

const PersonaPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [dataSearch, setDataSearch] = useState("");
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [disblableButton, setDisableButton] = useState(true);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [socket, setSocket] = useState(null);

  const resetValues = () => {
    setTimeout(form.resetFields(), 500);
    setTimeout(form2.resetFields(), 500);
  };

  const onSelectChange = (newSelectedRowKeys, data) => {
    setSelectedRow(data[0]);
    setDisableButton(false);
  };

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:666/websocket/persona");
    setSocket(ws);
    ws.onopen = () => {
      console.log("Connected to WebSocket server", "message");
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            method: "Get",
          })
        );
      } else {
        console.error("La conexión WebSocket no está abierta aún.");
      }
    };

    ws.onmessage = (event) => {
      if (event.data === "error") {
        notification.error({
          message: "Ya existe una persona con esa cédula",
          description: `Error al crear`,
          icon: <SmileOutlined style={{ color: "#F81005" }} />,
        });
        return;
      }
      const datosParse = JSON.parse(event.data);
      setUsers(datosParse.data);
      console.log(datosParse.data);
    };

    return () => {
      console.log("Closing WebSocket connections");
      ws.close();
    };
  }, []);

  const registrarPersona = (inputs) => {
    socket.send(
      JSON.stringify({
        method: "Post",
        cedula: inputs.PER_CEDULA,
        nombres: inputs.PER_NOMBRES,
        apellidos: inputs.PER_APELLIDOS,
        telefono: inputs.PER_TELEFONO,
        correo: inputs.PER_CORREO,
        genero: inputs.PER_GENERO,
      })
    );
    setterModalInsert(false);
  };

  const actualizarPersona = (inputs) => {
    socket.send(
      JSON.stringify({
        method: "Update",
        cedula: inputs.PER_CEDULA,
        nombres: inputs.PER_NOMBRES,
        apellidos: inputs.PER_APELLIDOS,
        telefono: inputs.PER_TELEFONO,
        correo: inputs.PER_CORREO,
        genero: inputs.PER_GENERO,
      })
    );
    setterModalUpdate(false);
  };

  const eliminarPersona = (inputs) => {
    socket.send(
      JSON.stringify({
        method: "Delete",
        cedula: inputs,
      })
    );
    setterModalDelete(false);
  };

  const setterDataSearch = (value) => setDataSearch(value);
  const setterModalInsert = (value) => setModalInsert(value);
  const setterModalUpdate = (value) => setModalUpdate(value);
  const setterModalDelete = (value) => setModalDelete(value);

  // Validación para cédula ecuatoriana
  const validateCedula = (_, value) => {
    return isValidCI(value) ? Promise.resolve() : Promise.reject("La cédula ingresada no es válida");
  };

  return (
    <div>
      <DataTable
        columns={PersonaColumn(dataSearch)}
        rowSelection={rowSelection}
        setterDataSearch={setterDataSearch}
        data={users}
        resetValues={resetValues}
        setterModalInsert={setterModalInsert}
        disblableButton={disblableButton}
        setterModalUpdate={setterModalUpdate}
        setterModalDelete={setterModalDelete}
        SearchLabel={"Buscar..."}
      />

      <ModalOpen
        modalBegin={modalInsert}
        titleModal={"Insertar"}
        resetValues={resetValues}
        isDelete={false}
        footer={null}
        running={setterModalInsert}
        form={
          <Form form={form} onFinish={registrarPersona} layout="vertical">
            <Form.Item
              name="PER_CEDULA"
              label="Cédula"
              rules={[
                { required: true, message: 'Por favor ingrese la cédula' },
                { validator: validateCedula },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="PER_NOMBRES"
              label="Nombres"
              rules={[
                { required: true, message: 'Por favor ingrese los nombres' },
                { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'Solo se permiten letras y tildes' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="PER_APELLIDOS"
              label="Apellidos"
              rules={[
                { required: true, message: 'Por favor ingrese los apellidos' },
                { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'Solo se permiten letras y tildes' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="PER_TELEFONO"
              label="Teléfono"
              rules={[
                { required: true, message: 'Por favor ingrese el teléfono' },
                { pattern: /^\d{10}$/, message: 'El teléfono debe tener 10 dígitos' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="PER_CORREO"
              label="Correo Electrónico"
              rules={[
                { required: true, message: 'Por favor ingrese el correo electrónico' },
                { type: 'email', message: 'Ingrese un correo electrónico válido' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="PER_GENERO"
              label="Género"
              rules={[
                { required: true, message: 'Por favor seleccione el género' },
              ]}
            >
              <Select>
                <Option value="Masculino">Masculino</Option>
                <Option value="Femenino">Femenino</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Registrar</Button>
            </Form.Item>
          </Form>
        }
      />

      <ModalOpen
        modalBegin={modalUpdate}
        titleModal={"Actualizar"}
        resetValues={resetValues}
        running={setterModalUpdate}
        isDelete={false}
        footer={null}
        form={
          <Form
            form={form2}
            onFinish={actualizarPersona}
            layout="vertical"
            initialValues={{
              PER_CEDULA: selectedRow[0],
              PER_NOMBRES: selectedRow[1],
              PER_APELLIDOS: selectedRow[2],
              PER_TELEFONO: selectedRow[3],
              PER_CORREO: selectedRow[4],
              PER_GENERO: selectedRow[5],
            }}
          >
            <Form.Item
              name="PER_CEDULA"
              label="Cédula"
              rules={[
                { required: true, message: 'Por favor ingrese la cédula' },
                { validator: validateCedula },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="PER_NOMBRES"
              label="Nombres"
              rules={[
                { required: true, message: 'Por favor ingrese los nombres' },
                { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'Solo se permiten letras y tildes' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="PER_APELLIDOS"
              label="Apellidos"
              rules={[
                { required: true, message: 'Por favor ingrese los apellidos' },
                { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'Solo se permiten letras y tildes' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="PER_TELEFONO"
              label="Teléfono"
              rules={[
                { required: true, message: 'Por favor ingrese el teléfono' },
                { pattern: /^\d{10}$/, message: 'El teléfono debe tener 10 dígitos' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="PER_CORREO"
              label="Correo Electrónico"
              rules={[
                { required: true, message: 'Por favor ingrese el correo electrónico' },
                { type: 'email', message: 'Ingrese un correo electrónico válido' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="PER_GENERO"
              label="Género"
              rules={[
                { required: true, message: 'Por favor seleccione el género' },
              ]}
            >
              <Select>
                <Option value="Masculino">Masculino</Option>
                <Option value="Femenino">Femenino</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Actualizar</Button>
            </Form.Item>
          </Form>
        }
      />

      <ModalOpen
        modalBegin={modalDelete}
        titleModal={"Eliminar"}
        resetValues={resetValues}
        running={setterModalDelete}
        design={{ danger: true }}
        okDelete={eliminarPersona}
        selectedRow={selectedRow}
        isDelete={true}
        form={
          <p>
            Está a punto de eliminar a
            {` ${selectedRow[1]} `}
            {`${selectedRow[2]} `}
            con cédula: {selectedRow[0]}
          </p>
        }
      />
    </div>
  );
};

export default PersonaPage;

// validateCI.js
export function isValidCI(ci) {
  var isNumeric = true;
  var total = 0,
    individual;

  for (var position = 0; position < 10; position++) {
    individual = ci.toString().substring(position, position + 1);

    if (isNaN(individual)) {
      console.log(ci, position, individual, isNaN(individual));
      isNumeric = false;
      break;
    } else {
      if (position < 9) {
        if (position % 2 == 0) {
          if (parseInt(individual) * 2 > 9) {
            total += 1 + ((parseInt(individual) * 2) % 10);
          } else {
            total += parseInt(individual) * 2;
          }
        } else {
          total += parseInt(individual);
        }
      }
    }
  }

  if (total % 10 != 0) {
    total = (total - (total % 10) + 10) - total;
  } else {
    total = 0;
  }

  if (isNumeric) {
    console.log(ci, total, individual);
    console.log(ci, typeof ci, ci.length);
    if (ci.toString().length != 10) {
      return false;
    }

    if (parseInt(ci, 10) == 0) {
      return false;
    }

    if (total != parseInt(individual)) {
      alert("La cédula ingresada no es válida.");
      return false;
    }

    console.log("cédula válida", ci);
    return true;
  }

  alert("El dato solo puede contener números.");
  return false;
}
