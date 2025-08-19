import { Metadata } from "next";

import Container from "@/components/ui/container";
import { NotFound } from "@/components/shared/NotFound";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="w-full min-h-svh flex">
      <main className="w-full flex flex-grow">
        <Container>
          <NotFound />
        </Container>
      </main>
    </div>
  );
}
