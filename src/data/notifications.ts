import { Notification } from "@/types/notifications";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

export const fetchNotifications = async () => {
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  const { data } = await axiosInstance.get("/notifications");
  return data as Notification[];
};

export const deleteNotification = async (id: string) => {
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  await axiosInstance.delete(`/notifications/${id}`);
};
