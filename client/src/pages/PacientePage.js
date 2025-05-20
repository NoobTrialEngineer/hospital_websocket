import React from "react";
import { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Form, Button } from "antd";
import DataTable from "../components/PersonaPage/table";
import InsertPacienteForm from "../components/PacientePage/insertPacienteForm";
import PacienteColumn from "../data/PacienteColumn";
import ModalOpen from "../components/Modal";
import UpdatePacienteForm from "../components/PacientePage/updatePacienteForm";
import { notification } from "antd";

const PacientePage = () => {
  const [users, setUsers] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [personas, setPersonas] = useState([]);
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
    const ws = new WebSocket("ws://localhost:666/websocket/paciente");
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
    }

      const ws2 = new WebSocket("ws://localhost:666/websocket/persona");
      ws2.onopen = () => {
        console.log("Connected to WebSocket server", "message");
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
          console.log(event2.data);
        const datosParse2 = JSON.parse(event2.data);
        setPersonas(datosParse2.data)
        console.log(datosParse2.data);
      }

        const ws3 = new WebSocket("ws://localhost:666/websocket/zona");
        ws3.onopen = () => {
          console.log("Connected to WebSocket server", "message");
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
    
        ws3.onmessage = (event3) => {
            console.log(event3.data);
          const datosParse3 = JSON.parse(event3.data);
          setZonas(datosParse3.data)
          console.log(datosParse3.data);
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
          cedula: inputs.cedula, 
          idZona: inputs.idZona, 
          historial: inputs.historial, 
        })
      );
      setterModalInsert(false);
  }

  const actualizarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Update",
          cedula: inputs.cedula, 
          idZona: inputs.idZona, 
          historial: inputs.historial, 
        })
      );
      setterModalUpdate(false);
  }

  const eliminarZona = (inputs) => {
    socket.send(
        JSON.stringify({
          method: "Delete",
          cedula: inputs,
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
        columns={PacienteColumn(dataSearch)}
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
          <InsertPacienteForm
            form={form}
            onFinish={registrarZona}//onFinish}
            running={setterModalInsert}
            data={personas}
            data2={zonas}
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
          <UpdatePacienteForm
            form2={form}
            onFinishUpdate={actualizarZona}
            selectedRow={selectedRow}
            running={setterModalUpdate}
            data={personas}
            data2={zonas}
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

export default PacientePage;
