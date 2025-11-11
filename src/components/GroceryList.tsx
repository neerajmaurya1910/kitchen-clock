import { GroceryItem as GroceryItemType } from "@/types/grocery";
import { GroceryItem } from "./GroceryItem";

interface GroceryListProps {
  items: GroceryItemType[];
  onDeleteItem: (id: string) => void;
  onMarkAsUsed: (id: string) => void;
}

export const GroceryList = ({ items, onDeleteItem, onMarkAsUsed }: GroceryListProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-xl border border-border">
        <p className="text-muted-foreground text-lg">No items yet. Start adding your groceries!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <GroceryItem
          key={item.id}
          item={item}
          onDelete={() => onDeleteItem(item.id)}
          onMarkAsUsed={() => onMarkAsUsed(item.id)}
        />
      ))}
    </div>
  );
};
