import React from 'react';
import styles from './DataTable.module.css';
import Pagination from './Pagination';

type DataTableProps = {
  columns: {
    key: string;
    label: string;
    filterElement?: React.ReactNode;
    formatData?: (data:string) => string;
  }[];
  data: Record<string, unknown>[];
  paginationProps?: {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
}

const DataTable = ({
  columns,
  data,
  paginationProps,
}: DataTableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key as string}>
              {column.label}

              {
                column.filterElement && (
                  <div className={styles.filter}>
                    {column.filterElement}
                  </div>
                )
              }
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key as string}>
                {
                  column.formatData
                    ? column.formatData(String(row[column.key]))
                    : String(row[column.key])
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {
        paginationProps?.totalPages && (
          <tfoot>
            <tr>
              <td colSpan={columns.length}>
                <Pagination {...paginationProps} />
              </td>
            </tr>
          </tfoot>
        )
      }
    </table>
  );
};

export default DataTable;
