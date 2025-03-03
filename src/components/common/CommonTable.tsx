import { Table } from "@chakra-ui/react";
import styled from "@emotion/styled";

interface Column<T> {
  key: keyof T | string;
  header: string;
  textAlign?: string | "start" | "center" | "end";
  renderCell?: (item: T) => React.ReactNode;
}

interface CommonTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

const StyledTable = styled(Table.Root)`
  background-color: "white";
  color: black;

  thead,
  tbody,
  tr {
    background-color: white;
    color: gray;
  }

  th,
  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
`;

const CommonTable = <T,>({
  columns,
  data,
  onRowClick,
}: CommonTableProps<T>) => {
  return (
    <StyledTable size="lg" interactive unstyled={true}>
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeader
              key={col.key as string}
              textAlign={col.textAlign || "start"}
            >
              {col.header}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item, index) => (
          <Table.Row key={index} onClick={() => onRowClick?.(item)}>
            {columns.map((col) => (
              <Table.Cell
                key={col.key as string}
                textAlign={col.textAlign || "start"}
              >
                {col.renderCell
                  ? col.renderCell(item)
                  : (item as unknown)[col.key]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </StyledTable>
  );
};

export default CommonTable;
