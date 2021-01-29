import SignInAndSignUpPage from "../../pages/signin-signup/signin-signup";

import { render, waitFor, screen, fireEvent } from "@testing-library/react";

test("On loading sign in page, SignIn component is rendered", () => {
  render(<SignInAndSignUpPage />);

  expect(
    screen.getByText("Sign in with your email and password.")
  ).toBeInTheDocument();
});

test("If user press New User label, the SignOut component is rendered", async () => {
  const { getByText } = render(<SignInAndSignUpPage />);
  await waitFor(() => getByText("New User?"));
  fireEvent.click(getByText("New User?"));
  expect(
    screen.getByText("Sign up with your email and password.")
  ).toBeInTheDocument();
});

test("If user press - Already have an account- label, the SignIn component is rendered", async () => {
  const { getByText } = render(<SignInAndSignUpPage />);

  await waitFor(() => getByText("New User?"));
  fireEvent.click(getByText("New User?"));

  await waitFor(() => getByText("Already have an account?"));
  fireEvent.click(getByText("Already have an account?"));

  expect(
    screen.getByText("Sign in with your email and password.")
  ).toBeInTheDocument();
});
