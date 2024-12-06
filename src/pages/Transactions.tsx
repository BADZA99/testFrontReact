import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import AddTransactionForm from "@/components/AddTransactionForm";
import UpdateTransactionForm from "@/components/UpdateTransactionForm";
import axios from "axios";
import { toast } from "react-toastify";


interface Transaction  {
  id: string;
  description: string;
  amount: number;
  type: TypeEnum;
  date: Date;
};

enum TypeEnum {
  dépense = "dépense",
  revenue = "revenue",
}



export default function TransactionsPage() {
  const [search, setSearch] = useState<string>(""); // Recherche globale
  const [filterType, setFilterType] = useState<string>("all"); // Filtre par type
  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination
  const rowsPerPage = 5; // Nombre de lignes par page

  // Données des transactions
  const { data } = useSWR(`http://localhost:8080/transactions`, fetcher);



  // Filtrage des transactions
  const filteredTransactions = Object.values(data || {}).filter(
    (transaction: Transaction) =>
      (transaction?.description?.toLowerCase().includes(search?.toLowerCase()) ) &&
      (filterType === "all" || transaction.type === filterType)
  );

  // Pagination : données de la page actuelle
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTransactions?.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  // Nombre total de pages
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  // Fonction pour changer la page
  const changePage = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calcul du solde total
  const totalRevenues = Object.values(data || {})
    .filter((transaction) => transaction.type === "revenue")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = Object.values(data || {})
    .filter((transaction) => transaction.type === "dépense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalBalance = totalRevenues - totalExpenses;

  // fonction qui supprime une transaction
   async function deleteTransaction(transaction: Transaction) {
     try {
       const response = await axios.delete(
         `http://localhost:8080/transactions/${transaction.id}`
       );
       console.log(response);
       if (response.status === 204) {
         toast.success("Transaction deleted successfully");
       } else {
         toast.error("Transaction not deleted");
       }
     } catch (error) {
       console.error("Error deleting transaction:", error);
       toast.error("Error deleting transaction");
     }
   }

 


 

  return (
    <div className="container mx-auto px-4 py-8 mt-5">
      <h2 className="text-2xl font-bold mb-4">Transactions Table</h2>

      {/* Barre de recherche */}
      <Input
        type="text"
        placeholder="Rechercher par description ou date..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* Filtre par type */}
      <div className="mb-2">
        <label className="mr-2">Filtrer par type :</label>
        <Select
          value={filterType}
          onValueChange={(value) => setFilterType(value)}
        >
          <SelectTrigger className="w-[180px] mt-2">
            <SelectValue placeholder="Tous" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="revenue">Revenu</SelectItem>
              <SelectItem value="dépense">Dépense</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* bouton ajouter transaction */}

      <div className="mb-4 mx-auto  flex justify-end items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="bg-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new transaction.
              </DialogDescription>
            </DialogHeader>
            <AddTransactionForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tableau */}
      <table
        className="table-auto w-full border 
         
      "
      >
        <thead>
          <tr>
            <th className="px-3 py-2 border ">ID</th>
            <th className="px-3 py-2 border">Description</th>
            <th className="px-3 py-2 border">Montant</th>
            <th className="px-3 py-2 border">Type</th>
            <th className="px-3 py-2 border">Date</th>
            <th className="px-3 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-3 py-2 border text-center">{transaction.id}</td>
              <td className="px-3 py-2 border text-center">
                {transaction.description}
              </td>
              <td
                className={`px-3 py-2 border text-center ${
                  transaction.type === "dépense"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {transaction.amount} €
              </td>
              <td className="px-3 py-2 border text-center">
                {transaction.type}
              </td>
              <td className="px-3 py-2 border text-center">
                {new Date(transaction.date).toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              {/* actions */}
              <td className="px-2 py-2 border ">
                {/* edit et delete */}
                <div className="flex justify-center items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="mr-2 bg-blue-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>edit Transaction</DialogTitle>
                        <DialogDescription>
                          Fill in the details below to add a new transaction.
                        </DialogDescription>
                      </DialogHeader>
                      <UpdateTransactionForm transaction={transaction} />
                    </DialogContent>
                  </Dialog>
                  {/* delete */}
                  <Dialog>
                    <DialogTrigger>
                      {" "}
                      <Button
                        variant="outline"
                        size="icon"
                        className="mr-2 bg-red-600"
                        
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 6h18M9 6v12m6-12v12M4 6l1 14a2 2 0 002 2h10a2 2 0 002-2l1-14"
                          />
                        </svg>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                          
                          <Button variant="outline" size="lg" className="mr-2 bg-red-600"
                            onClick={() => deleteTransaction(transaction)}
                          >
                            confirm
                          </Button>
                      </DialogHeader>
                    </DialogContent>
                   
                  </Dialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Affichage du solde total */}
      <div className="mt-4 text-right">
        <div className="mt-4 text-right">
          <h3
            className={`text-xl font-bold ${
              totalBalance < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            Solde Total: {totalBalance} €
          </h3>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => changePage(index + 1)}
            className={`px-4 py-2 mx-1 border ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
