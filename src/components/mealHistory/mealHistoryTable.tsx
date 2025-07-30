"use client";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Meal } from "../../types/meal";
import { mealColumns } from "./mealColumns";

type Props = {
  data: Meal[];
};

export default function MealHistoryTable({ data }: Props) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const toggleExpanded = (row: any) => {
    setExpandedRowId(row.original.id === expandedRowId ? null : row.original.id);
  };

  const table = useReactTable({
    data: data,
    columns: mealColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className="overflow-x-auto border shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--primary-color)]">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler?.()}
                  className="px-4 py-2 text-left cursor-pointer hover:underline"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th></th>
            </tr>            
          ))}
        </thead>
        <tbody>
          {data.length > 0 ? table.getRowModel().rows.map(row => (
            <>
            <tr key={row.id} className="border-t hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                <button id={row.original.name}
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => toggleExpanded(row)}
                >
                  <i className={`fa-solid fa-chevron-${row.original.id === expandedRowId? "up": "down"}`}></i>
                </button>
              </td>
            </tr>
            {row.original.id == expandedRowId && <tr className="border-t bg-gray-200">
              <td colSpan={5}>
                <div>
                  <h1 className="px-4 py-2 text-xl font-bold underline">Ingredients</h1>
                  <p className="px-4 py-2 ">
                    {row.original.ingredients?.length ? row.original.ingredients.join(", ") : "No ingredients listed"}
                  </p>
                  <h1 className="px-4 py-2 text-xl font-bold underline">Instructions</h1>
                  <p className="px-4 py-2">
                    {row.original.instructions || "No instructions provided"}
                  </p>
                  <h1 className="px-4 py-2 text-xl font-bold underline">AI Summary</h1>
                  <p className="px-4 py-2">
                    {row.original.aiSummary || "No AI summary available"}
                  </p>
                </div>
              </td>
            </tr>}
            </>
          ))
        : <tr><td colSpan={5} className="px-4 py-2 text-center">No data available</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
