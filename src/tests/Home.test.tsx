import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { store } from "../features/store";
import "@testing-library/jest-dom";
import ParkVehicleMUI from "../components/ParkVehicleMUI";
import userEvent from "@testing-library/user-event";

test("initial render user should be welcomed (no ticket)", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ParkVehicleMUI />
      </Provider>
    </BrowserRouter>
  );
  const welcomeText = screen.getByText(/Welcome to the Mall Parking Lot/i);
  expect(welcomeText).toBeInTheDocument();
});

test("Entering Lot should issue a ticket and redirect", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const enterLogBtn = screen.getByRole("button", { name: /enter lot/i });
  userEvent.click(enterLogBtn);
  const userTicket = screen.getByText(/parking lot ticket/i);
  expect(userTicket).toBeInTheDocument();
});

test("User should not be able to exit without paying", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const homeButton = screen.getByRole("button", { name: /home/i });
  userEvent.click(homeButton);
  const exitLotBtn = screen.getByText(/exit lot/i);
  userEvent.click(exitLotBtn);
  const snackBar = screen.getByRole("alert");
  expect(snackBar.textContent).toBe("You have not paid.");
});

test("Payment button should be disabled after paying", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const paymentMenuBtn = screen.getByText(/payment/i);
  userEvent.click(paymentMenuBtn);
  const payBtn = screen.getByText("Pay Balance");
  userEvent.click(payBtn);
  expect(payBtn).toBeDisabled();
});

test("User can exit after paying", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const homeButton = screen.getByRole("button", { name: /home/i });
  userEvent.click(homeButton);
  const exitLotBtn = screen.getByText(/exit lot/i);
  userEvent.click(exitLotBtn);
  const snackBar = screen.getByRole("alert");
  expect(snackBar.textContent).toBe("Thank you for visiting!");
});
