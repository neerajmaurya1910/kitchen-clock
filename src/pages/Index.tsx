import { useState, useEffect } from "react";
import { GroceryItem } from "@/types/grocery";
import { GroceryForm } from "@/components/GroceryForm";
import { GroceryList } from "@/components/GroceryList";
import { StatsBar } from "@/components/StatsBar";
import { ShoppingBasket } from "lucide-react";
import { toast } from "sonner";
import { differenceInDays } from "date-fns";

const STORAGE_KEY = "grocery-items";

const Index = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);

  // Load items from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const itemsWithDates = parsed.map((item: any) => ({
        ...item,
        expiryDate: new Date(item.expiryDate),
      }));
      setItems(itemsWithDates);
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [items]);

  // Check for expiring items and show alerts
  useEffect(() => {
    items.forEach((item) => {
      const daysRemaining = differenceInDays(item.expiryDate, new Date());
      if (daysRemaining === 3) {
        toast.warning(`${item.name} will expire in 3 days!`, {
          description: "Consider using it soon to avoid waste.",
        });
      } else if (daysRemaining === 0) {
        toast.error(`${item.name} expires today!`, {
          description: "Use it immediately or it will go bad.",
        });
      }
    });
  }, [items]);

  const handleAddItem = (newItem: Omit<GroceryItem, "id">) => {
    const item: GroceryItem = {
      ...newItem,
      id: crypto.randomUUID(),
    };
    setItems((prev) => [item, ...prev]);
    toast.success("Item added!", {
      description: `${newItem.name} has been added to your tracker.`,
    });
  };

  const handleDeleteItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed", {
      description: `${item?.name} has been removed from your tracker.`,
    });
  };

  const handleMarkAsUsed = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item marked as used!", {
      description: `${item?.name} has been marked as consumed. Great job reducing waste!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <ShoppingBasket className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Smart Grocery Expiry Tracker</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <StatsBar items={items} />
        
        <div className="mb-8">
          <GroceryForm onAddItem={handleAddItem} />
        </div>

        <GroceryList
          items={items}
          onDeleteItem={handleDeleteItem}
          onMarkAsUsed={handleMarkAsUsed}
        />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-muted-foreground">
            © 2025 Smart Grocery Expiry Tracker | Built to reduce food waste
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
