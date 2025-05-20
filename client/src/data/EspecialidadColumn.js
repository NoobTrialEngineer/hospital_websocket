import { sharedOnCell } from "../utils/tableSettings";

const ZonaColumn = (dataSearch) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: `0`,
      rowScope: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.idAuthor - b.idAuthor,
    },
    {
      title: "Descripción de la especialidad",
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
    }
  ];

  return columns;
};

export default ZonaColumn;