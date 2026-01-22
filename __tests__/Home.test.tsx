import { screen } from "@testing-library/react";
import { renderWithProviders } from "./utils/test-utils";
import Login from "@/app/(authentication)/login/page";

describe("Login Page", () => {
  it("should render Login text", () => {
    renderWithProviders(<Login />);

    const heading = screen.getByRole("heading", {
      name: /login/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
