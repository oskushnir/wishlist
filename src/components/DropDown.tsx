import type React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import type { SortOptions } from "@/types/sortOptions";

type Props = {
  buttonTitle: string;
  items: SortOptions[];
  setSortOption: (sortOption: string) => void;
}

export const DropDown: React.FC<Props> = ({ buttonTitle, items, setSortOption }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer">{buttonTitle}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {items.map(item => (
          <DropdownMenuItem
            onClick={() => setSortOption(item.name)}
            key={item.id}
            className="cursor-pointer"
          >{item.name}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}