import React from "react";
import { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Button } from "antd";
import DataTable from "../components/PersonaPage/table";
import InsertAdministradorForm from "../components/AdministradorPage/insertAdministradorForm";
import AdministradorColumn from "../data/AdministradorColumn";
import ModalOpen from "../components/Modal";
import UpdateAdministradorForm from "../components/AdministradorPage/updateAdministradorForm";
import { notification } from "antd";

const AdministradorPage = () => {
  const [users, setUsers] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [hospitales, setHospitales] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [dataSearch, setDataSearch] = useState("");
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [disblableButton, setDisableButton] = useState(true);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [socket, setSocket] = useState(null);
  const [socket2, setSocket2] = useState(null);
  const [socket3, setSocket3] = useState(null);

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
    const ws = new WebSocket("ws://localhost:666/websocket/administrador");
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
      //console.log(datosParse.data);
    };

    const ws2 = new WebSocket("ws://localhost:666/websocket/persona");
    setSocket2(ws2);
    ws2.onopen = () => {
      console.log("Connected to WebSocket server 2", "message");
      if (ws2.readyState === WebSocket.OPEN) {
        ws2.send(
          JSON.stringify({
            method: "Get",
          })
        );
      } else {
        console.error("La conexión WebSocket no está abierta aún.");
      }
    };

    ws2.onmessage = (event2) => {
      const datosParse2 = JSON.parse(event2.data);
      setPersonas(datosParse2.data)
      console.log(datosParse2.data);
    };

    const ws3 = new WebSocket("ws://localhost:666/websocket/hospital");
    setSocket3(ws3);
    ws3.onopen = () => {
      console.log("Connected to WebSocket server 2", "message");
      if (ws3.readyState === WebSocket.OPEN) {
        ws3.send(
          JSON.stringify({
            method: "Get",
          })
        );
      } else {
        console.error("La conexión WebSocket no está abierta aún.");
      }
    };

    ws3.onmessage = (event2) => {
      const datosParse2 = JSON.parse(event2.data);
      setHospitales(datosParse2.data)
      console.log(datosParse2.data);
    };

    return () => {
      console.log("Closing WebSocket connections");
      ws.close();
      ws2.close();
      ws3.close();
    };


  }, []);

  const registrarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Post",
          PER_CEDULA: inputs.PER_CEDULA,
          ADM_USUARIO: inputs.ADM_USUARIO,
          ADM_CONTRASENA: inputs.ADM_CONTRASENA,
          ADM_CARGO: inputs.ADM_CARGO,
          HOS_NOMBRE: inputs.HOS_NOMBRE,
        })
      );
      setterModalInsert(false);
  }

  const actualizarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Update",
          PER_CEDULA: inputs.PER_CEDULA,
          ADM_USUARIO: inputs.ADM_USUARIO,
          ADM_CONTRASENA: inputs.ADM_CONTRASENA,
          ADM_CARGO: inputs.ADM_CARGO,
          HOS_NOMBRE: inputs.HOS_NOMBRE,
        })
      );
      setterModalUpdate(false);
  }

  const eliminarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Delete",
          PER_CEDULA: inputs,
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
        columns={AdministradorColumn(dataSearch)}
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
          <InsertAdministradorForm
            form={form}
            onFinish={registrarZona}
            running={setterModalInsert}
            data={personas}
            data2={hospitales}
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
          <UpdateAdministradorForm
            form2={form}
            onFinishUpdate={actualizarZona}
            selectedRow={selectedRow}
            running={setterModalUpdate}
            data={personas}
            data2={hospitales}
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
            Esta a punto de eliminar al usuario {selectedRow[1]} {selectedRow[0]}{" "}
          </p>
        }
      />
    </div>
  );
};

export default AdministradorPage;
