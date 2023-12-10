import { Order } from "@/types/order";
import { faker } from "@faker-js/faker";

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newOrder = (): Order => {
  return {
    invoiceNo: faker.number
      .int({
        min: 10000,
        max: 20000,
      })
      .toString(),
    orderTime: faker.date.recent(),
    customerName: faker.person.fullName(),
    method: faker.helpers.shuffle<Order["method"]>([
      "cash",
      "card",
      "credit",
    ])[0]!,
    amount: faker.number
      .float({
        min: 200,
        max: 10000,
        precision: 0.01,
      })
      .toString(),
    status: faker.helpers.shuffle<Order["status"]>([
      "Pending",
      "Processing",
      "Delivered",
      "Cancel",
    ])[0]!,
  };
};

export function fetchOrders(...lens: number[]) {
  return new Array(50).fill(0).map(() => newOrder());
}
