import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartConfig } from "@/components/ui/chart";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: string;
  date: string; 
};

const chartConfig = {
  Depenses: {
    label: "Depense",
    color: "#e93407",
  },
  Revenues: {
    label: "Revenue",
    color: "#0acc62",
  },
} satisfies ChartConfig;

export default function ChartPage() {
  const { data } = useSWR(`http://localhost:8080/transactions`, fetcher);

  const dataCharts = Object.values(data || {}).map(
    (transaction: Transaction) => ({
      date: new Date(transaction.date).toISOString().split("T")[0], // Convert to Date object and format to YYYY-MM-DD
      amount: transaction.amount,
      type: transaction.type,
    })
  );

  return (
    <ResponsiveContainer width="80%" height={400} className="mt-10 mx-auto">
      <BarChart data={dataCharts}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend
          payload={[
            {
              value: chartConfig.Depenses.label,
              type: "square",
              color: chartConfig.Depenses.color,
            },
            {
              value: chartConfig.Revenues.label,
              type: "square",
              color: chartConfig.Revenues.color,
            },
          ]}
        />
        <Bar dataKey="amount" name="Amount">
          {dataCharts.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.type === "dépense"
                  ? chartConfig.Depenses.color
                  : chartConfig.Revenues.color
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
