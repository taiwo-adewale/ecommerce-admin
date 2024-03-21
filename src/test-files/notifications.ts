import testImg from "@/test-files/assets/notification-img.jpg";
import testImg2 from "@/test-files/assets/notification-img-2.jpg";
import { Notification } from "@/types/notifications";

export const testNotifications: Notification[] = [
  {
    id: "wewejedjdfjk",
    imageUrl: testImg.src,
    item: "Logitech Keyboard",
    timestamp: "Dec 12 2021 - 12:40PM",
    type: "stock-out",
  },
  {
    id: "vddcvjedjdfjsk",
    imageUrl: testImg.src,
    item: "Logitech Keyboard",
    timestamp: "Dec 12 2021 - 12:40PM",
    type: "stock-out",
  },
  {
    id: "jfgfgedjdfjkdsds",
    imageUrl: testImg2.src,
    name: "Charles Lore",
    timestamp: "Dec 12 2021 - 12:40PM",
    type: "new-order",
    price: 300,
  },
  {
    id: "jedfddffbdsge",
    imageUrl: testImg.src,
    item: "Hisense Smart TV",
    timestamp: "Dec 12 2021 - 12:40PM",
    type: "stock-out",
  },
  {
    id: "jnwerewrerwer",
    imageUrl: testImg2.src,
    item: "iPhone XR",
    timestamp: "Dec 12 2021 - 12:40PM",
    type: "stock-out",
  },
  {
    id: "jrrehadfeaeggffg",
    imageUrl: testImg.src,
    name: "Luffy Uzumaki",
    timestamp: "Dec 12 2021 - 12:40PM",
    type: "new-order",
    price: 300,
  },
];
