import { describe, expect, test } from "vitest";
// import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Root } from "../routes/root";
// import Login from "../routes/Login";

describe("Login test", () => {
  test("verifyng corrent render", () => {
    render(<Root />);

    const titleCorrectRender = screen.getByRole("heading", {
      name: /sistema de carga de datos/i,
    });
    expect(titleCorrectRender).toHaveTextContent("Sistema de Carga de Datos");
    expect(titleCorrectRender).toBeInTheDocument();
  });
});
