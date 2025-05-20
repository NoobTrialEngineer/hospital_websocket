import React from "react";
import { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Button } from "antd";
import DataTable from "../components/DerivarPage/table";
import InsertDerivarForm from "../components/DerivarPage/insertDerivarForm";
import CamaColumn from "../data/CamaColumn";
import ModalOpen from "../components/Modal";
import UpdateCamaForm from "../components/CamaPage/updateCamaForm";
import { notification } from "antd";

const DerivarPage = () => {
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
    const ws = new WebSocket("ws://localhost:666/websocket/cama");
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
      const filteredArray = datosParse.data.filter(subArray => subArray.includes("Libre"));
      setUsers(filteredArray)
    };

    const ws2 = new WebSocket("ws://localhost:666/websocket/paciente");
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
      setZonas(datosParse2.data)
      console.log(datosParse2.data);
    };

    const ws3 = new WebSocket("ws://localhost:666/websocket/derivacion");
    setSocket(ws3);
    ws3.onopen = () => {
      console.log("Connected to WebSocket server 3", "message");
      if (ws3.readyState === WebSocket.OPEN) {
      } else {
        console.error("La conexión WebSocket no está abierta aún.");
      }
    };

    ws3.onmessage = (event2) => {
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
          idCama: inputs.idCama, 
          perCedula : inputs.perCedula,
          devEstado: inputs.devEstado,
          devFechaEntrada: inputs.devFechaEntrada, 
        })
      );
      notification.success({
        message: "Paciente derivado de manera exitosa",
        description: `Notifique la derivación`,
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
        columns={CamaColumn(dataSearch)}
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
          <InsertDerivarForm
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

export default DerivarPage;
