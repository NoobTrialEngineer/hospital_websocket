import { sharedOnCell } from "../utils/tableSettings";

const HospitalColumn = (dataSearch) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: `0`,
      rowScope: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.idAuthor - b.idAuthor,
    },
    {
      title: "ID Zona",
      dataIndex: "1",
      key: "name",
      onCell: sharedOnCell,
      filteredValue: [dataSearch],
      onFilter: (value, record) => {
        return (
          String(record[0])
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record[3]).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Telefono",
      dataIndex: "2",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Correo",
      dataIndex: "3",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Sitio Web",
      dataIndex: "4",
      key: "lastname",
      onCell: sharedOnCell,
    },
  ];

  return columns;
};

export default HospitalColumn;