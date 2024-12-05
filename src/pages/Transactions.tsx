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
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function TransactionsPage() {
  const [search, setSearch] = useState<string>(""); // Recherche globale
  const [filterType, setFilterType] = useState<string>("all"); // Filtre par type
  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination
  const rowsPerPage = 5; // Nombre de lignes par page

  // Données des transactions
  const transactions = [
    {
      id: "1",
      description: "Salary",
      amount: 5000,
      type: "revenu",
      date: "2024-12-01",
    },
    {
      id: "2",
      description: "Groceries",
      amount: -200,
      type: "dépense",
      date: "2024-12-02",
    },
    {
      id: "3",
      description: "Rent",
      amount: -1500,
      type: "dépense",
      date: "2024-12-03",
    },
    {
      id: "4",
      description: "Freelance Job",
      amount: 1000,
      type: "revenu",
      date: "2024-12-04",
    },
    {
      id: "5",
      description: "Electricity Bill",
      amount: -100,
      type: "dépense",
      date: "2024-12-05",
    },
    {
      id: "6",
      description: "Bonus",
      amount: 700,
      type: "revenu",
      date: "2024-12-06",
    },
  ];

  // Filtrage des transactions
  const filteredTransactions = transactions.filter(
    (transaction) =>
      (transaction.description.toLowerCase().includes(search.toLowerCase()) || // Recherche
        transaction.date.includes(search)) && // Recherche sur la date
      (filterType === "all" || transaction.type === filterType) // Filtre par type
  );

  // Pagination : données de la page actuelle
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTransactions.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  // Nombre total de pages
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  // Fonction pour changer la page
  const changePage = (pageNumber: number) => setCurrentPage(pageNumber);

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
              <SelectItem value="revenu">Revenu</SelectItem>
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Description"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Amount"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="revenu">Revenu</SelectItem>
                      <SelectItem value="dépense">Dépense</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Transaction</Button>
            </DialogFooter>
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
                {transaction.date}
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
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Input
                            id="description"
                            placeholder="Description"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Amount"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="type" className="text-right">
                            Type
                          </Label>
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="revenu">Revenu</SelectItem>
                                <SelectItem value="dépense">Dépense</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date
                          </Label>
                          <Input id="date" type="date" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Transaction</Button>
                      </DialogFooter>
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
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
