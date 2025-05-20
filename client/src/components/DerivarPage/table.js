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
        <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            type="primary"
            style={{ background: "#3C86F1" }}
            icon={<PlusCircleOutlined />}
            onClick={() => {
              resetValues();
              setterModalInsert(true);
            }}
          >
            Derivar
          </Button>
      </Row>
      )}
    />
  );
};

export default DataTable;