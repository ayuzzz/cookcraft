import { createColumnHelper } from "@tanstack/react-table";
import { Meal } from "@/types/meal";

const columnHelper = createColumnHelper<Meal>();

export const mealColumns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: info => new Date(info.getValue()).toISOString().slice(0, 10)
  }),
  columnHelper.accessor("name", {
    header: "Meal",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("tags", {
    header: "Tags",
    cell: info => {
        const tags = info.getValue();
        return tags.length > 0 ? tags.join(", ") : "No tags";
    },
  }),
];
