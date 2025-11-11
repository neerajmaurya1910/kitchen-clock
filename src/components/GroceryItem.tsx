import { GroceryItem as GroceryItemType } from "@/types/grocery";
import { Button } from "@/components/ui/button";
import { Trash2, Check } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";

interface GroceryItemProps {
  item: GroceryItemType;
  onDelete: () => void;
  onMarkAsUsed: () => void;
}

export const GroceryItem = ({ item, onDelete, onMarkAsUsed }: GroceryItemProps) => {
  const daysRemaining = differenceInDays(item.expiryDate, new Date());
  
  const getStatus = () => {
    if (daysRemaining < 0) return { label: "Expired", color: "expired" };
    if (daysRemaining <= 3) return { label: "Expiring Soon", color: "warning" };
    return { label: "Fresh", color: "fresh" };
  };

  const status = getStatus();

  const statusColors = {
    fresh: "bg-fresh-bg text-fresh border-fresh/20",
    warning: "bg-warning-bg text-warning border-warning/20",
    expired: "bg-expired-bg text-expired border-expired/20",
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-border hover:shadow-md transition-shadow animate-slide-up">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate">{item.name}</h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <span>Qty: {item.quantity}</span>
            <span>•</span>
            <span>Expires: {format(item.expiryDate, "MMM dd, yyyy")}</span>
            {daysRemaining >= 0 && (
              <>
                <span>•</span>
                <span>{daysRemaining} days left</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap",
              statusColors[status.color]
            )}
          >
            {status.label}
          </span>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAsUsed}
              className="h-9"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="h-9 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
