import { GroceryItem } from "@/types/grocery";
import { differenceInDays } from "date-fns";
import { Package, AlertCircle } from "lucide-react";

interface StatsBarProps {
  items: GroceryItem[];
}

export const StatsBar = ({ items }: StatsBarProps) => {
  const expiringSoonCount = items.filter(
    (item) => {
      const days = differenceInDays(item.expiryDate, new Date());
      return days >= 0 && days <= 3;
    }
  ).length;

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Items</p>
            <p className="text-2xl font-bold text-foreground">{items.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
        <div className="flex items-center gap-3">
          <div className="bg-warning/10 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
            <p className="text-2xl font-bold text-foreground">{expiringSoonCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
