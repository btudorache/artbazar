import { useRef, useState } from "react";

export const useFormPassword = (condition) => {
  const password1Ref = useRef();
  const password2Ref = useRef();
  const [passwordError, setPasswordError] = useState({
    hasError: false,
    error: null,
  });

  const validate = () => {
    const password1 = password1Ref.current.value;
    const password2 = password2Ref.current.value;
    if (password1 !== password2) {
      setPasswordError({ hasError: true, error: "Passwords don't match" });
      return false;
    }

    if (condition(password1) || condition(password2)) {
      setPasswordError({
        hasError: true,
        error: "Password is not strong enough",
      });
      return false;
    }

    setPasswordError({ hasError: false, error: null });
    return true;
  };

  return [password1Ref, password2Ref, validate, passwordError];
};
