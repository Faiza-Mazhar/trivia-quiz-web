import { useState } from "react";
import CustomButton from "../../Components/CustomButton/custom-button";
import FormInput from "../../Components/FormInput/form-input";
import GoogleLogo from "../../assets/googleLogo.png";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import "./sign-in.style.scss";
const SignIn = ({ setIsSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      console.log({ user });
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in">
      <div className="title">
        <span> Sign in with your email and password.</span>
      </div>

      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <CustomButton type="submit">SIGN IN</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn type="button">
            <img src={GoogleLogo} alt="google-logo" width="30" height="30" />
            SIGN IN WITH GOOGLE
          </CustomButton>

          <label className="new-user-label" onClick={() => setIsSignIn(false)}>
            New User?
          </label>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
