import { sharedOnCell } from "../utils/tableSettings";

const ZonaColumn = (dataSearch) => {
  const columns = [
    {
      title: "ID_ZONA",
      dataIndex: `0`,
      rowScope: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.idAuthor - b.idAuthor,
    },
    {
      title: "Calle Principal",
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
      title: "Calle Secundaria",
      dataIndex: "2",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Punto de Referencia",
      dataIndex: "3",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Parroquia",
      dataIndex: "4",
      key: "lastname",
      onCell: sharedOnCell,
    },
  ];

  return columns;
};

export default ZonaColumn;