import {
  Button,
  ErrorMessage,
  Flex,
  FlexItem,
  FormControlProvider,
  Input,
  Label,
  TextLink,
  Toast,
} from "@pluralsight/react";
import useStore from "container/hooks/useStore";
import React, { useEffect, useMemo, useState } from "react";

import useFetch from "container/hooks/useFetch";
import { BASEURL, MfeBasePrefix } from "container/shared/constants";
import { useNavigate } from "react-router-dom";

type UserResponse = {
  id: string;
  userName: string;
  accessToken: string;
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const { setToken } = useStore();

  const itemStyles = {
    paddingTop: "30px",
  };

  const [body, setBody] = useState({
    username: "",
    password: "",
  });

  const {
    data,
    error,
    loading,
    fetchData: startLogin,
  } = useFetch<UserResponse>("POST", `${BASEURL}auth/signIn`, body);

  useEffect(() => {
    if (data) {
      setToken(data);
      localStorage.setItem("username", formState.username.value);
      navigate(`/${MfeBasePrefix.dashboard}`);
    }
  }, [data, navigate, setToken]);

  const [formState, setFormState] = useState({
    username: {
      disabled: false,
      invalid: false,
      required: true,
      value: "",
    },
    password: {
      disabled: false,
      invalid: false,
      required: true,
      value: "",
    },
  });

  const disableSubmit: boolean = useMemo(() => {
    const isInvalid = Object.values(formState).some(
      (control) => control.required && !control.value
    );
    return isInvalid;
  }, [formState]);

  const controlChange = (controlName: string, value: string) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [controlName]: {
          ...prevState.username,
          invalid: !value ? true : false,
          value,
        },
      };
    });
    setBody((prevValues) => ({ ...prevValues, [controlName]: value }));
  };

  const submitLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    startLogin();
  };

  function handleLinkClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ): void {
    event.preventDefault();
    navigate(`/${MfeBasePrefix.auth}/${path}`);
  }

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      const timer = setTimeout(() => {
        handleToastClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleToastClose = () => {
    setToastMessage("");
  };

  return (
    <>
      <div>
        {toastMessage && (
          <Toast sentiment="danger" onClose={handleToastClose}>
            {toastMessage}
          </Toast>
        )}
      </div>
      <Flex align="center" justify="center" direction="column">
        <form>
          <Flex align="center" justify="center" direction="column">
            <h2>Login</h2>
          </Flex>
          <FlexItem grow="1" style={itemStyles}>
            <FormControlProvider {...formState.username}>
              <Label htmlFor="username">Username</Label>
              <Input
                describedBy="username:error"
                placeholder="Type Username"
                id="username"
                name="username"
                type="text"
                value={formState.username.value}
                onChange={(e) => controlChange("username", e.target.value)}
              />
              <ErrorMessage id="username:error">
                Username is Required
              </ErrorMessage>
            </FormControlProvider>
          </FlexItem>
          <FlexItem grow="1" style={itemStyles}>
            <FormControlProvider {...formState.password}>
              <Label htmlFor="password">Password</Label>
              <Input
                describedBy="password:error"
                placeholder="Type Password"
                id="password"
                name="password"
                type="password"
                value={formState.password.value}
                onChange={(e) => controlChange("password", e.target.value)}
              />
              <ErrorMessage id="password:error">
                Password is Required
              </ErrorMessage>
            </FormControlProvider>
          </FlexItem>
          <Flex
            align="center"
            justify="center"
            direction="column"
            style={itemStyles}
          >
            <Button
              type="submit"
              size="l"
              disabled={disableSubmit}
              onClick={(event) => submitLogin(event)}
            >
              Login
            </Button>
            {loading && <p>login in progress...</p>}
          </Flex>
        </form>
        <Flex align="center" justify="center" direction="row">
          <TextLink
            onClick={(event) => handleLinkClick(event, "forgot-password")}
          >
            Forgot Password
          </TextLink>
          <TextLink onClick={(event) => handleLinkClick(event, "sign-up")}>
            Sign Up
          </TextLink>
        </Flex>
      </Flex>
    </>
  );
};
