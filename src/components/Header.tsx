import Container from "@/components/ui/container";
import NavMenuToggle from "@/containers/header/NavMenuToggle";
import ThemeToggle from "@/containers/header/ThemeToggle";
import Profile from "@/containers/header/Profile";

export default function Navbar() {
  return (
    <header className="bg-popover py-4 shadow-md">
      <Container>
        <div className="flex justify-between">
          <NavMenuToggle />

          <div className="flex space-x-4">
            <ThemeToggle />
            <Profile />
          </div>
        </div>
      </Container>
    </header>
  );
}
