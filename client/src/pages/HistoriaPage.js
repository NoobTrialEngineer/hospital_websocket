import React from "react";
import { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Button } from "antd";
import DataTable from "../components/HistoriaPage/table";
import DerivacionColumn from "../data/DerivacionColumn";
import ModalOpen from "../components/Modal";
import UpdateCamaForm from "../components/CamaPage/updateCamaForm";
import { notification } from "antd";
import InsertNuestrosPacientesForm from "../components/NuestrosPacientesPage/insertNuestrosPacientesForm";

const HistoriaPage = () => {
  const [users, setUsers] = useState([]);
  const [zonas, setZonas] = useState([]);
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
    const ws = new WebSocket("ws://localhost:666/websocket/derivacion");
    setSocket(ws);
    ws.onopen = () => {
      console.log("Connected to WebSocket server", "message");
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            method: "Get",
            hosNombre: window.localStorage.getItem("Hospital"),
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
      //const filteredArray = datosParse.data.filter(subArray => subArray.includes(""));
      setUsers(datosParse.data)
    };

    return () => {
      console.log("Closing WebSocket connections");
      ws.close();
    };

  }, []);

  const registrarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "DarAlta",
          devFechaSalida:inputs.devFechaSalida,
          idCama: selectedRow[0], 
          perCedula : selectedRow[1],
          devEstado: selectedRow[2],
          devFechaEntrada: selectedRow[3], 
        })
      );
      notification.success({
        message: "Paciente dado de alta de manera exitosa",
        description: `Notifique la alta`,
        icon: <SmileOutlined style={{ color: "blue" }} />,
      });
      setterModalInsert(false);
      window.location.reload();
  }

  const actualizarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Update",
          idCama: inputs.idCama, 
          espeNombre: inputs.espeNombre,
        })
      );
      setterModalUpdate(false);
  }

  const eliminarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Delete",
          idCama: inputs,
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
        columns={DerivacionColumn(dataSearch)}
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
          <InsertNuestrosPacientesForm
            form={form}
            selectedRow={selectedRow}
            onFinish={registrarZona}
            running={setterModalInsert}
            data={zonas}
          />
        }
      />

     
    </div>
  );
};

export default HistoriaPage;
