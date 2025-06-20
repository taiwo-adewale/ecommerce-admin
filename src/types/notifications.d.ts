export interface NewOrderNotification {
  id: string;
  type: "new-order";
  imageUrl: string;
  name: string;
  price: number;
  timestamp: string;
  isRead: string;
}

export interface StockOutNotification {
  id: string;
  type: "stock-out";
  imageUrl: string;
  item: string;
  timestamp: string;
  isRead: string;
}

export type Notification = NewOrderNotification | StockOutNotification;
