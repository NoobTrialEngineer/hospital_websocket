import React from "react";
import { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Button } from "antd";
import DataTable from "../components/PersonaPage/table";
import InsertEspecialidadForm from "../components/EspecialidadPage/insertEspecialidadForm";
import EspecialidadColumn from "../data/EspecialidadColumn";
import ModalOpen from "../components/Modal";
import UpdateEspecialidadForm from "../components/EspecialidadPage/updateEspecialidadForm";
import { notification } from "antd";

const EspecialidadPage = () => {
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
    const ws = new WebSocket("ws://localhost:666/websocket/especialidad");
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
        console.log(event.data);
        if(event.data === "error"){
            notification.error({
                message: "Ya existe una zona con ese ID",
                description: `Error al crear`,
                icon: <SmileOutlined style={{ color: "#F81005" }} />,
              });
            return;
        }
      const datosParse = JSON.parse(event.data);
      setUsers(datosParse.data)
      console.log(datosParse.data);
    };

    return () => {
      console.log("Closing WebSocket connections");
      ws.close();
    };

  }, []);

  const registrarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Post",
          nombre: inputs.nombre, 
          descripcion: inputs.descripcion, 
        })
      );
      setterModalInsert(false);
  }

  const actualizarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Update",
          nombre: inputs.nombre, 
          descripcion: inputs.descripcion, 
        })
      );
      setterModalUpdate(false);
  }

  const eliminarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Delete",
          nombre: inputs,
        })
      );
      setterModalDelete(false);
  }

  const setterDataSearch = (value) => setDataSearch(value);
  const setterModalInsert = (value) => setModalInsert(value);
  const setterModalUpdate = (value) => setModalUpdate(value);
  const setterModalDelete = (value) => setModalDelete(value);

  return (
    <div>
      <DataTable
        columns={EspecialidadColumn(dataSearch)}
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
          <InsertEspecialidadForm
            form={form}
            onFinish={registrarZona}//onFinish}
            running={setterModalInsert}
          />
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
          <UpdateEspecialidadForm
            form2={form}
            onFinishUpdate={actualizarZona}
            selectedRow={selectedRow}
            running={setterModalUpdate}
          />
        }
      />

      <ModalOpen
        modalBegin={modalDelete}
        titleModal={"Eliminar"}
        resetValues={resetValues}
        running={setterModalDelete}
        design={{ danger: true }}
        okDelete={eliminarZona}
        selectedRow={selectedRow}
        isDelete={true}
        form={
          <p>
            Esta a punto de eliminar la especialidad
            con Nombre: {selectedRow[0]}{" "}
          </p>
        }
      />
    </div>
  );
};

export default EspecialidadPage;
