import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  //   SelectGroup,
  SelectItem,
  //   SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
// import { Select } from "./ui/select";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
// axios
import axios from "axios";


type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: string;
  date: string;
};

type UpdateTransactionFormProps = {
  transaction: Transaction;
};

export default function UpdateTransactionForm({
    transaction,
}: UpdateTransactionFormProps) {
  const [date, setDate] = React.useState<Date>();
  const formSchema = z.object({
    Description: z.string().min(2).max(50),
    Amount: z.preprocess(
      (value) => Number(value),
      z.number().min(1).max(1000000000000)
    ),
    Type: z.enum(["dépense", "revenue"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Description: transaction.description,
      Amount: transaction.amount,
      Type: transaction.type,
    },
  });

  //fonction qui formate la date en format YYYY-MM-DD
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // try catch avec axios
    try {
      const response = await axios.put(`http://localhost:8080/transactions/${transaction.id}`, {
        description: values.Description,
        amount: values.Amount,
        type: values.Type,
        date: formatDate(date),
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Transaction updated successfully");
        form.reset();
      } else {
        toast.error("Transaction not updated");
      }
      // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding transaction:", error);
    }

  
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
                Please enter a description for the transaction.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="amount" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dépense">Dépense</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel className="mb-3">Date</FormLabel> <br />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>{" "}
        <br />
        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
}
