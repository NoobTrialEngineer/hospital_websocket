import { sharedOnCell } from "../utils/tableSettings";

const PersonaColumn = (dataSearch) => {
  const columns = [
    {
      title: "Cedula",
      dataIndex: `0`,
      rowScope: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.idAuthor - b.idAuthor,
    },
    {
      title: "Nombres",
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
      title: "Apellidos",
      dataIndex: "2",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Telefono",
      dataIndex: "3",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Correo",
      dataIndex: "4",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Genero",
      dataIndex: "5",
      key: "lastname",
      onCell: sharedOnCell,
    },
  ];

  return columns;
};

export default PersonaColumn;