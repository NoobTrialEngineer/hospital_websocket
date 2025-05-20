import { sharedOnCell } from "../utils/tableSettings";

const DerivacionColumn = (dataSearch) => {
  const columns = [
    {
      title: "Codigo Cama",
      dataIndex: `0`,
      rowScope: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.idAuthor - b.idAuthor,
    },
    {
      title: "Cedula Paciente",
      dataIndex: "1",
      key: "name",
      onCell: sharedOnCell,
      filteredValue: [dataSearch],
      onFilter: (value, record) => {
        return (
          String(record[0])
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record[1]).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Estado",
      dataIndex: "2",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Fecha de Ingreso",
      dataIndex: "3",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Fecha de Salida",
      dataIndex: "4",
      key: "lastname",
      onCell: sharedOnCell,
    },
  ];

  return columns;
};

export default DerivacionColumn;