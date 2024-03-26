// Interface for new-order notifications
export interface NewOrderNotification {
  id: string;
  type: "new-order";
  imageUrl: string;
  name: string;
  price: number;
  timestamp: string;
  isRead: string;
}

// Interface for stock-out notifications
export interface StockOutNotification {
  id: string;
  type: "stock-out";
  imageUrl: string;
  item: string;
  timestamp: string;
  isRead: string;
}

// Notifications can either be of type "new-order" or "stock-out"
export type Notification = NewOrderNotification | StockOutNotification;
