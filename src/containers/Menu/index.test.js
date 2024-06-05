import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#contact");
    });
  });
  it("When click on Nos services button", () => {
  const home  = <Menu />;
  const { getByText } = render(home );
  
  expect(getByText("Nos services")).toHaveAttribute(
    "href",
    "#nos-services"
  );
  });

  it("When click on Nos réalisations button", () => {
    const home  = <Menu />;
    const { getByText } = render(home );
    
    expect(getByText("Nos réalisations")).toHaveAttribute(
      "href",
      "#nos-realisations"
    );
    });

    it("When click on Notre équipe button", () => {
      const home  = <Menu />;
      const { getByText } = render(home );
      
      expect(getByText("Notre équipe")).toHaveAttribute(
        "href",
        "#notre-equipe"
      );
      });

});