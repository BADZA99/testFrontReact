import { Transaction } from "@/components/transactions/Columns";

export default async function getData(): Promise<Transaction[]> {
  // Fetch data from  API .
  return [
    {
      id: "2",
      amount: 100,
      type: "depense",
      description: "m@example.com",
    },
    // ...
  ];
}

