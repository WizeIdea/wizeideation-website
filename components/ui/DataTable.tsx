import type { FC, ReactNode } from 'react';

interface Column<T> {
  /** Header label */
  header: string;
  /** Accessor – key of the data object */
  accessor: keyof T;
}

interface DataTableProps<T> {
  /** Column definitions */
  columns: Column<T>[];
  /** Row data */
  data: T[];
  /** Optional ARIA label */
  ariaLabel?: string;
}

/**
 * Forensic‑style data table.
 * - Monospaced font, solid borders in DPM Olive.
 * - Header background = olive50, hover rows = burntOchre/10.
 * - No rounded corners, sharp edges only.
 */
export const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
  ariaLabel = 'Data table',
}: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full border border-dpmOlive font-mono text-sm text-striationCharcoal"
        role="table"
        aria-label={ariaLabel}
      >
        <thead className="bg-olive50">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                scope="col"
                className="px-4 py-2 text-left border-b border-dpmOlive"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-burntOchre/10 transition-colors duration-150"
            >
              {columns.map((col) => (
                <td key={String(col.accessor)} className="px-4 py-2 border-b border-dpmOlive">
                  {String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
