import axiosInstance from "@/helpers/axiosInstance";
import { Notification } from "@/types/notifications";

export const fetchNotifications = async () => {
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  const { data } = await axiosInstance.get("/notifications");
  return data as Notification[];
};

export const deleteNotification = async (id: string) => {
  await new Promise((resolve, reject) => setTimeout(reject, 500));
  await axiosInstance.delete(`/notifications/${id}`);
};
