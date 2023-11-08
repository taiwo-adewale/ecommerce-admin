import Container from "@/components/ui/container";
import NavMenuToggle from "@/containers/header/NavMenuToggle";
import ThemeToggle from "@/containers/header/ThemeToggle";
import Notifications from "@/containers/header/Notifications";
import Profile from "@/containers/header/Profile";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-popover py-4 shadow-md">
      <Container>
        <div className="flex justify-between">
          <NavMenuToggle />

          <div className="flex items-center gap-x-2">
            <ThemeToggle />
            <Notifications />
            <Profile />
          </div>
        </div>
      </Container>
    </header>
  );
}
