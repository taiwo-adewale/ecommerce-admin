import { Order } from "@/types/order";
import { faker } from "@faker-js/faker";

const range = (len: number) => {
  const arr: number[] = [];
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
  return new Array(100).fill(0).map(() => newOrder());
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Order[] => {
    const len = lens[depth]!;
    return range(len).map((_d): Order => {
      return {
        ...newOrder(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(10000);

export async function fetchData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  };
}
