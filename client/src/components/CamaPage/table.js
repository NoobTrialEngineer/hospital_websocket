import React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Row, Col, Table, Input } from "antd";

const DataTable = (props) => {
  const {
    columns,
    rowSelection,
    setterDataSearch,
    data,
    resetValues,
    setterModalInsert,
    disblableButton,
    setterModalUpdate,
    setterModalDelete,
    SearchLabel,
  } = props;

  const { Search } = Input;

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      rowKey={(record) =>
        record[0] ||
        record.idAuthor ||
        record.id_admin ||
        record.id_reg ||
        record.id_pre
      }
      rowSelection={{
        type: "radio",
        ...rowSelection,
      }}
      title={() => (
        <Search
          placeholder={SearchLabel}
          allowClear
          enterButton="Buscar"
          size="large"
          onSearch={(value) => {
            setterDataSearch(value);
          }}
        />
      )}
      footer={() => (
        <Row>
        <Col span={8}></Col>
        <Col span={2}>
          <Button
            type="primary"
            style={{ background: "#3C86F1" }}
            icon={<PlusCircleOutlined />}
            onClick={() => {
              resetValues();
              setterModalInsert(true);
            }}
          >
            Insertar
          </Button>
        </Col>
        <Col span={1}></Col>
        <Col span={2}>
          <Button
            type="primary"
            disabled={disblableButton}
            style={{ background: "#43EA35" }}
            icon={<EditOutlined />}
            onClick={() => {
              resetValues();
              setterModalUpdate(true);
            }}
          >
            Actualizar
          </Button>
        </Col>
        <Col span={1}></Col>
        <Col span={2}>
          <Button
            type="primary"
            disabled={disblableButton}
            style={{ background: "#F14E4E" }}
            icon={<DeleteOutlined />}
            onClick={() => setterModalDelete(true)}
          >
            Desactivar
          </Button>
        </Col>
        <Col span={8}></Col>
      </Row>
      )}
    />
  );
};

export default DataTable;