import { Button } from "@/components/ui/button";

import { Menu } from "lucide-react";

export default function NavMenuToggle() {
  return (
    <Button variant="ghost" size="icon">
      <Menu />
    </Button>
  );
}
