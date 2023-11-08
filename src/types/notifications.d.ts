// Interface for new-order notifications
export interface NewOrderNotification {
  id: string;
  type: "new-order";
  imageUrl: string;
  name: string;
  timestamp: string;
  price: number;
}

// Interface for stock-out notifications
export interface StockOutNotification {
  id: string;
  type: "stock-out";
  imageUrl: string;
  item: string;
  timestamp: string;
}

// Notifications can either be of type "new-order" or "stock-out"
export type Notification = NewOrderNotification | StockOutNotification;
