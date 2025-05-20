import React from "react";
import { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Button } from "antd";
import DataTable from "../components/PersonaPage/table";
import InsertHospitalForm from "../components/HospitalPage/insertHospitalForm";
import HospitalColumn from "../data/HospitalColumn";
import ModalOpen from "../components/Modal";
import UpdateHospitalForm from "../components/HospitalPage/updateHospitalForm";
import { notification } from "antd";

const HospitalPage = () => {
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
    const ws = new WebSocket("ws://localhost:666/websocket/hospital");
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

    const ws2 = new WebSocket("ws://localhost:666/websocket/zona");
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

    return () => {
      console.log("Closing WebSocket connections");
      ws.close();
      ws2.close();
    };

  }, []);

  const registrarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Post",
          HOS_NOMBRE: inputs.HOS_NOMBRE, 
          ID_ZONA: inputs.ID_ZONA, 
          HOS_TELEFONO: inputs.HOS_TELEFONO, 
          HOS_CORREO: inputs.HOS_CORREO, 
          HOS_SITIO_WEB: inputs.HOS_SITIO_WEB,
        })
      );
      setterModalInsert(false);
  }

  const actualizarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Update",
          HOS_NOMBRE: inputs.HOS_NOMBRE, 
          ID_ZONA: inputs.ID_ZONA, 
          HOS_TELEFONO: inputs.HOS_TELEFONO, 
          HOS_CORREO: inputs.HOS_CORREO, 
          HOS_SITIO_WEB: inputs.HOS_SITIO_WEB,
        })
      );
      setterModalUpdate(false);
  }

  const eliminarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Delete",
          HOS_NOMBRE: inputs,
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
        columns={HospitalColumn(dataSearch)}
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
          <InsertHospitalForm
            form={form}
            onFinish={registrarZona}
            running={setterModalInsert}
            data={zonas}
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
          <UpdateHospitalForm
            form2={form}
            onFinishUpdate={actualizarZona}
            selectedRow={selectedRow}
            running={setterModalUpdate}
            data={zonas}
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
            Esta a punto de eliminar el hospital {selectedRow[0]}{" "}
          </p>
        }
      />
    </div>
  );
};

export default HospitalPage;
