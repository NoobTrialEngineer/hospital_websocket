import { sharedOnCell } from "../utils/tableSettings";

const AdministradorColumn = (dataSearch) => {
  const columns = [
    {
      title: "Cedula",
      dataIndex: `0`,
      rowScope: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.idAuthor - b.idAuthor,
    },
    {
      title: "Usuario",
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
      title: "Contraseña",
      dataIndex: "2",
      key: "password",
      onCell: sharedOnCell,
      render: (text) => "••••••••" // Reemplaza con asteriscos o cualquier otro carácter que prefieras
    },
    {
      title: "Rol",
      dataIndex: "3",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Hospital",
      dataIndex: "4",
      key: "lastname",
      onCell: sharedOnCell,
    },
  ];

  return columns;
};

export default AdministradorColumn;