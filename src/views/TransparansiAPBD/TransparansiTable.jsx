import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

const TransparansiTable = ({ columnsData, tableData }) => {
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col space-y-3 relative">
      {/* Start Pattern Element */}
      <div className="hidden 2xl:block absolute -top-20 -start-12 -z-[1] w-48 h-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg ">
        <div className="bg-lightPrimary w-48 h-48 rounded-lg"></div>
      </div>

      <div className="hidden 2xl:block absolute -bottom-28 rotate-180 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
        <div className="bg-lightPrimary w-48 h-48 rounded-full"></div>
      </div>
      {/* End Pattern Element */}
      <table className="w-full table-auto text-left">
        {table.getHeaderGroups().map((headerGroup) => (
          <thead key={headerGroup.id}>
            <tr>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="[&:nth-child(8)]:text-center last:text-center bg-lightPrimary p-4"
                >
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal leading-none"
                  >
                    {header.column.columnDef.header}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
        ))}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-4 border-b border-navy-800 max-w-[850px]"
                >
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TransparansiTable.propTypes = {
  columnsData: PropTypes.array,
  tableData: PropTypes.array,
};

export default TransparansiTable;
