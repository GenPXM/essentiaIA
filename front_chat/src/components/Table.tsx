import type { ReactNode } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TableProps<T extends Record<string, ReactNode>> {
  columns: (keyof T)[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const Table = <T extends Record<string, ReactNode>>({
  columns,
  data,
  onEdit,
  onDelete,
}: TableProps<T>) => (
  <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100 border-b">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col)}
              className="py-3 px-4 text-left font-semibold text-gray-700"
            >
              {capitalize(String(col))}
            </th>
          ))}
          {(onEdit || onDelete) && (
            <th className="py-3 px-4 text-center font-semibold text-gray-700">
              Ações
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition-colors border-b"
            >
              {columns.map((col) => (
                <td key={String(col)} className="py-3 px-4 text-gray-700">
                  {row[col]}
                </td>
              ))}

              {(onEdit || onDelete) && (
                <td className="py-3 px-4 text-center flex gap-3 justify-center">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="text-center py-4 text-gray-500"
            >
              Nenhum dado encontrado
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default Table;
