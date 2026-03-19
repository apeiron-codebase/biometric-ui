//search by filters

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { STATUS_OPTIONS, StatusFilter } from "@/app/dashboard/checkin-checkout/types";

type Props = {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
};

export default function Filters({
  globalFilter,
  onGlobalFilterChange,
  statusFilter,
  onStatusFilterChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div>
        <label className="text-sm font-medium block mb-1">Search</label>
        <Input
          placeholder="Name, code, department..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="w-full sm:w-72"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Status</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-36 justify-between">
              {statusFilter} <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {STATUS_OPTIONS.map((opt) => (
              <DropdownMenuItem key={opt} onClick={() => onStatusFilterChange(opt)}>
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}