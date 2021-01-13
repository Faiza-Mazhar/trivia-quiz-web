import React, { useState } from "react";
import SignIn from "../../Containers/SignIn/sign-in";
import SignUp from "../../Containers/SignUp/sign-up";

import "./signin-signup.style.scss";
const SignInAndSignUpPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className="sign-in-page">
      {isSignIn ? (
        <SignIn setIsSignIn={setIsSignIn} />
      ) : (
        <SignUp setIsSignIn={setIsSignIn} />
      )}
    </div>
  );
};

export default SignInAndSignUpPage;
