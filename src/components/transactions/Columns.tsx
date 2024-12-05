

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string;
  amount: number;
  type: "depense" | "revenu";
  description: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: "type",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
