import { sharedOnCell } from "../utils/tableSettings";

const ZonaColumn = (dataSearch) => {
  const columns = [
    {
      title: "Cedula",
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
            .includes(value.toLowerCase()) 
        );
      },
    },
    {
      title: "Historial Clinico",
      dataIndex: "2",
      key: "lastname",
      onCell: sharedOnCell,
    }
  ];

  return columns;
};

export default ZonaColumn;