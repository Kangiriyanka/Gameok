
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useNavigate} from "react-router-dom"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fetchWithCSRF } from "@/assets/scripts/csrf"

 

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Game = {
    id: number;
    series: string;
    year: string;
    title: string;
    cover: string;

}
 
export const columns: ColumnDef<Game>[] = [

   
  {
    accessorKey: "title",
    // header: () => <div className="text-base text-[var(--base-n64-clr)]">Title</div>,
     header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
 
  },
  {
    accessorKey: "year",
      header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "series",
        header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Series
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
   {
    id: "actions",
    cell: ({ row }) => {
    const game = row.original
     
      const navigate = useNavigate()

      async function deleteGame(id: number)  {

        try { 

      if (window.confirm("Are you sure you want to delete this game?")) {
        const response = await fetchWithCSRF(`/api/game/delete/${id}/`, {
          method: "DELETE"
        });

        if (!response.ok) {
        console.error("HTTP error status:", response.status);
        return;

        
      }

      


        }

      } catch (error) {
      console.error("Fetch error:", error);
      }
 




        
      }

      return (
        <DropdownMenu >
          <DropdownMenuTrigger className="bg-[var(--base-clr)] " asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 bg-[var(--base-btn-clr)]">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent  className=" border-white  " align="end">
            <DropdownMenuLabel className="font-semibold">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
            onClick= {() => navigate(`/dashboard/games/${game.id}/${game.title}`)}>Memories
            </DropdownMenuItem>
            <DropdownMenuItem 
            onClick = {() => deleteGame(game.id)}
            className="text-[#ff0000]"
            >
              
            Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]