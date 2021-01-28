import React, { useState } from "react";
import CustomButton from "../../Components/CustomButton/custom-button";
import FormInput from "../../Components/FormInput/form-input";
import { signUpWithEmailAndPassword } from "../../firebase/firebase.utils";

import "./signup.style.scss";

const SignUp = ({ setIsSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password doesn't match, please try again");
      setPassword("");
      setDisplayName("");
      return;
    }

    try {
      signUpWithEmailAndPassword({ email, password, displayName });

      setEmail("");
      setPassword("");
      setDisplayName("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up">
      <div className="title">
        <span> Sign up with your email and password.</span>
      </div>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="display-name"
          type="text"
          handleChange={(event) => setDisplayName(event.target.value)}
          value={displayName}
          label="Name"
          required
        />
        <FormInput
          name="email"
          type="email"
          handleChange={(event) => setEmail(event.target.value)}
          value={email}
          label="Email"
          required
        />

        <FormInput
          name="password"
          type="password"
          handleChange={(event) => setPassword(event.target.value)}
          value={password}
          label="Password"
          required
          autoComplete="on"
        />

        <FormInput
          name="confirm-password"
          type="password"
          handleChange={(event) => setConfirmPassword(event.target.value)}
          value={confirmPassword}
          label="Confirm Password"
          required
          autoComplete="on"
        />
        <div className="buttons">
          <CustomButton type="submit">SIGN UP</CustomButton>
          <label className="new-user-label" onClick={() => setIsSignIn(true)}>
            Already have an account?
          </label>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
