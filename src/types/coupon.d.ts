export type CouponStatus = "expired" | "active";

export type Coupon = {
  published: boolean;
  _id: string;
  title: string;
  couponCode: string;
  minimumAmount: number;
  image: string;
  discount: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};
