import React from "react";
import { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Button } from "antd";
import DataTable from "../components/PersonaPage/table";
import InsertZonaForm from "../components/ZonaPage/insertZonaForm";
import ZonaColumn from "../data/ZonaColumn";
import ModalOpen from "../components/Modal";
import UpdateZonaForm from "../components/ZonaPage/updateZonaForm";
import { notification } from "antd";

const ZonaPage = () => {
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
    const ws = new WebSocket("ws://localhost:666/websocket/zona");
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
      return () => {
        console.log("Closing WebSocket connections");
        ws.close();
      };
    };

  }, []);

  const registrarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Post",
          ID_ZONA: inputs.ID_ZONA, 
          ZONA_CALLE_PRINCIPAL: inputs.ZONA_CALLE_PRINCIPAL, 
          ZONA_CALLE_SECUNDARIA: inputs.ZONA_CALLE_SECUNDARIA, 
          ZONA_REFERENCIA: inputs.ZONA_REFERENCIA, 
          ZONA_PARROQUIA: inputs.ZONA_PARROQUIA,
        })
      );
      setterModalInsert(false);
  }

  const actualizarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Update",
          ID_ZONA: inputs.ID_ZONA, 
          ZONA_CALLE_PRINCIPAL: inputs.ZONA_CALLE_PRINCIPAL, 
          ZONA_CALLE_SECUNDARIA: inputs.ZONA_CALLE_SECUNDARIA, 
          ZONA_REFERENCIA: inputs.ZONA_REFERENCIA, 
          ZONA_PARROQUIA: inputs.ZONA_PARROQUIA,
        })
      );
      setterModalUpdate(false);
  }

  const eliminarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Delete",
          ID_ZONA: inputs,
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
        columns={ZonaColumn(dataSearch)}
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
          <InsertZonaForm
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
          <UpdateZonaForm
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
            Esta a punto de eliminar a 
            {` ${selectedRow[1]} y`}
            {`${selectedRow[2]} `}
            con ID: {selectedRow[0]}{" "}
          </p>
        }
      />
    </div>
  );
};

export default ZonaPage;
